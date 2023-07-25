        ////////LIBRARY/////////
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter as Router} from 'react-router-dom';

        ///////COMPONENTS///////
import App from './App';



serviceWorker.unregister();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
    <Router>
        <App />
    </Router>
);