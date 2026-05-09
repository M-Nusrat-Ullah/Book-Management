# 📚 BookShelf — AI-Powered Book Management System

A full-stack book management application with AI-powered search and recommendations, built with a modern polyglot microservice architecture.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

## ✨ Features

- **Authentication** — JWT-based register/login with role support
- **Book Management** — Full CRUD for books with search and filtering
- **AI Natural Language Search** — Search books in plain English ("books about magic")
- **AI Recommendations** — Personalized recommendations based on your preferences
- **Multi-provider LLM** — Supports Ollama (local) and Google Gemini

## 🏗️ Architecture

```
book-management/
├── frontend/        # React + Vite + TypeScript + Tailwind + Zustand
├── backend/         # Node.js + Express + TypeScript + MongoDB
├── ai-service/      # Python + FastAPI + Ollama/Gemini
└── docker-compose.yml
```

```
Browser → React Frontend (port 5173)
              ↓
         Node.js API (port 5000) → MongoDB Atlas
              ↓
         FastAPI AI Service (port 8001) → Ollama / Gemini
```

## 🛠️ Tech Stack

| Layer      | Technologies                                                  |
| ---------- | ------------------------------------------------------------- |
| Frontend   | React 19, Vite, TypeScript, TailwindCSS, Zustand, React Query |
| Backend    | Node.js, Express, TypeScript, Mongoose, JWT, Zod              |
| AI Service | Python, FastAPI, httpx, Ollama (qwen2.5:3b), Gemini API       |
| Database   | MongoDB Atlas                                                 |
| DevOps     | Docker, Docker Compose                                        |

## 🚀 Getting Started

### Prerequisites

- Node.js v22+
- Python 3.12+
- Docker + Docker Compose
- MongoDB Atlas account (free tier)
- Ollama running locally OR Google Gemini API key

### Option 1 — Docker (Recommended)

```bash
git clone https://github.com/M-Nusrat-Ullah/Book-Management.git
cd Book-Management

# Copy and fill in environment files
cp backend/.env.example backend/.env
cp ai-service/.env.example ai-service/.env

# Start everything
docker compose up
```

Visit `http://localhost:5173`

### Option 2 — Manual Setup

**Backend:**

```bash
cd backend
npm install
cp .env.example .env   # fill in MONGODB_URI and JWT_SECRET
npm run dev
```

**Frontend:**

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

**AI Service:**

```bash
cd ai-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # set LLM_PROVIDER=ollama or gemini
uvicorn main:app --reload --port 8001
```

## 🔑 Environment Variables

**backend/.env**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:5173
```

**ai-service/.env**

```env
API_PORT=8001
LLM_PROVIDER=ollama          # or gemini
OLLAMA_MODEL=qwen2.5:3b
OLLAMA_BASE_URL=http://localhost:11434
GOOGLE_API_KEY=               # if using gemini
BACKEND_URL=http://localhost:5000
```

## 📡 API Endpoints

**Auth**

```
POST /api/auth/register
POST /api/auth/login
```

**Books**

```
GET    /api/books
POST   /api/books          (protected)
GET    /api/books/:id
PATCH  /api/books/:id      (protected)
DELETE /api/books/:id      (protected)
```

**AI Service**

```
POST /ai/search            { query: string }
POST /ai/recommendations   { liked_genres: string[], message: string }
```

## 🤖 AI Features

### Natural Language Search

Ask in plain English and the AI translates your query into matching books:

> "books about magic and fantasy" → returns Harry Potter

### AI Recommendations

Tell the AI what you like and get personalized suggestions from your library:

> Genre: "Programming" → recommends Clean Code with explanation

## 📁 Project Structure

```
backend/src/
├── config/         # DB and env config
├── controllers/    # Route handlers
├── middleware/     # Auth and error middleware
├── models/         # Mongoose schemas
├── routes/         # Express routers
└── validators/     # Zod validation schemas

frontend/src/
├── api/            # Axios API calls
├── pages/          # React pages
├── store/          # Zustand state
└── types/          # TypeScript interfaces

ai-service/
├── routers/        # FastAPI route handlers
└── services/       # LLM and book services
```

## 👤 Author

**M. Nusrat Ullah**  
GitHub: [@M-Nusrat-Ullah](https://github.com/M-Nusrat-Ullah)
