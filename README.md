# 🚀 AI Interview Platform (MERN + AI + Razorpay)

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:10B981,100:6366F1&height=220&section=header&text=AI%20Interview%20Platform&fontSize=42&fontColor=ffffff&animation=fadeIn&desc=Smart%20AI%20Powered%20Interview%20Preparation&descAlignY=75" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?color=00FFB3&size=26&center=true&vCenter=true&width=900&lines=AI+Powered+Interview+Preparation;Real-time+Voice+Interview+System;MERN+Stack+Project;Modern+Premium+UI+Design;AI+Feedback+and+Analytics;Secure+Razorpay+Payment+Integration" />
</p>

---

# 🏆 Badges

<p align="center">

<img src="https://img.shields.io/badge/MERN-Stack-4CAF50?style=for-the-badge"/>

<img src="https://img.shields.io/badge/AI-Powered-black?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Razorpay-Payment-blue?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Status-Production-success?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Responsive-UI-purple?style=for-the-badge"/>

</p>

---

# 🌍 Live Demo

## 🚀 Live App

👉 https://ai-interview-two-sigma.vercel.app

---

## 💻 GitHub Repository

👉 https://github.com/suvojitmanna/AI-Interview

---

# 🧠 Project Overview

An advanced AI-powered interview preparation platform built using the MERN Stack, featuring AI-generated questions, real-time voice interviews, analytics, secure payments, and modern premium UI/UX.

---

# ✨ Core Highlights

⚡ AI Generated Interview Questions  
🎤 Real-time Voice Recognition  
📊 Smart Performance Analytics  
💬 AI Feedback System  
🔐 Secure JWT Authentication  
💳 Razorpay Payment Integration  
📱 Fully Responsive Premium UI  
🚀 Smooth Framer Motion Animations  

---

# 🧱 MERN Stack

<p align="center">

<img src="https://skillicons.dev/icons?i=mongodb,express,react,nodejs" />

</p>

---

# 🧠 System Design (High-Level)

```mermaid
flowchart LR

    U[User] --> F[React Frontend]

    F -->|REST API| B[Express Backend]

    B --> DB[(MongoDB)]

    B --> AI[AI Processing Engine]

    B --> RP[Razorpay API]

    AI --> F

    RP --> F
```

---

# ⚙️ AI Interview Flow

```mermaid
sequenceDiagram

    participant User
    participant Frontend
    participant Backend
    participant AI
    participant DB

    User->>Frontend: Start Interview

    Frontend->>Backend: Request Questions

    Backend->>AI: Generate Questions

    AI-->>Backend: AI Questions

    Backend->>Frontend: Send Questions

    User->>Frontend: Submit Answer

    Frontend->>Backend: Answer Data

    Backend->>AI: Analyze Answer

    AI-->>Backend: Feedback + Score

    Backend->>DB: Save Result

    Backend-->>Frontend: Final Report
```

---

# 🔥 Features

# 🤖 AI Interview System

- AI Generated Questions
- Technical + HR Interviews
- Voice Recognition Support
- AI Feedback & Suggestions
- Live Interview Experience
- Smart Scoring System

---

# 📊 Analytics Dashboard

- Performance Tracking
- Skill Analysis
- Score Graphs
- Interview History
- Progress Monitoring

---

# 💳 Payment System

- Razorpay Integration
- Secure Online Payment
- Credits Based Plans
- Premium Subscription System

---

# 🎨 UI/UX

- Modern Premium UI
- Glassmorphism Effects
- Responsive Design
- Smooth Animations
- Interactive Components

---

# 🖼 Demo Preview

<p align="center">

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExplaceholder/giphy.gif" width="850"/>

</p>

---

# 📊 GitHub Insights

<p align="center">

<img src="https://github-readme-stats.vercel.app/api?username=suvojitmanna&show_icons=true&theme=tokyonight&hide_border=true"/>

<img src="https://github-readme-streak-stats.herokuapp.com/?user=suvojitmanna&theme=tokyonight&hide_border=true"/>

</p>

---

# 📈 Contribution Activity

<p align="center">

<img src="https://github-readme-activity-graph.vercel.app/graph?username=suvojitmanna&theme=react-dark&hide_border=true&area=true"/>

</p>

---

# 🏆 Achievements

<p align="center">

<img src="https://github-profile-trophy.vercel.app/?username=suvojitmanna&theme=onedark&no-frame=true&margin-w=10"/>

</p>

---

# 🧩 Project Structure

```bash
client/
│
├── components/
├── pages/
├── redux/
├── assets/
├── hooks/
└── App.jsx

server/
│
├── controllers/
├── routes/
├── middleware/
├── models/
├── config/
├── utils/
└── server.js
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/suvojitmanna/AI-Interview.git
```

---

# 📦 Install Dependencies

## Frontend

```bash
cd client
npm install
```

---

## Backend

```bash
cd server
npm install
```

---

# ▶️ Run Application

## Start Backend

```bash
npm run server
```

---

## Start Frontend

```bash
npm run dev
```

---

# 🔐 Environment Variables

# Frontend `.env`

```env
VITE_SERVER_URL=http://localhost:8000

VITE_RAZORPAY_KEY=your_razorpay_key
```

---

# Backend `.env`

```env
PORT=8000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

RAZORPAY_KEY_ID=your_key

RAZORPAY_KEY_SECRET=your_secret
```

---

# 💳 Razorpay Setup

## Install Razorpay

```bash
npm install razorpay
```

---

## Add Razorpay Script

Inside `index.html`

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

---

# 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/interview | Fetch Interviews |
| POST | /api/interview/start | Start Interview |
| POST | /api/payment/order | Create Payment Order |
| POST | /api/payment/verify | Verify Payment |

---

# 📦 Important Packages

```bash
npm install axios react-router-dom react-hot-toast framer-motion react-icons
```

---

# 🚀 Deployment

# Frontend Deploy

- Vercel
- Netlify

---

# Backend Deploy

- Render
- Railway
- Cyclic

---

# 🔒 Authentication

- JWT Authentication
- Protected Routes
- Secure Cookies
- Google Authentication

---

# 🎯 Future Enhancements

🤖 AI Video Interview  
📄 Resume Upload Analysis  
🌐 Multi Language Support  
🎙 AI Voice Assistant  
📈 Advanced Analytics  
🏆 Leaderboard System  
📱 Mobile Application  

---

# 🤝 Contributing

```bash
git checkout -b feature-name

git commit -m "Add new feature"

git push origin feature-name
```

---

# ⭐ Support

If you like this project:

⭐ Star the Repository  
🍴 Fork the Project  
📢 Share with Friends  

---

# 👨‍💻 Author

# Suvojit Manna

### Full Stack MERN Developer

💻 React Developer  
⚙️ Backend Developer  
🎨 UI/UX Designer  

---

# 📜 License

MIT License

---

# 👁 Visitors

<p align="center">

<img src="https://komarev.com/ghpvc/?username=suvojitmanna&label=Profile%20Views&color=brightgreen&style=for-the-badge"/>

</p>

---

# 🎯 Footer

<p align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6366F1,100:10B981&height=140&section=footer"/>

</p>
