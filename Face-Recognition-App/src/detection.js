import request from 'request';

const subscriptionKey = '5827d53414524d6e8918ad41ad7bb7f8';

const uriBase =
  'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';

const imageUrl =
  'https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg';

// Request parameters.
const params = {
  returnFaceId: 'true',
  returnFaceLandmarks: 'false',
  returnFaceAttributes:
    'age,gender,headPose,smile,facialHair,glasses,' +
    'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
};

const options = {
  uri: uriBase,
  qs: params,
  body: '{"url": ' + '"' + imageUrl + '"}',
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': subscriptionKey
  }
};

const setImageUrl = function(imageUrl) {
  options.body = '{"url": ' + '"' + imageUrl + '"}';
};

const getFaceDetails = function(callback) {
  request.post(options, (error, response, body) => {
    if (error) throw error;
    console.log(body);
    callback(body);
  });
};

export { setImageUrl, getFaceDetails };
