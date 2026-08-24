# PrajaMitra – Citizen Services Application

PrajaMitra is a citizen-service application/project that helps users discover government schemes, land tools, certificate guidance, grievance workflows, and administrative directories in Telugu and English. It is a development/demo project, not an official government portal.

## Architecture

| Layer | Stack |
|-------|--------|
| **Frontend** | React + TypeScript + Vite |
| **Backend** | Java 17 + Spring Boot + Maven |
| **Security** | Spring Security + JWT + BCrypt |
| **Database** | PostgreSQL |
| **Migration** | Flyway |

Schema is managed exclusively by Flyway migrations under `backend/src/main/resources/db/migration/`. Hibernate `ddl-auto` is set to `none` (no automatic schema generation).

## Project layout

```
prajamitra/
├── backend/                 # Spring Boot Maven project
│   ├── Dockerfile           # Multi-stage Maven build + JRE runtime
│   ├── pom.xml
│   └── src/main/...
├── src/                     # React + TypeScript + Vite frontend
├── Dockerfile.frontend
├── docker-compose.yml
├── nginx.conf
└── package.json
```

## REST API (high level)

- `GET /api/services` – services with category filter and search
- `GET /api/services/{id}` – service detail
- `GET /api/schemes` – welfare schemes
- `GET /api/districts` – districts / mandals directory
- `GET /api/problems` – guidance content
- `POST /api/applications` – submit application (authenticated)
- `GET /api/applications/track/{appNumber}` – public tracking
- `POST /api/land/convert` – land unit converter
- `POST|DELETE /api/bookmarks` – bookmarks (authenticated)
- `POST /api/auth/login` | `POST /api/auth/register` – JWT auth

## Configuration

Copy `.env.example` to `.env` and set values:

```bash
cp .env.example .env
```

Important variables:

- `DB_PASSWORD` – PostgreSQL password (required for Compose)
- `JWT_SECRET` – long random secret (required)
- `CORS_ALLOWED_ORIGINS` – comma-separated origins (default: `http://localhost:3000,http://localhost:5173`)
- `VITE_API_BASE_URL` – frontend API base (e.g. `http://localhost:8080/api`)

Secrets are supplied at runtime via environment variables and are **not** baked into Docker images.

## Run with Docker Compose

```bash
# Validate compose file
docker compose config

# Build images
docker compose build

# Start stack: React (nginx) → Spring Boot → PostgreSQL
docker compose up
```

- Frontend: http://localhost:3000  
- Backend API: http://localhost:8080  
- PostgreSQL: localhost:5432  

## Local development (without full Compose)

### Backend

```bash
cd backend
# Ensure PostgreSQL is running and .env / env vars are set
mvn spring-boot:run
```

### Frontend

```bash
npm install
npm run dev
```

Vite dev server typically runs on http://localhost:5173 (or port from `package.json`).

## Notes

- CORS uses explicit origins from `CORS_ALLOWED_ORIGINS` (no wildcard with credentials).
- Application data, bookmarks, and user profile are stored in PostgreSQL; the frontend does not persist them in `localStorage` (language preference only).
- JWT access tokens may be held in the browser only for the session credential required by the SPA.
