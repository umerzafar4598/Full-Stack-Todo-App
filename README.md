# 📝 Full-Stack Todo Application

<div align="center">

![Todo App Banner](./screenshots/banner.png)

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue.svg)](https://www.postgresql.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**A modern, responsive full-stack todo application with deadline management, dark mode, and session-based authentication.**

[Demo](#-screenshots) • [Features](#-features) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation)

</div>

---

## 📸 Screenshots

### Dark Mode

<div align="center">
  <img src="./screenshots/login.png" alt="Login Page" width="45%" />
</div>

<div align="center">
  <img src="./screenshots/home.png" alt="Dashboard - Dark Mode" width="90%" />
</div>

## ✨ Features

### 🎨 Frontend Features
- ✅ **Modern UI/UX** - Clean, intuitive interface built with Tailwind CSS
- ✅ **Dark/Light Theme** - Toggle between themes with persistent storage
- ✅ **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ✅ **Real-time Updates** - Instant UI feedback with optimistic updates
- ✅ **Advanced Search** - Search todos by title or description
- ✅ **Smart Filtering** - Filter by status (All, Pending, Completed, Overdue)
- ✅ **Beautiful Animations** - Smooth transitions and loading states
- ✅ **Toast Notifications** - React Hot Toast for user feedback
- ✅ **SweetAlert2 Dialogs** - Beautiful confirmation dialogs

### 📅 Deadline Management
- 🔴 **Overdue** - Red badge for past-deadline tasks
- 🟠 **Urgent** - Orange badge for tasks due within 24 hours
- 🟡 **Soon** - Yellow badge for tasks due within 7 days
- 🔵 **Upcoming** - Blue badge for tasks due later
- 🟢 **Completed** - Green badge with strike-through text
- ⚪ **No Deadline** - Gray badge for tasks without deadlines

### 🔐 Backend Features
- ✅ **Session-based Authentication** - Secure login with Passport.js
- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **RESTful API** - Clean, organized endpoints
- ✅ **PostgreSQL Database** - Robust data persistence
- ✅ **SQL Injection Protection** - Parameterized queries
- ✅ **User Isolation** - Users can only access their own todos
- ✅ **CORS Enabled** - Secure cross-origin requests
- ✅ **Session Persistence** - 7-day session expiry

### 📊 Statistics Dashboard
- 📈 **Total Tasks** - Count of all todos
- ✅ **Completed** - Number of finished tasks
- ⏳ **Pending** - Number of incomplete tasks
- ⚠️ **Overdue** - Number of past-deadline tasks

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0.11-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.21.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.6.5-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.18.2-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-0.7.0-34E27A?style=for-the-badge&logo=passport&logoColor=white)

### Additional Libraries
- **lucide-react** - Beautiful icons
- **react-hot-toast** - Toast notifications
- **sweetalert2** - Beautiful alerts
- **bcrypt** - Password hashing
- **connect-pg-simple** - PostgreSQL session store
- **aos** - Animations on Scroll
- **animate.css** - Animation on appearances

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/umerzafar4598/Full-Stack-Todo-App.git
cd todo-app
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb todo_db

# Run the schema
cd backend
psql -d db_schema -f todo_schema.sql
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env

```

**Backend `.env` Configuration:**
```env
PORT=5000
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/todo_db
SESSION_SECRET=change-this-to-a-random-secret-key-in-production
NODE_ENV=development
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file (optional)
cp .env
```

**Frontend `.env` Configuration:**
```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend running on `http://localhost:5173`

### 6. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## Documentaions

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/logout` | Logout user | ✅ |
| GET | `/api/auth/me` | Get current user | ✅ |
| GET | `/api/auth/status` | Check auth status | ❌ |

### Todo Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/todos` | Get all todos | ✅ |
| GET | `/api/todos/:id` | Get single todo | ✅ |
| POST | `/api/todos` | Create new todo | ✅ |
| PUT | `/api/todos/:id` | Update todo | ✅ |
| PATCH | `/api/todos/:id/toggle` | Toggle completion | ✅ |
| DELETE | `/api/todos/:id` | Delete todo | ✅ |
| GET | `/api/todos/stats/overview` | Get statistics | ✅ |

---

## 🎯 Usage Guide

### Creating a Todo
1. Click the **"Add Todo"** button
2. Enter a title (required)
3. Add a description (optional)
4. Set a deadline (optional)
5. Click **"Create"**

### Editing a Todo
1. Click the **edit icon** (✏️) on any todo
2. Modify the fields
3. Click **"Update"**

### Deleting a Todo
1. Click the **delete icon** (🗑️) on any todo
2. Confirm deletion in the SweetAlert2 dialog
3. Todo is permanently removed

### Marking as Complete
1. Click the **checkbox** on any todo
2. Todo is marked as complete/incomplete

### Searching Todos
1. Type in the search box
2. Results filter in real-time

### Filtering Todos
1. Use the dropdown menu
2. Select: All, Pending, Completed, or Overdue

### Theme Toggle
1. Click the **sun/moon icon** in the header
2. Theme switches and saves automatically

---

## 🔒 Security Features

- ✅ **Password Hashing** - bcrypt with 10 salt rounds
- ✅ **Session Security** - HTTP-only cookies, secure flags
- ✅ **SQL Injection Protection** - Parameterized queries with whitelisted fields
- ✅ **XSS Protection** - React's built-in sanitization
- ✅ **CORS Protection** - Configured allowed origins
- ✅ **User Isolation** - Users can only access their data
- ✅ **Input Validation** - Client and server-side validation

---

## 🧪 Testing the Application

### Manual Testing Checklist

**Authentication:**
- [ ] Register a new account
- [ ] Login with credentials
- [ ] Access protected routes
- [ ] Logout successfully

**Todo Operations:**
- [ ] Create a todo
- [ ] Create a todo with deadline
- [ ] Edit a todo
- [ ] Mark todo as complete
- [ ] Delete a todo
- [ ] Search todos
- [ ] Filter todos

**UI/UX:**
- [ ] Toggle theme (dark/light)
- [ ] Test on mobile device
- [ ] Test all responsive breakpoints
- [ ] Check all animations

---


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Known Issues

- None currently. Please [open an issue](https://github.com/umerzafar4598/Full-Stack-Todo-App/issues) if you find any bugs.

---

## 📝 License

This project is licensed under the ISC License.

---

## 👤 Author

**Author Information**

- GitHub: [@umerzafar4598](https://www.github.com/umerzafar4598)
- LinkedIn: [@umerzafar](https://www.linkedin.com/in/umer-zafar-575371392/)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build Tool
- [Express.js](https://expressjs.com/) - Backend Framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Passport.js](http://www.passportjs.org/) - Authentication
- [SweetAlert2](https://sweetalert2.github.io/) - Beautiful Alerts
- [Lucide React](https://lucide.dev/) - Icons
- [AOS](http://michalsnik.github.io/aos/) - Animations on Scroll
- [animate.css](https://animate.style/) - Animations on Appearance

---


<div align="center">
  <p>Made with ❤️ and ☕</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>