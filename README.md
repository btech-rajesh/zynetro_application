# Zynetra Application (MVP Foundation)

Zynetra builds premium service funnels, scalable backend systems, and AI automation that help businesses move from scattered execution to predictable digital growth.

This repository includes a frontend and backend foundation aligned with the Zynetra architecture agent.

## Stack

- Frontend: Next.js (App Router), React
- Backend: Node.js, Express, Zod validation
- Workspace: npm workspaces

## Project Structure

- `apps/frontend`: Website UI and API integration layer
- `apps/backend`: REST API for services and lead capture
- `.github/agents`: Custom architecture, backend, and frontend agents

## API Endpoints

- `GET /api/v1/health`
- `GET /api/v1/services`
- `POST /api/v1/leads`
- `GET /api/v1/leads` (in-memory preview endpoint for development)

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start frontend and backend together:

```bash
npm run dev
```

3. Open the frontend:

- http://localhost:3000

4. Backend API base:

- http://localhost:4000

## Environment

Copy `.env.example` values into local `.env` files as needed.

- Root defaults: API base URL, backend port, frontend origin
- `apps/frontend/.env.example`
- `apps/backend/.env.example`

## MongoDB Setup

1. Create backend env file:

```bash
copy apps\\backend\\.env.example apps\\backend\\.env
```

2. Set your MongoDB connection string in `apps/backend/.env`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority
```

3. Start full stack:

```bash
npm run dev
```

4. Verify backend is healthy:

```bash
curl http://localhost:4000/api/v1/health
```

5. Verify website:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000/api/v1/services

## Gmail Notifications

To get a Gmail message every time someone submits the website inquiry form, set these values in `apps/backend/.env`:

```env
GMAIL_USER=yourgmail@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
LEAD_NOTIFICATION_TO=yourgmail@gmail.com
```

Notes:

- Use a Gmail App Password, not your normal Gmail login password.
- `LEAD_NOTIFICATION_TO` can be the same Gmail address or a different inbox.
- Leads still save to MongoDB even if Gmail sending fails.

## Notes

- Leads are now persisted in MongoDB using Mongoose.
- Next step is auth modules, rate limiting, and protected admin lead endpoints.
