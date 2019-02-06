const firebase = require('firebase');

var config = {
  apiKey: 'AIzaSyCfjR-OWClRaSh3UAQDG0gMBZKeyQnzdWM',
  authDomain: 'face-detection-api-f17be.firebaseapp.com',
  databaseURL: 'gs://face-detection-api-f17be.appspot.com/',
  storageBucket: 'gs://face-detection-api-f17be.appspot.com/'
};
firebase.initializeApp(config);

export const storage = firebase.storage;

export const deleteImage = function(imageRef) {
  return imageRef.delete();
};
