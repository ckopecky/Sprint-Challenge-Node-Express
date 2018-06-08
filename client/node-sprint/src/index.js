import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainRouter from './MainRouter';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(<Router><MainRouter /></Router>, document.getElementById('root'));
