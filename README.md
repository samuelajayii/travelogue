# Travelogue  

Travelogue is a platform for travel enthusiasts to share their adventures, stories, and recommendations. Users can create profiles, post about their travels, and explore the experiences of others.  

## Features  

### Core Features  
- **User Authentication:**  
  Secure sign-in/sign-up functionality. Only logged-in users can view posts and profiles. Used Auth.js.  

- **User Profiles:**  
  - Displays user information.  
  - List of destinations visited.  

- **Create & Manage Posts:**  
  - Users can write detailed posts about their trips.  
  - Add locations, photos, and recommendations.  
  - Edit and delete posts as needed.  

- **Dynamic Routing:**  
  - `/profile/[username]` – View user profiles and their travel experiences.  
  - `/posts/[postId]` – View individual posts with complete details.  

### Additional Features  


- **Explore & Search:**  
  - Search posts by destination or tags (available after login).  

- **Responsive Design:**  
  - Fully optimized for mobile, tablet, and desktop.  

## Tech Stack  

- **Frontend:**  
  - [Next.js](https://nextjs.org/)  
  - [Tailwind CSS](https://tailwindcss.com/) for styling  
  - Google Fonts for typography  

- **Backend:**  
  - Next.js API routes  
  - [Sanity CMS](https://www.sanity.io/) for content management  

- **Database:**  
  - [Sanity](https://www.sanity.io/) for storing posts and user profiles  

- **Authentication:**  
  - [NextAuth.js](https://next-auth.js.org/)  

- **Deployment:**  
  - Hosted on [Vercel](https://vercel.com/)  

## Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/travelogue.git
   cd travelogue
