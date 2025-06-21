# _Snippify_  
_Re‑usable code snippets, curated by developers, powered by an autonomous AI agent_  

Snippify is a full‑stack web platform where developers **discover, create, and share ready-to-use code snippets**. It blends the power of a community‑driven snippet repo with an **Autonomous AI Agent** that can instantly explain, refactor, or generate ready‑to‑drop‑in snippets for your projects.

---

## 🚀 Features

- **Code Snippet Management**:
  - **Create**: Craft reusable code snippets with support for public or private visibility.
  - **Read**: Browse a vast library of community-contributed snippets or your own private collection.
  - **Update**: Modify existing snippets to keep them up-to-date.
  - **Delete**: Remove snippets you no longer need.
  - **Copy**: Instantly copy snippets for quick integration into your projects.
  
- **AI Autonomous Agent**:
  - Generates ready-to-use code snippets based on your requirements.
  - Allows direct integration of AI-generated snippets into your projects.

- **Public & Private Snippets**:
  - Share your snippets publicly to contribute to the developer community.
  - Keep sensitive snippets private for personal or team use.

- **Component Library Exploration**:
  - Discover curated component libraries to enhance your website’s design and functionality.
  - Boost productivity with pre-built, customizable components.
    
## 🚀 Tech Stack

- **Frontend**: React + TypeScript, Tailwind CSS
- **Backend**: Hono + Cloudflare Workers
- **Database**: PostgreSQL
- **AI Agent**: Groq Cloud LLMs 

---
## 🚀 Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/21lakshh/Snippify 
cd Snippify
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 4: Environment Configuration
Create a `.env` file in the root directory:
```bash
VITE_GROQ_API_KEY=you_grok_api_key_here
VITE_BACKEND_URL=your_database_connection_pooling_string
```

### Step 5: Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

---