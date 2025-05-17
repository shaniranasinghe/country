# 🌍 Country Explorer

Country Explorer is a full-stack web application that allows users to explore detailed information about countries worldwide, search and filter countries, and manage a personalized favorites list. The project features a React frontend and a Node.js/Express/MongoDB backend for authentication and favorites management.

---

## 🚀 Deployment

The application is live and accessible at:

👉 [https://country-seven-xi.vercel.app/.](https://country-seven-xi.vercel.app/)

---

## ✨ Features

### 🔒 User Authentication
- Register new accounts and log in securely (backend: Node.js/Express/MongoDB).
- User sessions managed with JWT tokens (backend) and localStorage (frontend).

### 🌎 Country Exploration
- Browse all countries with details like name, population, region, capital, languages, and more.
- Search countries by name.
- Filter countries by region and language.

### 📋 Detailed Country View
- View country flags, official names, and detailed statistics.
- Interactive map showing the country's location (React Leaflet).
- Real-time clock displaying local and country-specific times.

### ⭐ User Preferences
- Save countries to a personalized favorites list (persisted in backend DB).
- Toggle between viewing all countries and only favorites.
- Upload and manage profile images.

---

## 🛠️ Tech Stack

**Frontend**
- React 19
- React Router 7
- Tailwind CSS 4
- Framer Motion (animations)
- React Leaflet (maps)
- React Clock

**Backend**
- Node.js & Express
- MongoDB (Mongoose)
- JWT for authentication

**Development Tools**
- Vite (frontend build tool)
- Jest & React Testing Library (unit/integration testing)
- ESLint

---

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd af-2-shaniranasinghe
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in `backend/` with:
  ```
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/af_project
  JWT_SECRET=your_jwt_secret
  ```
- Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
- Start the frontend dev server:
```bash
npm run dev
```

### 4. Access the Application
Open your browser and navigate to:  
👉 `http://localhost:5173`

---

## 📦 Building for Production

To create a production build (frontend):
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

---

## 🧪 Running Tests

Run the test suite (frontend):
```bash
npm test
```

---

## Git Version Control

- Regular commits with meaningful messages.
- Repository link: [https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-shaniranasinghe.git](#)

## 📂 Project Structure

```
af-2-shaniranasinghe/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
└── README.md
```

---

## 🌐 API Integration

- Uses [REST Countries API](https://restcountries.com/v3.1) for country data.
- Backend exposes `/api/auth` and `/api/favorites` for authentication and favorites management.

---

## 📊 Technical Report

### Why REST Countries API?
- Rich data set: flags, population, languages, currencies, etc.
- No authentication required.
- Well-documented and reliable.

### Why Node.js/Express/MongoDB?
- Secure user authentication and favorites persistence.
- Scalable and easy to extend.

---

## 🧩 Challenges & Solutions

- **Client-Side & Server-Side Authentication:**
  - Used JWT for secure sessions, localStorage for frontend state.
- **Testing Components with External Dependencies:**
  - Used Jest mocks for API and localStorage.
- **Efficient Filtering & Searching:**
  - Used React state and backend queries.
- **Interactive Maps Integration:**
  - Used React-Leaflet for maps.
- **Responsive Design:**
  - Tailwind CSS utilities for mobile-first design.
- **Performance Optimization:**
  - Lazy loading, optimized API calls.
- **Error Handling:**
  - User-friendly error messages, error boundaries.
- **Accessibility:**
  - WCAG guidelines, ARIA attributes.
- **State Management:**
  - React Context API for global state.
- **Deployment:**
  - Vercel for frontend, local MongoDB for backend.

---

## 🚀 Future Improvements

- Implement a secure backend for authentication (done).
- Add more filtering options (e.g., population range, area).
- Introduce a country comparison feature.
- Add detailed statistics with visual charts.
- Support offline mode using service workers.
- Add multilingual support for the interface.

---

## 📜 License

This project was created as part of an academic assignment at SLIIT.