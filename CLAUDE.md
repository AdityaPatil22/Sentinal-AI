# Sentinel AI

AI governance platform for evaluating LLM applications before deployment.

## Stack

- **Backend**: Python 3.12, FastAPI, SQLAlchemy (async), Neon Postgres (asyncpg), LangGraph, LiteLLM
- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS v4, Zustand 5, React Query 5, React Router 7
- **Infra**: Podman (not Docker), Neon Postgres (remote), Redis

## Repo layout

```
backend/
  app/
    main.py              # FastAPI entry, lifespan seeds roles + creates tables
    api/v1/              # Routes: health, auth, projects, evaluations, reports (last 3 are stubs)
    auth/                # JWT (HS256, python-jose), bcrypt passwords, get_current_user dependency
    models/              # SQLAlchemy: User, Role, Project, Evaluation, Dataset, Report, AuditLog
    schemas/auth.py      # Pydantic: LoginRequest, RegisterRequest, RefreshRequest, TokenResponse
    repositories/        # BaseRepository (generic CRUD), UserRepository
    services/auth.py     # AuthService: login, register, refresh
    langgraph/           # 5-node evaluation pipeline (all stubs): prompt_security → dataset_validation → model_evaluation → risk_scoring → report_generation
    config/              # Pydantic Settings from env vars
    db/base.py           # UUIDMixin, TimestampMixin, declarative base
  tests/
  requirements/          # base.txt, dev.txt, prod.txt (no deps in pyproject.toml)
frontend/
  src/
    main.tsx             # QueryClientProvider + RouterProvider (no App.tsx)
    routes/index.tsx     # Browser router: /login, /register, / (dashboard), /projects, /evaluations, /reports, /settings
    layouts/app-layout.tsx  # Sidebar + mobile sheet + header
    pages/               # Dashboard, Projects (with create dialog), Evaluations, Reports, Settings, Login, Register
    components/ui/       # shadcn/ui pattern: Button, Card, Badge, Input, Label, Table, Dialog, Select, Textarea, Avatar, Separator, Skeleton, Sheet
    services/            # api.ts (axios + interceptors), projects.ts, evaluations.ts, reports.ts
    hooks/               # use-projects, use-evaluations, use-reports (React Query), use-auth (dead code)
    store/               # auth.ts (Zustand, localStorage tokens), theme.ts (light/dark toggle)
    types/api.ts         # ApiResponse<T>, User, Project, Evaluation, Report, Dataset, CreateProjectRequest
    styles/globals.css   # Tailwind v4 theme tokens (Governance Violet palette)
    lib/utils.ts         # cn() = clsx + twMerge
```

## Key patterns

- All API responses use envelope: `{ success: bool, message: str, data: T }`
- Auth: JWT access (30min) + refresh (7d) tokens in localStorage. 401 → hard redirect to /login
- Frontend design: "Governance Violet" — violet primary (#7C3AED light / #A78BFA dark), status colors: success (emerald), warning (amber), destructive (rose)
- Components follow shadcn/ui convention: forwardRef + cn() + cva variants
- Tailwind v4: CSS-based config via `@theme` in globals.css, not JS config file. Dark mode via `.dark` class

## Data model

```
roles 1──* users (role_id FK)
users 1──* projects (owner_id FK)
projects 1──* evaluations (project_id FK)
projects 1──* datasets (project_id FK)
evaluations 1──1 reports (evaluation_id FK, unique)
users 1──* reports (reviewer_id FK, nullable)
users 1──* audit_logs (user_id FK, nullable)
```

Enums: ProjectStatus (draft→submitted→evaluating→evaluated→approved/rejected), EvaluationStatus (pending→running→completed/failed), ReportStatus (draft→published→archived), RoleEnum (admin/developer/reviewer)

## What's implemented vs stub

**Working**: Auth (login/register/refresh), JWT lifecycle, role seeding on startup, health checks, CORS (localhost:5173), full frontend shell with all pages

**Backend stubs**: GET /projects, /evaluations, /reports return empty arrays. No create/update/delete endpoints. LangGraph nodes all return `{"status": "not_implemented"}`

**Not built yet**: Project/Evaluation/Report CRUD endpoints, LangGraph pipeline execution, background workers, dataset upload, user management API, RBAC enforcement, token refresh on frontend

## Commands

```bash
# Frontend
cd frontend && npm run dev          # Vite dev server on :5173
cd frontend && npm run build        # tsc + vite build
cd frontend && npm run lint         # eslint
cd frontend && npm run test         # vitest

# Backend
cd backend && uvicorn app.main:app --reload --port 8000
cd backend && pytest

# Full stack (Podman)
podman-compose up
```

## Env vars (.env at repo root)

DATABASE_URL, REDIS_URL, SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_DAYS, ALGORITHM, VITE_API_URL, OPENAI_API_KEY, LITELLM_API_KEY, STORAGE_BACKEND, STORAGE_LOCAL_PATH

## Known issues

See GitHub issues. Key ones: #1 token refresh broken (UUID vs email lookup), #2 path traversal in storage, #3 token type not validated, #27 lazy-load in async context, #30 BaseRepository missing update method.
