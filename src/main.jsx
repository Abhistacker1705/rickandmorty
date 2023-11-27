import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import App from './App.jsx';
import EpisodeProvider from './context/EpisodeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <EpisodeProvider>
        <App />
      </EpisodeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
