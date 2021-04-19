import React from 'react';
import ReactDOM from 'react-dom';
import Jin from './Jin/App';
import { BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './Jin/Auth/AuthContext'
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <Jin />
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
