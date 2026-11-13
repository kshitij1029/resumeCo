# resumeCo — AI-Powered Resume Analysis & Interview Preparation

resumeCo is a full-stack web application that helps candidates prepare for a role by analysing their resume against a job description and generating a structured, AI-assisted interview preparation report.

The application combines a React frontend, an Express API, MongoDB persistence and Google's Gemini API. Users can create an account, submit their resume and role details, review a tailored preparation report, revisit saved reports and generate a resume PDF tailored to the target role.

## What it does

- **Resume and role analysis:** accepts a PDF resume, candidate self-description and target job description.
- **AI-generated match score:** produces a role-fit score from 0 to 100.
- **Interview preparation:** generates technical and behavioural questions, suggested answer guidance and interviewer intent.
- **Skill-gap insights:** highlights skills to work on and assigns a severity level.
- **Preparation roadmap:** creates a day-wise plan with focus areas and actionable tasks.
- **Saved reports:** stores reports against the signed-in user and supports viewing an individual report or report history.
- **Tailored PDF generation:** generates a clean, ATS-oriented resume PDF using the information saved in a report.
- **Authentication:** supports registration, login, logout and retrieval of the current user's profile.

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite, React Router, Axios, Sass, React Hot Toast, Lucide React |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| AI | Google Gemini via `@google/genai` |
| Validation / structured output | Zod |
| Authentication | JSON Web Tokens, HTTP-only cookies, bcryptjs |
| Resume processing | pdf-parse, Multer |
| PDF generation | Puppeteer |

## Application flow

1. A user registers or signs in.
2. The user submits a PDF resume, a short self-description and a job description.
3. The API extracts text from the uploaded PDF.
4. Gemini generates structured interview-preparation content validated against a Zod schema.
5. The report is saved in MongoDB and associated with the authenticated user.
6. The user can revisit the report and request a tailored PDF resume.

## Project structure

```text
resumeCo/
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── config/          # Database connection
│       ├── controllers/     # Authentication and interview controllers
│       ├── middlewares/     # Authentication and file-upload middleware
│       ├── models/          # User, interview report and token blacklist models
│       ├── routes/          # API route definitions
│       └── services/        # Gemini integration and PDF generation
└── Frontend/
    ├── package.json
    └── src/
        ├── App.jsx
        ├── app.routes.jsx
        └── features/
            ├── auth/        # Registration, login and auth state
            ├── interview/   # Report generation, report view and API calls
            └── others/      # Home page
```

## Getting started

### Prerequisites

- Node.js (use a current LTS release)
- npm
- A MongoDB connection string (local MongoDB or MongoDB Atlas)
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/kshitij1029/resumeCo.git
cd resumeCo
```

### 2. Configure the backend

Create `Backend/.env` using `Backend/.env.example` as a template:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
FRONTEND_URL=http://localhost:5173
```

Install dependencies and start the API:

```bash
cd Backend
npm install
npm run dev
```

The API runs on port `3000` by default.

### 3. Configure the frontend

In a second terminal:

```bash
cd Frontend
```

Create `Frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Install dependencies and start Vite:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

> **Cookie note:** Authentication uses secure, HTTP-only cookies. The current backend cookie configuration is intended for HTTPS deployments; local HTTP development may require a local HTTPS setup or an environment-aware cookie configuration.

## API overview

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Create an account | Public |
| POST | `/api/auth/login` | Sign in | Public |
| GET | `/api/auth/logout` | Sign out | Public |
| GET | `/api/auth/get-me` | Get the current user's profile | Authenticated |
| POST | `/api/interview/` | Generate and save an interview report | Authenticated |
| GET | `/api/interview/` | List the current user's reports | Authenticated |
| GET | `/api/interview/report/:interviewId` | Retrieve one owned report | Authenticated |
| POST | `/api/interview/resume/pdf/:interviewReportId` | Generate a tailored resume PDF for an owned report | Authenticated |

Resume uploads are handled in memory and are currently limited to **3 MB** by the upload middleware.

## Security notes

- Passwords are hashed with bcrypt before storage.
- Authentication tokens are stored in HTTP-only cookies.
- Protected API routes require a valid authenticated session.
- Interview reports are scoped to the authenticated user when retrieved or used to generate a PDF.
- Keep API keys and database credentials in local environment files; never commit real secrets.

## Current project status

This repository is under active improvement. The existing application flows are being preserved while security, maintainability, documentation and automated quality checks are strengthened.

## Author

**Kshitij Jha**

- GitHub: [@kshitij1029](https://github.com/kshitij1029)
