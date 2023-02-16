import React, { Suspense } from 'react'
import {createRoot} from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
import './css/general.scss'

import "./i18n"
import App from './App.jsx'
import Loader from './components/Loader.jsx'

import * as serviceWorker from './serviceWorker'


createRoot(document.getElementById('root')).render(
  <Suspense fallback={<Loader />}>
    <App />
  </Suspense>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
