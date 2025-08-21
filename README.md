**🛍️ ShopElite**
-
ShopElite is a full-stack e-commerce web application built with React (Vite) for the frontend and Node.js + Express + MongoDB for the backend.
It provides a modern shopping experience with authentication, product filtering, cart management, and checkout flow.

***🚀 Features***
-
**👥 User**
  - Register & Login with JWT authentication
  - Persistent login (session stored in localStorage)
  - View products by category (Men, Women, Home)
  - Search, sort & filter products
  - Add/Remove products from cart
  - Proceed to checkout
    
**🛒 Cart**
  - Global cart (shared across Men/Women/Home pages)
  - Add items with "Quick Add"
  - View cart details in a dedicated Cart page
  - Cart items persist across navigation
    
**🖼️ Products**
  - Responsive product cards with hover effects
  - API-based product data served from backend
  - Men & Women products managed via JSON DB
    
**🔧 Tech Stack**
  - Frontend: React (Vite), TailwindCSS
  - Backend: Node.js, Express.js
  - Database: MongoDB
  - Auth: JWT (JSON Web Token)
  - Hosting: Vercel (frontend), Render (backend)

⚙️ Installation & Setup
-
1️⃣ Clone the repo
```bash
git clone https://github.com/Josh-0115/ShopElite.git
cd ShopElite
```
2️⃣ Backend Setup
```bash
cd backend
npm install
```
 - Create a `.env` file in `backend/` with:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=3001
   ```
 - Run backend:
   ```bash
   npm start
   ```
3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

🌍 Deployment
-
  - Frontend → Vercel
  - Backend → Render

🤝 Contributing
-
Contributions are welcome! Feel free to fork the repo and create a pull request.

📜 License
-
This project is licensed under the MIT License.

👨‍💻 Author
-
Developed by ``Josh-0115`` ✨

