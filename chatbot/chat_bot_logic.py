from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain.prompts import ChatPromptTemplate,MessagesPlaceholder
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.schema.runnable.history import RunnableWithMessageHistory
from langchain.schema.output_parser import StrOutputParser
from langchain_community.chat_message_histories import ChatMessageHistory
from operator import itemgetter
import os
api_key=os.environ.get("OPENAI_API_KEY","your_api_key")
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
# ---- Load the data ---- #
print("Loading your Data from the file....")
loader = TextLoader("rag_text_info.txt")
documents = loader.load()
# --- chunk the data --- #
print("Chunk the data.....")
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=200,
    chunk_overlap=0,
    separators=["\n"],  # because my file is just sentences in one line
)
chunks = text_splitter.split_documents(documents=documents)
# --- Embedding and store in a vectorDB FAISS --- #
print("creating the embedding and store in FAISS vector.")
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectorstores = FAISS.from_documents(chunks, embeddings)
# --- The retrieval chain --- #
print("Creating retriever...")
retriever = vectorstores.as_retriever(search_type="similarity", search_kwargs={"k": 20})
# --- template --- #
template = """
Answer the question based ONLY on the following context.
If the context does not contain the answer, say " I dont have that info"
Context:{Context}
Question:{question}
"""
# -- define the prompt for answer the query of the user
prompt = ChatPromptTemplate.from_messages(
    [
        ("system",template),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human","{question}")
    ]
)


llm = GoogleGenerativeAI(model="gemini-2.5-flash",temperature=0)

# --build the rag chain
def format_docs(docs):
    return "\n".join(doc.page_content for doc in docs)


print("the full rag chain...")
rag_chain = (
    {
        "Context":itemgetter("question") | retriever |format_docs,
        "question":itemgetter("question"),
        "chat_history":itemgetter("chat_history")
    }
    | prompt
    | llm
    | StrOutputParser()
)
store={}
def define_session(session_id:str)->ChatMessageHistory:
    if session_id not in store:
        store[session_id]=ChatMessageHistory()
    return store[session_id]
        
    
conversation_rag_chain=RunnableWithMessageHistory(
    rag_chain,
    define_session,
    input_messages_key="question",
    history_messages_key="chat_history"
)
