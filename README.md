# 🚀 Smart Todo Manager

A Full Stack Todo Management Application built using **FastAPI**, **Next.js**, **TypeScript**, **Tailwind CSS**, and **MySQL**.

---

## ✨ Features

- ✅ Add Tasks
- ✏️ Edit Tasks
- 🗑 Delete Tasks
- ✔ Mark Complete / Pending
- 🌙 Dark Mode
- 📊 Dashboard
  - Total Tasks
  - Pending Tasks
  - Completed Tasks
- 📱 Responsive UI
- REST API using FastAPI
- MySQL Database Integration

---

## 🛠 Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- SQLAlchemy
- Alembic

### Database

- MySQL

---

## 📂 Project Structure

```
smart-todo-manager/

├── backend/
│ ├── app/
│ ├── alembic/
│ ├── requirements.txt
│ └── alembic.ini
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── next.config.ts
```

---

## ⚙ Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## ⚙ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🌐 API Documentation

Swagger UI

```
http://localhost:8000/docs
```

---

## Screenshots

### Light Mode

![Light Mode](screenshots/light.png)

### Dark Mode

![Dark Mode](screenshots/dark.png)

## 👩‍💻 Author

**Sanchita Rani Nayak**

B.Tech CSE (AI & ML)

GitHub:
https://github.com/sanznyk
