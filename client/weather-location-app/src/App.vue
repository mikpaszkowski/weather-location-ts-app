<template>
  <div id="nav">
    <button @click="showMyCoordinates">Where I am?</button>
    <p v-show="coordinates.long" id="longitude">
      {{ "Longitude: " + coordinates.long }}
    </p>
    <p v-show="coordinates.lat" id="latitude">
      {{ "Latitude: " + coordinates.lat }}
    </p>
    <p v-show="location.city">
      {{ "You are in " + location.country + ", " + location.city }}
    </p>
    <img v-if="location.flag" v-bind:src="location.flag" alt="Flag" id="country-flag">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      coordinates: {
        long: 0,
        lat: 0,
      },
      location: {
        city: "",
        country: "",
        flag: null,
      },
    };
  },
  methods: {
    getMyPosition: function () {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
    showMyCoordinates: function () {
      //this function is offloaded its work to the background to the browser's web API
      if (navigator.geolocation) {
        this.getMyPosition()
          .then((position) => {
            this.coordinates.long = position.coords.longitude;
            this.coordinates.lat = position.coords.latitude;
            console.log("if : " + this.coordinates.lat + " " + this.coordinates.long);
            return axios.get(`https://geocode.xyz/${this.coordinates.lat},${this.coordinates.long}?geoit=json`);
          })
          .then((response) => {
            this.location.city = response.data.city;
            this.location.country = response.data.country;
            console.log(response);
            return axios.get(`https://restcountries.eu/rest/v2/name/${this.location.country}`);
          })
          .then(response => {
            this.location.flag = response.data[0].flag;
          })
          .catch((err) => console.log(err));
      } else {
        console.log("Geolocation API failure.");
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400;1,500&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  text-align: center;
  color: #2c3e50;
  font-size: 20px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  p {
    padding: 20px;
  }
}
</style>
