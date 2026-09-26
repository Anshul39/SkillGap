SkillGap AI 🎯
A full-stack web platform that helps engineering students identify skill gaps, prepare for company-specific roles, and track internship applications — all in one place.

What it does
Most students apply to companies without knowing exactly which skills they're missing. SkillGap fixes that by letting you upload your resume, select a target company or salary range, and immediately see your ATS score, what's missing from your resume, a personalised skill gap report, and a week-by-week roadmap to close those gaps.

The full flow:

Register and upload your resume
Select your target — a specific company (Google, Amazon, TCS, etc.) or a salary range (₹12–18 LPA, ₹25 LPA+, etc.)
Get an instant ATS score with matched and missing keywords
See your personalised skill gap — which skills you have vs. what the role needs
Generate a roadmap of weekly tasks to close the gaps
Discover job listings and apply directly through official portals
Every application you click "Apply" on gets added to your Application Tracker automatically
Track progress through Applied → OA → Interview → Offer / Rejected on a Kanban board
Monitor your overall Readiness Score on the dashboard — a single number combining your skill match, DSA progress, resume upload, roadmap completion, and interview prep
Tech Stack
Layer	Technology
Frontend	React 18, React Router v6, Vite
Backend	Node.js, Express.js (ESM)
Database	MongoDB, Mongoose
Auth	JWT (7-day tokens), bcryptjs
File Upload	Multer (PDF, DOC, DOCX — max 5 MB)
Styling	Custom CSS with CSS variables
Project Structure
SkillGap-main/
│
├── SkillGap-main/          ← Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── UploadResume.jsx
│   │   │   ├── Onboarding.jsx
│   │   │   ├── SkillGapReport.jsx
│   │   │   ├── Roadmap.jsx
│   │   │   ├── JobDiscovery.jsx
│   │   │   ├── ApplicationTracker.jsx
│   │   │   └── Profile.jsx
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── ProgressBar.jsx
│   │   ├── data/
│   │   │   ├── companyData.js   ← 20+ companies, roles, ATS keywords
│   │   │   └── careerData.js    ← Job portal links, DSA topics
│   │   └── services/
│   │       └── api.js           ← All API calls
│   └── package.json
│
└── backend/                ← Backend (Node.js + Express)
    ├── src/
    │   ├── app.mjs          ← All routes in one file
    │   ├── models/
    │   │   ├── User.mjs
    │   │   ├── Resume.mjs
    │   │   ├── Target.mjs
    │   │   └── Application.mjs
    │   ├── data/
    │   │   └── careerData.mjs   ← Career portals, job generation
    │   └── seed.mjs         ← Seed script for Target collection
    └── package.json
