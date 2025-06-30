# Travelogue 🌍✈️

Travelogue is a platform for travel enthusiasts to share their adventures, stories, and recommendations. Users can create profiles, post about their trips, and explore the experiences of others around the world.

---

## ✨ Features

### 🔐 User Authentication
- Secure sign-in/sign-up using **Auth.js (NextAuth)**.
- Only authenticated users can view posts, profiles, or use the platform.

### 👤 User Profiles
- Each user has a unique profile displaying:
  - Profile information
  - List of destinations they've visited
  - All their shared posts

### 📝 Create & Manage Posts
- Users can:
  - Create rich posts about their travel experiences
  - Add destinations, photos, trip dates, and markdown-based content
  - Edit or delete posts

### 🔍 Search & Explore
- Authenticated users can search posts by destination or tag

### 📲 Responsive Design
- Fully optimized for mobile, tablet, and desktop devices

### 🌐 Dynamic Routing
- `/profile/[username]` – View individual user profiles
- `/posts/[postId]` – Read full details of a single post

---

## 🛠 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) for modern responsive styling
- [Google Fonts](https://fonts.google.com/) for beautiful typography

### Backend & Data
- **Next.js API Routes** for server-side logic
- [Sanity.io](https://www.sanity.io/) as a headless CMS to store posts, images, and profile data

### Auth
- [NextAuth.js (Auth.js)](https://next-auth.js.org/) with JWT sessions and Google OAuth provider

---

## 🚀 Deployment

### 🐳 Dockerized
This app is containerized using **Docker** with a multi-stage build process for optimized image size and production performance.

### ☁️ Hosted on Google Cloud Run
The final container is deployed using **Google Cloud Run**, enabling serverless scalability with secure HTTPS out of the box.

**🔗 Live URL:**  
👉 [https://travelogue-468901630951.europe-west1.run.app/home](https://travelogue-468901630951.europe-west1.run.app/home)

---

## 🧰 Local Development

### Prerequisites
- Node.js (v18+)
- Docker (optional for container testing)
- A free [Sanity.io](https://www.sanity.io/) account
- Google OAuth credentials (for login)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/travelogue.git
   cd travelogue
  npm install
