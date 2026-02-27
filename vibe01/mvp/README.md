# Career Readiness MVP

Full-stack app: Node/Express/MongoDB backend + React frontend.

---

## 🚀 Setup & Run (5 steps)

### 1. Make sure MongoDB is running
```bash
# macOS (Homebrew)
brew services start mongodb-community

# Ubuntu/Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 2. Start the Backend
```bash
cd backend
npm install
node server.js
# ✅ Should print: Server running on http://localhost:5000
# ✅ Should print: MongoDB connected
```

### 3. Start the Frontend
Open a **new terminal tab**:
```bash
cd frontend
npm install
npm start
# Opens http://localhost:3000 automatically
```

### 4. Use the App
- Go to **http://localhost:3000**
- Answer all 10 MCQs → click Submit
- Dashboard shows your scores pulled from MongoDB

---

## 📁 Project Structure
```
mvp/
├── backend/
│   ├── server.js       ← Express server, routes, Mongoose model
│   ├── .env            ← MongoDB URI config
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.js
    │   └── pages/
    │       ├── DiagnosticPage.js   ← MCQ test
    │       └── DashboardPage.js    ← Results display
    └── package.json
```

## 🔌 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/submit-test | Accepts scores, calculates readiness, saves to DB |
| GET  | /api/latest-result | Returns most recent result |

## Score Calculation
```
readinessIndex = (codingScore × 0.4) + (aptitudeScore × 0.3) + (communicationScore × 0.3)
```
