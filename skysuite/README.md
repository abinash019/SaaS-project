# 🚀 SkySuite – Full Stack SaaS Platform

A modern **production-ready SaaS application** built with a scalable architecture using **Next.js (Frontend)** and **Node.js + Express (Backend)** with AI integration.

---

## 🌟 Features

### 🔐 Authentication

* User Register & Login (JWT )
* Protected Routes
* Secure API access

### 📁 File Management

* File Upload (Local Storage)
* File Listing
* File Deletion
* User-based file isolation

### 💳 Payments (Stripe)

* Subscription-based system
* Checkout session
* Webhook integration
* Payment verification

### 🤖 AI Integration (Groq API)

* Chat-based AI response
* Prompt → AI → Response flow
* Error handling & fallback system

### 📊 Architecture

* Clean architecture (Controller → Service → Model)
* Global Error Handling
* Middleware-based security
* Scalable folder structure

---

## 🏗️ Tech Stack

### Frontend

* Next.js (App Router)
* React.js
* Axios / Fetch API

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose

### AI

* Groq API (LLM आधारित)

### Payments

* Stripe

---

## 📁 Project Structure

```
skysuite/
 ┣ frontend/     → Next.js App
 ┣ server/       → Express API
 ┗ README.md
```

---

## ⚙️ Backend Setup

```bash
cd server
npm install
npm run dev
```

### 🔑 Environment Variables (`server/.env`)

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret

GROQ_API_KEY=your_groq_key

STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

CLIENT_URL=http://localhost:3000
```

---

## ⚙️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentication Flow

```
User → Login/Register
→ Backend verifies
→ JWT Token generated
→ Stored in localStorage
→ Used for protected API calls
```

---

## 🤖 AI Flow

```
User Input → Frontend
→ API Call (/api/ai)
→ Backend Service (Groq API)
→ AI Response
→ Send to Frontend
```

### ✅ AI Service Example

```js
exports.generateResponse = async (prompt) => {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error?.message || "Groq API failed");
    }

    return data?.choices?.[0]?.message?.content;
  } catch (err) {
    return "AI is temporarily unavailable.";
  }
};
```

---

## 💳 Payment Flow

```
User clicks Subscribe
→ Backend creates Stripe session
→ Redirect to Stripe Checkout
→ Payment Success
→ Webhook triggered
→ Subscription saved in DB
```

---

## 🔐 Protected Routes Example

```
GET /api/user/profile
Authorization: Bearer <token>
```

---

## 🧪 API Testing

Use:

* Postman
* Thunder Client

---

## 🚀 Deployment (Recommended)

### Frontend

* Vercel

### Backend

* Railway / Render

### Database

* MongoDB Atlas

---

## 📌 Future Improvements

* Role-based access (Admin/User)
* Cloud storage (AWS S3)
* Advanced AI features (chat history, memory)
* Team collaboration (multi-user workspace)
* Notifications system

---

## 👨‍💻 Author

**Abinash Karki**
Full Stack Developer 🚀

---

## ⭐ Final Note

This project is built using **production-level architecture** focusing on:

* Scalability
* Clean code
* Real SaaS structure

---

🔥 *This is not just a project — this is a SaaS foundation.*
