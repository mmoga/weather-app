const express = require('express');
const axios = require('axios');

require('dotenv').config();
const { API_KEY } = process.env;

const serverApp = express();
const port = process.env.PORT || 5000;

serverApp.get('/forecast/:lat,:lon', function(request, response){
    const { lat, lon } = request.params;
    const url = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lon}`;
    axios.get(url)
        .then(res => {
            response.status(200).json(res.data);
        })
        .catch(err => {
            response.status(500).json({
                msg: 'Stuff\'s broke, man'
            })
        });
});

serverApp.listen(port, () => {
    console.log(`Now listening on port ${port}`);
})