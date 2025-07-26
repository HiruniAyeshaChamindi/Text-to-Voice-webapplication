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
  ```

2.Install dependencies:

  ```bash
  npm install
  ```
    
3. (Optional) Create a .env file to set the port (defaults to 5000):

 ```bash
 PORT=5000
 ```
    
4. Run the server:

 ```bash
 node server.js
 ```

Server will start on http://localhost:5000.

### Frontend Setup
  
1. Navigate to the frontend directory:
  
 ```bash
 cd frontend
 ```

2. Install dependencies:
  
  ```bash
  npm install
  ```
  
3. Start the development server:

 ```bash
 npm start
 ```

## ✅ Pros

| Advantage | Description |
|-----------|-------------|
| **Free to use** | No API key or payment required. |
| **Easy to set up** | Lightweight and simple integration in Node.js or Python. |
| **Supports many languages** | Covers most Google Translate-supported languages. |
| **Fast response time** | Audio is streamed almost instantly for short texts. |
| **No need for external services** | No cloud platform setup required (unlike Google Cloud TTS).

---

## ❌ Cons

| Limitation | Description |
|------------|-------------|
| **Unofficial API** | Uses a non-public Google endpoint that may change or break without notice. |
| **Rate limited** | Excessive or automated use may result in IP blocking or throttling. |
| **No voice customization** | You can't change voice, pitch, speed, or gender. |
| **Limited to online use** | Requires internet access — no offline speech generation. |
| **Limited error handling** | Less graceful handling of very long or malformed text.

---


