# 🎓 AI Smart Scholar

**Welcome to Smart Scholarship Finder**
👉 [https://aismartscholar.netlify.app](https://aismartscholar.netlify.app)

> “Stop searching. Start applying.”
> Find the most relevant scholarships tailored to each student’s profile — with AI matching, deadline tracking, and confident applications.

[![🚀 View Live Demo](https://img.shields.io/badge/Live-Demo-00C853?style=for-the-badge\&logo=netlify\&logoColor=white)](https://aismartscholar.netlify.app/)
[![Docs](https://img.shields.io/badge/README-Docs-2962FF?style=for-the-badge)](#-overview)
[![License](https://img.shields.io/badge/License-MIT-000?style=for-the-badge)](#-license)

---

## ✨ Overview

AI Smart Scholar helps students discover scholarships that fit their academics, interests, and goals.

* 🎯 AI-powered matching
* 🔔 Deadline reminders
* 🔗 Direct apply links
* 📝 Notes & checklist

So students spend less time searching and more time applying.

---

## 👀 Live Demo

[![Open Live App](https://img.shields.io/badge/OPEN-LIVE%20APP-00C853?style=for-the-badge\&logo=google-chrome\&logoColor=white)](https://aismartscholar.netlify.app/)

---

## 📸 Gallery

> Replace these with real screenshots

* ![Hero Screenshot](./assets/hero.png "Homepage Hero")
* ![Matches](./assets/matches.png "Scholarship Matches View")
* ![Timeline](./assets/timeline.png "Per-Scholarship Application Timeline")

---

## 👁️ At a Glance

| **Category**      | **Details**                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| **Purpose**       | Personalized scholarship matching + deadline tracking                       |
| **Tech Stack**    | React + TypeScript • Node.js + Express • Prisma • PostgreSQL • Tailwind CSS |
| **AI / Matching** | Rule-based filters + semantic ranking                                       |
| **Deployment**    | Netlify (Web) • Render/Railway (API) • Postgres (Neon/Railway)              |
| **Team**          | 4 members — [Jump to team](#-here-comes-the-team)                           |

---

## 💡 Why Smart Scholarship?

1. 🎯 Precision over noise
2. ⏱️ Deadline tracking with visible timelines
3. 🔗 Direct apply links to portals
4. 🌍 Local, national & international opportunities
5. 📈 Smarter results as profiles evolve

---

## 🔑 Key Features

* 🧭 Profile-based AI matching
* 🔔 Deadline reminders
* 🔗 Verified direct apply links
* 🗂️ Saved scholarships + filters
* 📝 Application checklist
* 📬 Notifications (email + in-app)

---

## 🧠 Technical Deep Dive

### ⚙️ System Flow

```
Client (React + TypeScript, Tailwind)
│
├─ 🔐 Auth (JWT / Session)
│
├─ 📡 API Gateway (Node.js + Express)
│   ├─ Profile Service
│   ├─ Matching Service
│   ├─ Scholarships Service
│   └─ Timeline Service
│
└─ 🗄️ Data Layer
    ├─ PostgreSQL (profiles, scholarships, deadlines)
    └─ Redis (cache, rate limits)
```

### Request Journey

1. React app loads user profile
2. Calls Matching API with profile vectors
3. API ranks scholarships (rules + semantic layer)
4. Timeline service aggregates deadlines
5. Client renders Matches & Timeline

---

## 🗓️ Application Timelines

Stay organized with milestones for each opportunity:

`[Profile ✅] → [Shortlist 🎯] → [Docs 🗂️] → [Apply ✉️] → [Decision 🏁]`

---

## 👥 Here Comes the Team

| Avatar | Name                    | Role            | LinkedIn                                                        |
| -----: | ----------------------- | --------------- | --------------------------------------------------------------- |
|  🧑‍💻 | **Kishlaya Mishra**     | Product Manager | [LinkedIn](https://www.linkedin.com/in/kishlayamishra/)         |
|  👩‍💻 | **Harshita Bhaskaruni** | Tech Lead       | [LinkedIn](https://www.linkedin.com/in/harshitabhaskaruni1117/) |
|  🧑‍🎨 | **Akshitha Goud Kotha** | AI Engineer     | [LinkedIn](https://www.linkedin.com/in/kotha-akshitha-goud/)    |
|  👨‍🔬 | **Lalita Tyagi**        | Data Engineer   | [LinkedIn](https://www.linkedin.com/in/lalita-tyagi-893a99324/) |

---

## ⚙️ Quick Setup

```bash
# Clone repo
git clone https://github.com/kishlayamishra02/smart-scholarship-finder
cd smart-scholarship-finder

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Fill: DATABASE_URL, JWT_SECRET, SMTP creds, etc.

# Run dev
npm run dev

# Build
npm run build
```

### Environment Variables

```env
VITE_SUPABASE_PROJECT_ID="your_supabase_project_id_here"
VITE_SUPABASE_PUBLISHABLE_KEY="your_supabase_publishable_key_here"
VITE_SUPABASE_URL="https://your_supabase_project_url_here"
VITE_GEMINI_API_KEY="your_gemini_api_key_here"
```

> ⚠️ Do not commit secrets — configure in hosting dashboards.

---

## 🚀 Deployment

* **Web** → Netlify

  * Build: `npm run build`
  * Publish: `/dist` or `/build`
* **API** → Gemini
* **DB** → Supabase
* **Reminders** → Scheduled Functions

Live App → [https://aismartscholar.netlify.app](https://aismartscholar.netlify.app)

---

## 🧭 What’s Next

* 📱 PWA + offline support
* 🧾 Checklist + progress meter
* 🧠 Smarter matching signals
* 🌐 Expand regions & categories

---

## 🙏 Acknowledgements

* React, Tailwind, and OSS community
* Netlify for hosting
* Early testers for feedback

---

## 💬 Support

* General: **[Manager](mailto:kishlayamishra@gmail.com)**
* Partnerships: **[Tech Team](mailto:harshitabhaskaruni@gmail.com)**
* Issues: **[Engineer](mailto:akshithagoud.kotha2007@gmail.com)**

---

## 📄 License

MIT (see [LICENSE](./LICENSE))

---

## ✨ Final Quote

> “Access is opportunity. Let’s make it easier to reach.” 🌟
