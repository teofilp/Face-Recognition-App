<template>
  <div id="detection" class="col-md-12">
    <div class="row">
      <div
        class="col-md-1 offset-md-11 p-3 mr-2 text-center rounded-circle form-div"
        @click="closeForm"
      >&#10005;</div>
    </div>

    <div class="row mb-3">
      <div style="height: 450px" class="col-md-4 offset-md-1">
        <table v-if="faceDetails" class="table table-borderless bg-info">
          <thead>
            <tr>
              <th scope="col">Key</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Gender</th>
              <td>{{ faceDetails.gender }}</td>
            </tr>
            <tr>
              <th scope="row">Age</th>
              <td>{{faceDetails.age}}</td>
            </tr>
            <tr>
              <th scope="row">Emotion</th>
              <td>{{faceDetails.averageEmotion}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <img v-if="imageURL" class="face-image offset-md-1" :src="imageURL" alt>
    </div>

    <div class="row">
      <div class="custom-file col-md-4 offset-md-1">
        <input type="file" class="custom-file-input" @change="process($event)">
        <label for class="custom-file-label">Choose file</label>
      </div>
      <button class="btn btn-info col-md-3 pt-2 pb-2 offset-md-1" @click="detect">Detect</button>
    </div>

    <div v-if="progress > 0 && progress < 100" class="progress mt-2">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated bg-info"
        role="progressbar"
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{width: progress + '%'}"
      ></div>
    </div>
  </div>
</template>
<script>
import { storage } from "../db/firebase.js";
import {
  setImageUrl,
  getFaceDetails,
  setSubscriptionKey
} from "./../detection.js";
export default {
  data() {
    return {
      image: null,
      imageURL: null,
      faceDetails: null,
      progress: 0
    };
  },
  methods: {
    closeForm() {
      this.$emit("closeForm");
    },
    process(event) {
      this.image = event.target.files[0];
      this.imageURL = URL.createObjectURL(this.image);
      console.log(this.image);
    },
    detect() {
      this.faceDetails = null;
      if (!this.imageURL) return alert("Image not set");

      this.progress = 20;
      console.log(storage);
      var storageRef = storage().ref();
      var imageRef = storageRef.child("images/image.jpg");

      imageRef.put(this.image).then(snapshot => {
        this.progress = 45;
        imageRef.getDownloadURL().then(url => {
          this.progress = 75;
          setImageUrl(url);
          this.progress = 95;
          getFaceDetails(data => {
            this.analyzeResults(data);
            this.deleteImage(imageRef);
          });
        });
      });
    },
    analyzeResults(data) {
      if (!data || data.length == 2) {
        this.progress = 100;
        return alert("no face detected, try another photo");
      }

      data = JSON.parse(data);

      let faceAttributes = data[0].faceAttributes;

      let emotions = faceAttributes.emotion;

      let averageEmotion = "";
      let maxScale = -1;

      let emotionNames = Object.keys(emotions);

      for (let emotion in emotions) {
        if (emotions[emotion] > maxScale) {
          maxScale = emotions[emotion];
          averageEmotion = emotion;
        }
      }

      let age = data[0].faceAttributes.age;
      let gender = data[0].faceAttributes.gender;
      this.progress = 100;
      this.faceDetails = {
        age,
        gender,
        averageEmotion
      };
    },
    deleteImage(imageRef) {
      imageRef.delete().then(response => console.log(response));
    }
  },
  created() {
    this.$http
      .get(
        "https://face-detection-api-f17be.firebaseio.com/meta/keys/subscriptionKey.json"
      )
      .then(response => {
        setSubscriptionKey(response.body);
      });
  }
};
</script>

<style scoped>
#detection {
  margin-top: 120px;
  background: #138496;
  height: 600px;
}

.form-div {
  cursor: pointer;
}

.face-image {
  max-width: 500px;
  max-height: 450px;
  object-fit: cover;
}
</style>


