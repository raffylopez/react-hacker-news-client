import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/test-react-router-3/App';
import './index.css';

import {BrowserRouter, Route, Link} from 'react-router-dom';
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.querySelector("#app"));


