import React from 'react';
import ReactDOM from 'react-dom';
import './main/css/index.css';
import App from "./main/js/App"
import * as serviceWorker from './main/js/serviceWorker';

ReactDOM.render(<App />, document.getElementById('table-app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
