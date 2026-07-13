# Contributing

## Branch Strategy

- `main` — production-ready code
- Feature branches: `feature/<name>`
- Bug fixes: `fix/<name>`

## Pull Requests

1. Create a feature branch from `main`
2. Make changes following existing patterns
3. Ensure all tests pass and linting is clean
4. Submit a PR with a clear description

## Code Standards

### Backend
- Type hints on all function signatures
- Business logic in services, not routes
- Database access only through repositories
- Pydantic schemas for all request/response models

### Frontend
- TypeScript strict mode
- Components in `components/`, pages in `pages/`
- State management via Zustand stores
- API calls through the shared Axios client

## Testing

- Backend: pytest with async support
- Frontend: Vitest with React Testing Library
- Write tests for new features and bug fixes
