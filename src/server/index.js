var path = require('path')
const express = require('express')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')
const Geonames = require('geonames.js')

const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8081;

const app = express()

app.use(express.static('dist'))
app.use(cors())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get('/travelItineary', function (req, res) {
    //console.log(`travelItineary called req.query.location =  ${req.query.location}`)

    const geonames = new Geonames({
        username: process.env.API_USERNAME_GEONAMES,
        lan: 'en',
        encoding: 'JSON'
    });
    // promise
    let lat, lng;
    geonames.search({ q: req.query.location }) //get continents
        .then(resp => {
            console.log(resp.geonames);

            ({ lat, lng } = resp.geonames[0]);
            GetWeather(lat, lng).then(resp => {
                const weatherData = resp.data[0];
                GetPicture(req.query.location).then(resp => {
                    const destinationData = {
                        weatherData,
                        image: resp.hits[0].largeImageURL
                    }
                    res.json(destinationData);
                });
            });
            //res.send({ message: `lat:${lat} lng:${lng}` });

        })
        .catch(err => console.error(err));
})

async function GetWeather(lat, lng) {
    let response = await fetch(`http://api.weatherbit.io/v2.0/normals?lat=${lat}&lon=${lng}&start_day=07-23&end_day=07-23&key=${process.env.API_KEY_WEATHERBIT}`);
    let data = response.json();
    return data;
}

async function GetPicture(location) {
    let response = await fetch(`https://pixabay.com/api/?key=17363540-bc8ccf8d48d9ef026574066c8&q=${encodeURIComponent(location)}&image_type=photo`);
    let data = response.json();
    return data;
}

