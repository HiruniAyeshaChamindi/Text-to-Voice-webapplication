# Text-to-Speech (TTS) Web App using Node.js and gTTS

A simple full-stack application that converts text (typed or uploaded) into spoken audio (MP3), using the Google Text-to-Speech (`gtts`) library in Node.js.

## Features

- ✅ Convert typed text into MP3 audio using `/api/convert`
- ✅ Upload `.txt` files to convert their content to speech via `/api/convert-file`
- ✅ Stream or download the generated MP3 file
- ✅ Simple RESTful API

- ---

##  Getting Started

### Backend Setup

1. Navigate to the `backend` directory:

```bash
cd backend
Install dependencies:

bash
Copy
Edit
npm install
(Optional) Create a .env file to set the port (defaults to 5000):

ini
Copy
Edit
PORT=5000
Run the server:

bash
Copy
Edit
node server.js
Server will start on http://localhost:5000.

### Frontend Setup
If you have a frontend:

Navigate to the frontend directory:

bash
Copy
Edit
cd frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm start
