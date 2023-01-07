import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
// 105326754209-e02pui1mlhb6u0ud4v0g3itvr5iip624.apps.googleusercontent.com
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="268425863623-r7oavatem0cs8df8n7j9mq4lc9iq2l21.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>

  </React.StrictMode>
);
