# Development Setup

## Prerequisites

- Python 3.12+
- Node.js 22+
- PostgreSQL 16
- Redis 7

## Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements/dev.txt

# Run migrations
alembic upgrade head

# Start dev server
uvicorn app.main:app --reload
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Using Podman (recommended)

```bash
cp .env.example .env
podman compose up --build
```

## Running Tests

```bash
# Backend
cd backend && pytest

# Frontend
cd frontend && npm test
```

## Linting

```bash
# Backend
cd backend && ruff check . && black --check .

# Frontend
cd frontend && npx eslint . && npx prettier --check "src/**/*.{ts,tsx}"
```

## Pre-commit Hooks

```bash
pip install pre-commit
pre-commit install
```
