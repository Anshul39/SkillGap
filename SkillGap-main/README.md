# SkillGap

SkillGap is a target-based career preparation platform that helps students understand what they need to improve for a specific company, role, or salary target.

## Features

* User registration and login
* Select target company or job role
* Resume upload and analysis
* ATS-style resume matching
* Identify missing technical and non-technical skills
* DSA question recommendations
* Project and certification suggestions
* Company selection process information
* Personalized preparation roadmap
* Readiness score to track preparation

## Workflow

```text
Register / Login
       ↓
Dashboard
       ↓
Select Target
       ↓
Upload Resume
       ↓
Resume Match
       ↓
Skill Gap
       ↓
Roadmap
       ↓
Readiness Score
```

## Technology Stack

### Frontend

* React.js
* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JWT
* bcrypt

## Project Structure

```text
SkillGap/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── package.json
│
├── README.md
└── .gitignore
```

## How It Works

The user first creates an account and logs in. After login, the user selects a target company, role, or salary level and uploads their resume.

The platform compares the user's current profile with the requirements of the selected target. It identifies missing skills and provides specific preparation tasks such as DSA practice, certifications, projects, and required technologies.

The user can then follow a roadmap and track their overall preparation through a readiness score.

## Installation

Clone the repository:

```bash
git clone https://github.com/Anshul39/SkillGap.git
cd SkillGap
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Install backend dependencies:

```bash
cd ../backend
npm install
```

Start the backend:

```bash
npm start
```

## Environment Variables

Create a `.env` file in the backend and add the required configuration:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not upload the `.env` file to GitHub.

## Project Goal

The goal of SkillGap is to make career preparation more structured by showing students **where they currently stand, what skills they are missing, and what they should do next** for their target career.

## Future Scope

* More company-specific preparation plans
* More salary-based roadmaps
* Improved resume analysis
* Progress tracking and analytics
* More DSA and technical question recommendations
* Expanded certification and project recommendations

## Author

**Anshul Sharma**

GitHub: [Anshul39](https://github.com/
