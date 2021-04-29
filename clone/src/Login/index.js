import React from 'react';
import ReactDOM from 'react-dom';
import LoginApp from './LoginFrame/LoginApp'
import { BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginApp />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
