import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.scss'
import App from './App';
import firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';
import "bootstrap/scss/bootstrap.scss";

firebase.initializeApp( {
  apiKey: "AIzaSyDY8m-Hl87D0OxMKh8k02NWYZ9bryTzxcw",
  authDomain: "parkin-36e17.firebaseapp.com",
  databaseURL: "https://parkin-36e17.firebaseio.com",
  projectId: "parkin-36e17",
  storageBucket: "parkin-36e17.appspot.com",
  messagingSenderId: "1056606055525"
} )


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
