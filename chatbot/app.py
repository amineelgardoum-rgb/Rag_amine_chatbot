from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from chat_bot_logic import conversation_rag_chain
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
class QueryRequest(BaseModel):
    query:str
app=FastAPI()

origins=[
    "http://127.0.0.1:8000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://localhost:8000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)
@app.get("/")
def sucess():
    return {"status":"200 OK","message":"the Api is working"}
@app.get("/ask")
async def message(query:str):
    if not query:
        raise HTTPException(status_code=200,detail="there was an error.")
    
    session_id="api_user"
    config={"configurable":{"session_id":session_id}}
    answer=conversation_rag_chain.invoke({"question":query},config=config)
    try:
        return {"answer":str(answer)}
    except Exception as e:
        print("there is an error",e)
    
if __name__=="__main__":
    uvicorn.run("app:app",host="0.0.0.0",port=8000,reload=True)