# Sentinel AI

AI Governance Platform that evaluates LLM applications before deployment.

## Quick Start

```bash
# Copy environment variables
cp .env.example .env

# Start all services
podman compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Development

See [docs/Development.md](docs/Development.md) for local setup without containers.

## Architecture

See [docs/Architecture.md](docs/Architecture.md) for system design.

## Tech Stack

| Layer | Stack |
|-------|-------|
| Frontend | React, TypeScript, Vite, TailwindCSS, shadcn/ui |
| Backend | Python 3.12, FastAPI, SQLAlchemy 2, Pydantic v2 |
| AI | LangGraph, Google Gemini |
| Database | PostgreSQL 16 |
| Auth | JWT + RBAC |
