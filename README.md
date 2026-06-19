# ⚡ Gitfolio

**Gitfolio** is an AI-powered developer portfolio generator. By entering a GitHub username, it extracts public developer details (repositories, language statistics, public organizations, and interests), processes them using Groq AI, and automatically generates a modern, recruiter-ready dev portfolio.

---

## 🚀 Features

- **GitHub Profile Extraction**: Automatically fetches public profile info, top repositories (sorted by stars), language weights, and organization memberships.
- **AI-Powered Copywriting**: Leverages Groq AI to write a professional bio, taglines, and project highlights based on your code and repositories.
- **Interactive Customization**: Toggle and select which of your top 30 repositories to feature on your profile.
- **AI Project Description Helper**: Inline "AI Rewrite" utility to rewrite or summarize project descriptions on demand.
- **Sleek Dev Dark Theme**: Engineered using standard modern HSL color palettes, glassmorphism, responsive grids, and subtle micro-animations (no TailwindCSS dependencies).
- **SQLite Persistence**: Powered by SQLite via Prisma 7.x with modern driver adapters.
- **Shareable Links**: Generates a unique, public shareable URL for each developer.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (using the App Router & Turbopack)
- **Database ORM**: [Prisma 7.x](https://www.prisma.io/) with `@prisma/adapter-better-sqlite3`
- **Database**: SQLite (`dev.db`)
- **LLM/AI Engine**: [Groq SDK](https://console.groq.com/) (using `llama-3.3-70b-versatile` or `mixtral-8x7b-32768`)
- **Icons & Styling**: Hand-coded inline SVGs (Lucide-inspired) and Vanilla CSS Modules

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- **Node.js** (v18.x or later)
- **Groq API Key**: Get a free key from [Groq Console](https://console.groq.com).
- **GitHub Personal Access Token (Optional)**: Needed for higher rate-limits. Generate one at [GitHub Developer Settings](https://github.com/settings/tokens).

### 2. Configuration
Create a `.env` file in the root directory (based on `.env` or the snippet below):

```env
DATABASE_URL="file:./dev.db"
GROQ_API_KEY="your_groq_api_key"
GITHUB_TOKEN="your_optional_github_token"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup
Initialize the SQLite database schema and generate the Prisma Client:
```bash
npx prisma db push
```

### 5. Running the Application
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Development & Build

To test a production-optimized build locally:
```bash
npm run build
npm start
```

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── generate/             # Main generation endpoint (GitHub API -> Groq AI -> DB)
│   │   ├── helper/               # Helper API endpoints (e.g., AI project description generator)
│   │   └── portfolio/            # Portfolio CRUD and updates
│   ├── edit/[slug]/              # Interactive dashboard to customize and feature projects
│   ├── portfolio/[slug]/         # Clean, recruiter-friendly public portfolio views
│   ├── globals.css               # Design system token values, base utilities, and keyframes
│   ├── layout.js                 # Global layout with SEO meta configuration
│   └── page.js                   # Landing/Search page layout and generator triggers
├── lib/
│   ├── github.js                 # Public GitHub REST API integration helpers
│   ├── groq.js                   # Groq SDK wrappers for profile translation
│   └── prisma.js                 # Singleton Prisma client instance
└── prisma/
    └── schema.prisma             # SQLite relational database schema
```
