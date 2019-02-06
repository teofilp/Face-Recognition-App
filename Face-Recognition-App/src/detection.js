import request from 'request';

var subscriptionKey;

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

var options;

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

const setSubscriptionKey = function(value) {
  subscriptionKey = value;
  options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey
    }
  };
};

export { setImageUrl, getFaceDetails, setSubscriptionKey };
