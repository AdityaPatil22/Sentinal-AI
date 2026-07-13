# Folder Structure

```
sentinel-ai/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # Route handlers (thin controllers)
│   │   ├── auth/            # JWT, password hashing, RBAC dependencies
│   │   ├── config/          # Pydantic settings
│   │   ├── core/            # Logging, exceptions, response helpers
│   │   ├── db/              # SQLAlchemy engine, session, base models
│   │   ├── langgraph/       # Evaluation workflow graph and nodes
│   │   ├── middleware/      # Error handlers, request middleware
│   │   ├── models/          # SQLAlchemy ORM models
│   │   ├── repositories/    # Data access layer
│   │   ├── schemas/         # Pydantic request/response schemas
│   │   ├── services/        # Business logic layer
│   │   ├── storage/         # File storage abstraction
│   │   ├── utils/           # Shared utilities
│   │   ├── workers/         # Background task workers
│   │   └── main.py          # FastAPI app entry point
│   ├── alembic/             # Database migrations
│   ├── requirements/        # Python dependencies (base, dev, prod)
│   └── tests/               # pytest test suite
├── frontend/
│   └── src/
│       ├── components/ui/   # Reusable UI components (shadcn/ui)
│       ├── hooks/           # Custom React hooks
│       ├── layouts/         # Page layouts (sidebar, header)
│       ├── lib/             # Utility functions
│       ├── pages/           # Route pages
│       ├── routes/          # React Router configuration
│       ├── services/        # API client (Axios)
│       ├── store/           # Zustand state stores
│       ├── styles/          # Global CSS
│       └── types/           # TypeScript type definitions
├── docker/                  # Dockerfiles and nginx config
├── .github/workflows/       # CI pipelines (lint, test, build)
├── docs/                    # Project documentation
└── scripts/                 # Helper scripts
```
