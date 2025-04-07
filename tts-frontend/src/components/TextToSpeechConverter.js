// src/components/TextToSpeechConverter.jsx
import React, { useState, useRef } from 'react';
import './TextToSpeechConverter.css';

const TextToSpeechConverter = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    setError('');
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Check if file is text
    if (!file.type.match('text.*') && !file.name.match(/\.(txt)$/i)) {
      setError('Please upload a valid text file (.txt)');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setText(e.target.result);
    reader.onerror = () => setError('Error reading file');
    reader.readAsText(file);
  };

  const convertToSpeech = async () => {
    if (!text.trim()) {
      setError('Please enter text or upload a file');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const blob = await response.blob();
      setAudioUrl(URL.createObjectURL(blob));
      
      // Auto-play the audio when ready
      if (audioRef.current) {
        audioRef.current.oncanplaythrough = () => audioRef.current.play();
      }
    } catch (err) {
      console.error('Conversion error:', err);
      setError('Failed to convert text to speech. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = () => {
    setText('');
    setAudioUrl('');
    setFileName('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="tts-container">
      <h1>Text to Speech Converter</h1>
      
      <div className="file-upload-section">
        <label htmlFor="file-upload" className="upload-btn">
          {fileName || 'Choose Text File'}
          <input
            id="file-upload"
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </label>
        {fileName && (
          <button onClick={clearAll} className="clear-btn">
            Clear
          </button>
        )}
      </div>

      <div className="text-editor">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Or type/paste your text here..."
          rows={10}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="controls">
        <button
          onClick={convertToSpeech}
          disabled={isLoading || !text.trim()}
          className="convert-btn"
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Converting...
            </>
          ) : (
            'Convert to Speech'
          )}
        </button>
      </div>

      {audioUrl && (
        <div className="audio-player">
          <h3>Your Audio:</h3>
          <audio ref={audioRef} controls src={audioUrl} />
          <a
            href={audioUrl}
            download="speech.mp3"
            className="download-btn"
          >
            Download Audio
          </a>
        </div>
      )}
    </div>
  );
};

export default TextToSpeechConverter;