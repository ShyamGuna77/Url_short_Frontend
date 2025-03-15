# URL Shortener

This is a URL Shortener project with a frontend and backend.

## 🔗 Project Links
- **Frontend & Backend Repository:** [GitHub](https://github.com/ShyamGuna77/Url_Shortner)

## 🛠 Tech Stack
### Frontend:
- TypeScript
- Tailwind CSS
- Axios
- React-Toast

### Backend:
- Node.js
- Express.js
- MongoDB
- Shortid

## 🚀 Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```
4. The backend runs on:
   ```sh
   http://localhost:3000
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```
4. Open the frontend in your browser:
   ```sh
   http://localhost:5173
   ```

## 📌 API Endpoints
| Method | Endpoint       | Description                    |
|--------|---------------|--------------------------------|
| POST   | `/shorten`    | Shorten a URL                 |
| GET    | `/urls`       | Get all shortened URLs        |
| GET    | `/:shortUrl`  | Redirect to the original URL  |
| DELETE | `/urls/:id`   | Delete a shortened URL        |

## ✨ How It Works
1. Enter a long URL in the input field and click "Shorten".
2. The backend generates a short link and stores it in the database.
3. Click on the short link to visit the original URL.
4. Click count is tracked in the backend.

---

![Screenshot](./public/Screenshot%20(105).png) ....
