Welocome Smart Scholarship Finder
https://aismartscholar.netlify.app/
# 🎓 AI Smart Scholar

> “Stop searching. Start applying.”  
> Find the most relevant, precise scholarships tailored to each student’s profile — with smart matching, deadline tracking, and confident applications.

[![🚀 View Live Demo](https://img.shields.io/badge/Live-Demo-00C853?style=for-the-badge&logo=netlify&logoColor=white)](https://aismartscholar.netlify.app/)
[![Docs](https://img.shields.io/badge/README-Docs-2962FF?style=for-the-badge)](#-overview)
[![License](https://img.shields.io/badge/License-MIT-000?style=for-the-badge)](#-license)

---

## ✨ Overview

AI Smart Scholar helps students discover scholarships that truly fit their academics, interests, and goals. The app simplifies discovery with AI-powered matching, offers direct apply links, and keeps applicants on track with helpful deadline reminders — so nothing slips through the cracks.

---

## 👀 Live View

[![Open Live App](https://img.shields.io/badge/OPEN-LIVE%20APP-00C853?style=for-the-badge&logo=google-chrome&logoColor=white)](https://aismartscholar.netlify.app/)

> View our work in action: explore personalized matches, visible timelines, and direct apply links.

---

## 📸 Gallery

> Replace these with your actual images. Keep alt text descriptive.

- ![Hero Screenshot](./assets/hero.png "Homepage hero")
- ![Matches](./assets/matches.png "Scholarship matches view")
- ![Timeline](./assets/timeline.png "Per-scholarship application timeline")

---

## 👁️ At a Glance

<table>
  <tr>
    <td><strong>Purpose</strong></td>
    <td>Personalized scholarship matching and deadline tracking</td>
  </tr>
  <tr>
    <td><strong>Tech Stack</strong></td>
    <td>React + TypeScript • Node.js + Express • Prisma • PostgreSQL • Tailwind CSS</td>
  </tr>
  <tr>
    <td><strong>AI / Matching</strong></td>
    <td>Rule-based filters + semantic ranking layer</td>
  </tr>
  <tr>
    <td><strong>Deployment</strong></td>
    <td>Netlify (Web) • Render/Railway (API) • Postgres (Neon/Railway)</td>
  </tr>
  <tr>
    <td><strong>Team</strong></td>
    <td>4 members — <a href="#-here-comes-the-team">jump to team</a></td>
  </tr>
</table>

---

## 💡 Reason Why Smart Scholarship

1. 🎯 Precision over noise — recommendations that truly fit each student’s profile  
2. ⏱️ Peace of mind — deadlines and milestones organized in visible timelines  
3. 🔗 Faster applications — direct links to official portals reduce friction  
4. 🌍 Broader discovery — local, national, and international opportunities  
5. 📈 Improves with use — smarter results as profiles evolve

---

## 🔑 Key Features

- 🧭 Profile-based matching with instant recommendations  
- 🔔 Deadline reminders and application tracking  
- 🔗 Direct apply links to verified sources  
- 🗂️ Saved opportunities and simple filters  
- 📝 Application checklist and personal notes  
- 📬 Email or in-app notifications

---

## 🧠 Technical Deep Dive

### System Flow
Client (React + TypeScript, Tailwind)
│
├─ 🔐 Auth (JWT / session)
│
├─ 📡 API Gateway (Node + Express)
│   ├─ Profile Service (user, academics, goals)
│   ├─ Matching Service (rules + semantic ranking)
│   ├─ Scholarships Service (CRUD, sources, validation)
│   └─ Timeline Service (events, reminders)
│
└─ 🗄️ Data Layer
├─ PostgreSQL (users, profiles, scholarships, matches, deadlines)
└─ Redis Cache (hot queries, rate limits)

### Request Journey

1. React app loads the user profile  
2. Calls Matching API with profile vectors and filters  
3. Matching ranks scholarships and returns top‑N with scores  
4. Timeline service aggregates due dates and milestones  
5. Client renders Matches, Checklist, and visible Timelines

### Data Model Highlights

- Tables: users, profiles, scholarships, tags, matches, deadlines, reminders  
- Indexes: tags, regions, deadlines for fast lookup  
- Ranking fields: similarity score, freshness, eligibility

---

## 🗓️ Application Timelines

> Stay organized with milestones per opportunity.

​
[Profile ✅]───[Shortlist 🎯]───[Docs 🗂️]───[Apply ✉️]───[Decision 🏁]

Add a screenshot of the timeline UI in the Gallery section once ready.

---

## 👥 Here Comes the Team

> Team of 4. Replace placeholders with your actual data.

| Avatar | Name        | Role                       | LinkedIn                |
|-------:|-------------|----------------------------|----------------------|
| 🧑‍💻 | Kishlaya Mishra    | Product Manager       | https://www.linkedin.com/in/kishlayamishra/   |
| 👩‍💻 | Harshita Bhaskaruni    | Tech Lead |   https://www.linkedin.com/in/harshitabhaskaruni1117/ |
| 🧑‍🎨 | Akshitha Goud Kotha    | AI-Engineer  | https://www.linkedin.com/in/kotha-akshitha-goud/   |
| 👨‍🔬 | Lalita Tyagi    | Data Engineer       | https://www.linkedin.com/in/lalita-tyagi-893a99324/ |

---

## ⚙️ Quick Setup
Clone
git clone [https://github.com/kishlayamishra02/smart-scholarship-finder]
cd ai-smart-scholar
Install
npm install
Environment
cp .env.example .env
Fill in: DATABASE_URL, JWT_SECRET, SMTP creds, etc.
Dev
npm run dev
Build
npm run build

### Environment Variables
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
SMTP_HOST=smtp.yourprovider.com
SMTP_USER=your_user
SMTP_PASS=your_pass
Add any AI/search provider keys if used 

> Do not commit secrets. Configure them in your hosting provider dashboards.

---

## 🚀 Deployment

- Web: Netlify  
  - Build: `npm run build`  
  - Publish directory: depends on framework (`dist`, `build`, `.next`)  
- API: Render, Railway, Fly.io  
- DB: Neon, Supabase, or Railway Postgres  
- Scheduled reminders: API scheduler or Netlify Scheduled Functions

Live app: https://aismartscholar.netlify.app/

---

## 🧭 What’s Next

- 📱 PWA and offline support  
- 🧾 Per‑scholarship application checklist and progress meter  
- 🧠 Enhanced matching signals and essay prompt hints  
- 🌐 Region, category, and currency expansions

---

## 🙏 Acknowledgements

- React, Tailwind, and the open‑source community  
- Netlify for smooth hosting and deploys  
- Early testers whose feedback shaped matching and reminders

---

## 💬 Support

- General: hello@yourdomain.com  
- Partnerships: partnerships@yourdomain.com  
- Issues: support@yourdomain.com

> Replace with real addresses or link a contact form.

---

## 📄 License

MIT (or your choice). Include a LICENSE file at the repo root.

---

## ✨ Final Quote

> “Access is opportunity. Let’s make it easier to reach.” 🌟

[https://github.com/kishlayamishra02/smart-scholarship-finder]: https://github.com/kishlayamishra02/smart-scholarship-finder
