# API Reference

Base URL: `/api/v1`

## Health

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | No | Service health check |
| GET | `/health/db` | No | Database connectivity check |

## Authentication

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/login` | No | Login with email/password |
| POST | `/auth/refresh` | No | Refresh access token |

## Projects

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/projects` | Yes | List projects |

## Evaluations

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/evaluations` | Yes | List evaluations |

## Reports

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reports` | Yes | List reports |

## Response Format

All endpoints return:

```json
{
  "success": true,
  "message": "",
  "data": {}
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```
