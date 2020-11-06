<template>
  <div id="nav">
    <button @click="showMyCoordinates">Where I am?</button>
    <p v-show="coordinates.long" id="longitude">{{'Longitude: ' + coordinates.long}}</p>
    <p v-show="coordinates.lat" id="latitude">{{'Latitude: ' + coordinates.lat}}</p>
    <p v-show="location.city">{{'City: ' + location.city}}</p>
    <router-view></router-view>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      coordinates: {
        long: 0,
        lat: 0,
      },
      location: {
        city: "",
      }
    }
  },
  methods: {
    showMyCoordinates: function() {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          this.coordinates.long = position.coords.longitude;
          this.coordinates.lat = position.coords.latitude;
        })
      }else{
        console.log('Geolocation is broken');
      }
      console.log(this.coordinates.lat +' ' +  this.coordinates.long);
      this.getMyLocation(this.coordinates.lat, this.coordinates.long);
    },
    getMyLocation: function(lat, long){
      axios.get(`https://geocode.xyz/${lat},${long}?geoit=json`)
            .then(res => {
              this.location.city = res.data.city;
            })
            .catch(err => {
              console.log(err);
            })
  
    }
  },
  
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400;1,500&display=swap');



* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
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

  p{
    padding: 20px;
  }
}
</style>
