import React from 'react';
import ReactDOM from 'react-dom';
import Jin from './Jin/App';
import { BrowserRouter} from 'react-router-dom';
require('dotenv').config();
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Jin />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
