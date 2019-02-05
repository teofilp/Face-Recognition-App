const firebase = require('firebase');

var config = {
  apiKey: 'AIzaSyCfjR-OWClRaSh3UAQDG0gMBZKeyQnzdWM',
  authDomain: 'face-detection-api-f17be.firebaseapp.com',
  databaseURL: 'gs://face-detection-api-f17be.appspot.com/',
  storageBucket: 'gs://face-detection-api-f17be.appspot.com/'
};
firebase.initializeApp(config);

var storage = firebase.storage;

export { storage };
