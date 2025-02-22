# 🏠 WessKree - Property Rental Platform

WessKree is a web platform that connects property renters and owners in Tunisia. Users can browse, post, and manage property listings, request tours, and apply for rentals. 

## 🌍 Live Demo
[WessKree Website](https://wesskree.vercel.app/)

## 🚀 Features

### 🏡 Home Page
- 🔍 Fixed navigation bar with a search bar for state and city.
- 📌 Browse all listed properties with filtering options.
- ❤️ Favorite button available for logged-in users.

### 🔐 Authentication
- 🔑 Login via Email/Password or Google.
- 📝 Signup with Username (unique), Public Name, Email (unique), and Password.
- 🔄 Forgot password functionality with OTP verification.
- 🏗️ After signup, users must complete the setup page (state, city, contact).
- 🚫 Restricted access to profile, favorites, applications, and tours until setup is completed.

### 🏠 Property Page
- 📋 Detailed property information, including:
  - 🏷️ Title, 🏢 Type, 🏗️ Category, 📏 Area, 🛏️ Rooms, 🛌 Bedrooms, 🚿 Bathrooms, 🍽️ Kitchen, 🛋️ Furnishing Status, 📆 Lease Duration, 💰 Price, ☎️ Contact, 📝 Description, 📍 State, 🌆 City, 🔢 Zip, 🏘️ Neighborhood, 🗺️ Map, 🖼️ Images, ✨ Features.
- 🔗 Share property link.
- 🏘️ Nearby properties section.
- ❤️ Favorite, 📩 Apply, and 📅 Request Tour buttons.
- 👥 Owners can accept or reject applications/tour requests.

### 📌 Post Property
- 🛠️ Three-step property posting process:
  1. 📄 Property details (Title, Type, Category, Area, etc.)
  2. 📍 Location details (State, City, Zip, Neighborhood, Google Maps location)
  3. 🖼️ Images & Features selection

### 📑 Requests Page
- Contains two sections: 
  - **📩 Applications**: Shows sent and received applications. Owners can accept/reject applications and open chats upon acceptance.
  - **📅 Tours**: Similar to applications, but for scheduling in-person or virtual tours.
- 🔔 Real-time notifications for application/tour updates.

### 👤 Profile Pages
- **👨‍💼 My Profile**:
  - 🖼️ User details (profile image, contact info).
  - 🏡 My Properties (edit/delete functionality, no favorite option).
  - ❤️ Favorite Properties (with the ability to unfavorite).
- **🏠 Owner Profile**:
  - ➕ Follow the owner to receive real-time notifications about new listings.
  - ❤️ Favorite owner properties.

### ⚙️ Settings Page
- ✏️ Update Public Name, State, City, Contact, Email, and Password.
- ❌ Username cannot be changed (unique constraint).
- 🔑 Password confirmation required before applying changes.

### 🌟 General Features
- 🎨 Smooth animations and alerts.
- ⏳ Loading indicators for actions and page loads.

## 🛠️ Tech Stack

### 🎨 Frontend
- **React.js** (⚡ Vite, 📦 TanStack Query, 🎨 Ant Design, 🎭 SCSS, ☁️ Cloudinary for asset storage, 🔄 Socket.IO for real-time communication)

### 🔙 Backend
- **MERN Stack** (🗄️ MongoDB, 🚀 Express.js, ⚛️ React.js, 🖥️ Node.js)
- 🔐 JWT authentication, 🚀 Express, 🛠️ Mongoose, ✉️ Nodemailer, 🔄 Socket.IO
- 🍪 Cookies for JWT storage, 🔒 Bcrypt for password encryption
- 📂 MVC architecture (main.js/routes/controllers/middleware/models)

### 🚀 Deployment
- **Frontend**: 🚀 Deployed on Vercel
- **Backend**: 🖥️ Deployed on Render