Getting Started
Prerequisites
Node.js v18 or above
MongoDB running locally (mongodb://127.0.0.1:27017) or a MongoDB Atlas connection string
npm
1. Clone the repository
git clone https://github.com/your-username/skillgap-ai.git
cd skillgap-ai
2. Set up the backend
cd backend
npm install
Create a .env file inside /backend:

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/skillgap
JWT_SECRET=your_secret_key_here
NODE_ENV=development

# Optional — leave empty to use built-in curated job data
JOB_API_URL=
JOB_API_KEY=
Seed the Target collection (companies, roles, skill requirements):

npm run seed
Start the backend:

npm run dev
The API will be running at http://localhost:3000. Test it: http://localhost:3000/api/health

3. Set up the frontend
Open a new terminal:

cd SkillGap-main
npm install
npm run dev
The frontend will run at http://localhost:5173.

4. Open the app
Go to http://localhost:5173 in your browser.

Register a new account. The backend starts all new accounts with completely empty data — no fake skills, no pre-selected company, no demo resume.

API Reference
All protected routes require the header:

Authorization: Bearer <jwt_token>
Method	Route	Auth	Description
GET	/api/health	No	Health check
POST	/api/auth/register	No	Register new account
POST	/api/auth/login	No	Login
GET	/api/auth/me	Yes	Get current user
GET	/api/profile	Yes	Get profile
PUT	/api/profile	Yes	Update profile
GET	/api/targets	No	List all targets
GET	/api/targets/:id	No	Get one target
POST	/api/user-target	Yes	Set active target
GET	/api/user-target	Yes	Get active target
GET	/api/skills	Yes	Get user skills
POST	/api/skills	Yes	Save user skills
GET	/api/skill-gap	Yes	Calculate skill gap vs target
POST	/api/resume	Yes	Upload resume file
GET	/api/resume	Yes	Get resume metadata
DELETE	/api/resume	Yes	Delete resume
GET	/api/roadmap	Yes	Get roadmap
POST	/api/roadmap/generate	Yes	Generate roadmap from skill gaps
PUT	/api/roadmap/task/:id	Yes	Mark roadmap task complete
GET	/api/dsa/progress	Yes	Get DSA progress (12 topics)
PUT	/api/dsa/progress/:topic	Yes	Update DSA progress
GET	/api/readiness	Yes	Get readiness score + breakdown
GET	/api/dashboard	Yes	Aggregated dashboard data
GET	/api/applications	Yes	Get all applications
POST	/api/applications	Yes	Add application
PUT	/api/applications/:id	Yes	Update application
DELETE	/api/applications/:id	Yes	Delete application
GET	/api/jobs	No	Browse jobs (curated or live API)
GET	/api/jobs/career-links	No	Official career portal links
Key Features
ATS Resume Scoring
Upload a PDF or DOCX resume and select a target company or salary range. The system compares the resume's text content against a curated keyword list for that target, returns a score out of 100, and lists exactly which keywords matched and which are missing.

Skill Gap Analysis
After completing the skill self-assessment (Onboarding), the platform compares your selected skills and levels (Beginner / Intermediate / Advanced) against what the target role requires. Each gap is rated HIGH, MEDIUM, or GOOD.

Readiness Score
A single number (0–100) combining six factors:

Technical skill match (25%)
DSA practice progress (20%)
Project completion (20%)
Resume uploaded (15%)
Interview preparation (10%)
Roadmap task completion (10%)
Job Discovery + Apply → Track
Browse curated roles from 20+ companies. Click "Apply Now" to open the official careers portal in a new tab. A prompt immediately appears asking if you want to add this to your Application Tracker — one click and it's logged with the company, role, date, and application URL stored.

Application Tracker
Kanban-style board with five columns: Applied, OA, Interview, Offer, Rejected. Drag cards between columns. Each application card shows the company, role, date, status, and a direct link back to the job posting.

Environment Variables
Variable	Required	Description
PORT	No	Backend port (default: 3000)
MONGO_URI	Yes	MongoDB connection string
JWT_SECRET	Yes	Secret for signing JWT tokens
NODE_ENV	No	development or production
JOB_API_URL	No	External job API base URL (e.g. JSearch on RapidAPI)
JOB_API_KEY	No	API key for external job board
If JOB_API_URL and JOB_API_KEY are both empty, the backend falls back to the built-in curated job data automatically.

SDG Alignment
SDG 4 — Quality Education: Personalised, data-backed skill guidance instead of generic advice
SDG 8 — Decent Work and Economic Growth: Reduces the gap between student skills and employer expectations, improving employability
Future Scope
 GitHub profile analysis and activity score
 Automated cover letter generator from resume + JD
 LeetCode progress integration
 Company-specific mock interview questions
 Weekly preparation reminders and streak tracking
 Placement cell admin dashboard for colleges
Team
Batch 2025–26

Name	Student ID
Akshita Sharma	2411981059
Amit Thakur	2411981072
Anshul Sharma	2411981096
Armaan Kaur	2411981107
License
This project was built as part of a college curriculum project for Batch 2025–26. Not intended for commercial use.
