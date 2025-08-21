![1755785936641](image/README/1755785936641.png)

# Amine's AI Chatbot with RAG

This project is a fully functional, containerized chatbot application that leverages the power of **Retrieval-Augmented Generation (RAG)**. It provides an interactive web interface where users can ask questions and receive intelligent, context-aware answers based on a specific knowledge base about Amine.

The entire application is built with a modern tech stack, featuring a **React/Vite** frontend and a **Python/FastAPI** backend, all orchestrated seamlessly with **Docker Compose**.

---

## 🖼️ Project Showcase


![Chatbot Interface](./image.png "chatbot interface")

---

## ✨ Key Features

- **Retrieval-Augmented Generation (RAG):** The chatbot doesn't just rely on a generic language model. It retrieves relevant information from a custom knowledge base (`rag_text_info.txt`) to provide accurate and context-specific answers about Amine.
- **Interactive Chat Interface:** A sleek, responsive frontend built with **React** and **Vite**, featuring a cool "Matrix" style background effect.
- **Decoupled Architecture:** A separate frontend and backend allows for independent development, scaling, and maintenance.
- **High-Performance Backend:** The API is built with **FastAPI**, providing a fast, asynchronous server to handle chat requests efficiently.
- **Fully Containerized:** The entire application stack (frontend, backend) is managed by **Docker** and **Docker Compose**, allowing for a one-command setup and consistent development/production environments.
- **Customizable Knowledge:** Simply edit the `rag_text_info.txt` file to update or expand the chatbot's knowledge base.

---

## 🏛️ Architecture

The application follows a simple and powerful client-server model:

1. The **User** interacts with the **React Frontend**.
2. The frontend sends the user's query to the **FastAPI Backend** API endpoint.
3. The backend's RAG logic retrieves the most relevant context from the **Knowledge Base** (`rag_text_info.txt`).
4. The context and the user's query are sent to a **Large Language Model (LLM)**.
5. The LLM generates a response, which is sent back through the API to the frontend and displayed to the user.

---

## 🛠️ Tech Stack

| Component               | Technology                                                                                                                                                                                                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend**      | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![tailwindcss](https://img.shields.io/badge/tailwindcss-1572B6?style=for-the-badge&logo=tailwindcss&logoColor=white) |
| **Backend**       | ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white) ![Uvicorn](https://imag.shields.io/badge/uvicorn)                                                                                                        |
| **Orchestration** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)                                                                                                                                                                                                                |

---

## 📁 Project Structure

```
.
├── chatbot/                    # Python FastAPI Backend Service
│   ├── app.py                  # Main FastAPI application
│   ├── chat_bot_logic.py       # Core RAG logic and LLM interaction
│   ├── rag_text_info.txt       # The knowledge base for the chatbot
│   ├── Dockerfile              # Docker instructions for the backend
│   └── requirements.txt        # Python dependencies
│
├── chatbot-front/              # React/Vite Frontend Service
│   ├── public/
│   ├── src/                    # React components and application logic
│   ├── index.html              # Main HTML entry point
│   ├── package.json            # Node.js dependencies
│   └── vite.config.js          # Vite configuration
│
├── .gitignore                  # Global git ignore rules
└── docker-compose.yml          # Main Docker Compose file to orchestrate services
```

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/) (usually included with Docker Desktop)

### Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/amineelgardoum-rgb/Rag_amine_chatbot.git
   cd Rag_amine_chatbot
   ```
2. **Customize the Knowledge Base (Optional):**
   Open `chatbot/rag_text_info.txt` and add or modify the text content. This is the information the chatbot will use to answer questions about Amine.

### Running the Application

Launch the entire application stack with a single command from the root directory:

```bash
docker-compose up --build -d
```

- `--build`: Builds the Docker images for the frontend and backend if they don't exist.
- `-d`: Runs the containers in detached mode (in the background).

To check if the services are running correctly:

```bash
docker-compose ps
```

### Accessing the Application

- **Frontend (Chat Interface):** Open your browser and navigate to **[http://localhost:5173](http://localhost:5173)**
- **Backend (API Docs):** The API documentation is available at **[http://localhost:8000/docs](http://localhost:8000/docs)**

---

## 🛑 Stopping the Services

To stop and remove all the running containers:

```bash
docker-compose down
```

To also remove the data volumes (if any were configured):

```bash
docker-compose down -v
```
