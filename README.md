# DevLink

DevLink is a full-stack developer portfolio and social hub platform built with the **MERN Stack (MongoDB, Express, React, Node.js)**. 
It allows developers to showcase their projects, interact with others, and build a connected tech community.

>  **Note:** The Community feature is currently under development and will be added soon!

##  Table of Contents

- [About DevLink](#about-devlink)
- [Features](#features)
- [Backend Endpoints](#backend-endpoints)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
---

##  About DevLink

DevLink is designed to help developers connect, grow, and get discovered.

Whether you're a seasoned developer or just starting out, DevLink allows you to:
- Build a developer profile
- Upload projects and portfolios
- View, like and comment on other developers
- Engage with the developer community *(coming soon)*

---

##  Features

- Authentication using **JWT & Cookies**  
- Developer Profile with profile picture, bio, and portfolio  
- Upload & manage projects with images via **Cloudinary**  
- Like / Unlike user profiles  
- Comment system for user profiles  
- Responsive Design with **Light/Dark Mode Toggle**  
- Developer Search Functionality  
   **Community Page (Coming Soon)**  
- Post updates
- Comment on posts
- Like and interact with community content

---

## Backend Endpoints 
  Note: Backend is deployed separately. Some interactive features requiring backend integration may be under development or temporarily unavailable.
  Backend API : https://dev-link-0om4.onrender.com/

##  Screenshots

Landing Page :

<img width="1881" height="916" alt="image" src="https://github.com/user-attachments/assets/a7d5c62f-c8bc-436f-bb14-ca7a0dfb1b90" />

Home Page : 

<img width="1867" height="903" alt="image" src="https://github.com/user-attachments/assets/33878e5a-b5b8-47b0-8e62-ad6f7b2e69a8" />

User Profie : 
<img width="1870" height="907" alt="image" src="https://github.com/user-attachments/assets/26d21a3b-3673-4235-a6ea-b50698e611a2" />

User Comment : 

<img width="1858" height="906" alt="image" src="https://github.com/user-attachments/assets/51875a23-7f27-42e3-b7aa-b7c991f7544c" />

User Settings : 
<img width="1869" height="917" alt="image" src="https://github.com/user-attachments/assets/46501599-7c65-4604-95e1-4295b4fe94e5" />

User Project : 
<img width="1864" height="900" alt="image" src="https://github.com/user-attachments/assets/9fcb2efd-ec20-4e42-9a80-32825103cbeb" />
---

##  Tech Stack

**Frontend:**  
- React.js  
- Tailwind CSS  
- Axios  
- React Context API  
- React Router DOM  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- Cloudinary (for image storage)  
- JWT (for auth)  
- Cookie-parser & CORS

---

##  Installation & Setup

```bash
# Clone the repository
git clone https://github.com/rottenpotatowqndjwww/Dev-Link
cd Dev-Link

# Navigate to frontend
cd client
npm install
npm run dev

# In a separate terminal, navigate to backend
cd ../server
npm install
npm run start
