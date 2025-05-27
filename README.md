**💬 ChatSphere – Real-Time Chat App**

  ChatSphere is a full-stack real-time chat application built with the MERN stack and enhanced with Socket.io, Zustand for global state management, and Tailwind CSS for sleek, responsive UI. It supports JWT-based   authentication, persistent messaging, and live chat with seamless user experience.

**🚀 Features**

  🔐 JWT Authentication – Secure user login and registration
  
  💬 Real-Time Messaging – Powered by WebSockets via Socket.io
  
  🧠 Global State Management – Managed using Zustand
  
  🎨 Modern UI – Built with Tailwind CSS and React components
  
  🗂️ MongoDB Message Persistence – Chat history is saved to the database
  
  ✅ Protected Routes – Only authenticated users can access the chat
  
	
**Technologies Used**

  
  **Frontend**	React.js, Tailwind CSS, Zustand, Axios, Socket.io-client
  
  **Backend**	Node.js, Express.js, MongoDB, Mongoose, JWT, Socket.io
  
  **Database**	MongoDB Atlas
  
**🧪 Setup Instructions**
  
  1️⃣ Clone the Repository
  bash
  Copy
  Edit
  git clone https://github.com/Sidh-2507/ChatSphere.git
  cd ChatSphere
  
  2️⃣ Backend Setup
  bash
  Copy
  Edit
  cd backend
  npm install
  Create a .env file:
  
  ini
  Copy
  Edit
  PORT=5000
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_secret_key
  Start the backend:
  
  bash
  Copy
  Edit
  npm run dev
  
  3️⃣ Frontend Setup
  bash
  Copy
  Edit
  cd ../frontend
  npm install
  npm run dev
  Frontend will run on http://localhost:5173
  
  
  Login Page	Chat Room
  
  **📦 API Overview**
  
  Method	Endpoint	Description
  
  POST	/api/register	Register a new user
  
  POST	/api/login	Login existing user
  
  GET	/api/messages	Get all messages
  
  POST	/api/messages	Post a new message
  
  **🧑‍💻 Author**
    **Siddharth Trivedi**
  
  **📍 Toronto, Canada**
