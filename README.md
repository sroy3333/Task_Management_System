# Task Management System

A responsive task-management assessment application built with Next.js, Tailwind CSS, NestJS and MySQL. The current product supports Guest Login, task listing, search/filtering, add, edit, view and delete interactions, responsive navigation, and persistent light/dark theme selection.

The assessment explicitly requires a public GitHub repository, a working live deployment, a README, and maintainable frontend/backend architecture. The supplied project already uses Next.js + Tailwind on the frontend and NestJS + TypeScript on the backend; this version replaces the JSON-file persistence layer with MySQL. fileciteturn8file12L1-L12

## Architecture

```text
Browser
  │
  ▼
Next.js App Router (frontend :3000)
  │  REST requests
  ▼
NestJS API (backend :4000)
  │
  ▼
MySQL (task_management)
```

### Main routes

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/tasks` | List all tasks |
| GET | `/tasks/:id` | Fetch one task |
| POST | `/tasks` | Create a task |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

The API keeps the existing validation contract: title is required, priority must be `High`, `Medium` or `Low`, status must be `Todo`, `In Progress` or `Completed`, and due date must be a valid ISO date string. fileciteturn8file8L1-L30

## Requirements

- Node.js 20+
- npm 10+
- MySQL 8+
- Git

## 1. Clone

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd task-management-system
```

## 2. Create MySQL database

Run `backend/migrations/001_create_tasks.sql` in MySQL.

For a production database, create a dedicated application user instead of using `root`:

```sql
CREATE USER 'task_app'@'%' IDENTIFIED BY 'CHANGE_ME_STRONG_PASSWORD';
GRANT SELECT, INSERT, UPDATE, DELETE ON task_management.* TO 'task_app'@'%';
FLUSH PRIVILEGES;
```

Do not commit real credentials.

## 3. Configure backend

```bash
cd backend
cp .env.example .env
```

Set:

```env
PORT=4000
FRONTEND_URL=http://localhost:3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=task_app
DB_PASSWORD=your_password
DB_NAME=task_management
```

The NestJS application uses `synchronize: false`; schema changes must be applied through reviewed SQL migrations rather than changing the production database automatically.

## 4. Install and run backend

```bash
cd backend
npm install
npm run build
npm run start:dev
```

The API should be available at `http://localhost:4000`.

## 5. Configure frontend

```bash
cd frontend
cp .env.local.example .env.local
```

Set:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

The original frontend hard-coded `http://localhost:4000` in its task requests; the replacement uses `NEXT_PUBLIC_API_URL` so the same build can point to a deployed API. fileciteturn6file7L1-L20

Update the remaining client-side task mutations (`AddTaskModal`, `EditTaskModal`, `DeleteTaskButton`) to use the same `API_URL` constant rather than hard-coded localhost URLs. Their existing POST/PATCH/DELETE behavior should remain unchanged. fileciteturn6file11L1-L15 fileciteturn7file0L1-L20

Then:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Database design

The task model mirrors the existing application contract:

```text
id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
title       VARCHAR(255) NOT NULL
priority    ENUM('High','Medium','Low') NOT NULL
status      ENUM('Todo','In Progress','Completed') NOT NULL
dueDate     DATE NOT NULL
```

The existing JSON seed contains task IDs 4, 5 and 6; the migration preserves those records so moving from the supplied project to MySQL does not lose the current sample data. fileciteturn8file8L1-L8

## Testing

Backend unit tests should mock the TypeORM repository rather than reading/writing `data/tasks.json`. The original service tests were coupled to the JSON file and explicitly created temporary JSON files; those tests must therefore be replaced when switching persistence layers. fileciteturn8file5L1-L30

Recommended checks:

```bash
cd backend
npm test
npm run test:e2e
npm run build
```

Also manually verify:

- Guest Login → Dashboard
- Tasks page loads from MySQL
- Search works
- Status and priority filters work
- Add Task validates empty title/due date
- Add Task persists to MySQL
- Edit Task persists to MySQL
- Delete confirmation and delete operation work
- Missing task returns 404
- Invalid task payload returns 400
- Theme survives refresh
- Desktop/tablet/mobile layouts work

## Production deployment

A practical deployment is:

- **Frontend:** Vercel or another Next.js-compatible host
- **Backend:** Render, Railway, Fly.io, AWS, Azure, or another Node.js host
- **Database:** managed MySQL such as PlanetScale-compatible MySQL, Aiven, Railway MySQL, AWS RDS, or another managed provider

Use the provider's internal/private database hostname when the backend and MySQL are on the same private network where available.

### Backend production variables

```env
NODE_ENV=production
PORT=4000
FRONTEND_URL=http://localhost:3000
DB_HOST=YOUR_MYSQL_HOST
DB_PORT=3306
DB_USERNAME=YOUR_MYSQL_USER
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=task_management
```

### Frontend production variable

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Production build commands

Backend:

```bash
npm ci
npm run build
npm run start:prod
```

Frontend:

```bash
npm ci
npm run build
npm run start
```

Make sure the deployed frontend can reach the deployed API over HTTPS and that the backend CORS origin exactly matches the frontend origin.

## GitHub checklist

Before pushing:

```bash
git status
git add .
git commit -m "feat: replace JSON persistence with MySQL"
git push origin main
```

Never commit:

- `.env`
- `.env.local`
- database passwords
- private API keys
- `node_modules`
- `.next`
- `dist`
- coverage output

The assessment asks for multiple small, meaningful commits, a public repository, and a working deployed URL. fileciteturn8file12L12-L20

## Suggested commit history

```text
feat: implement task management UI
feat: add NestJS task API and validation
feat: replace JSON persistence with MySQL
feat: add production environment configuration
fix: use configurable API URL in frontend
chore: add deployment-ready README
```

## Important scope note

The supplied project deliberately keeps Projects separate because project persistence is not part of the current task data model. This README does not introduce a Projects database table that the current application does not use. fileciteturn6file14L1-L20
