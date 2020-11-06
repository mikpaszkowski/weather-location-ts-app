const express = require('express');
const axios = require('axios');

const app = express();

app.listen(process.env.PORT || 3030, () => {
    console.log('Application is running.');
});


app.get('/location', (req, res) => {

  
})