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
    
    let lat, lng;
    geonames.search({ q: req.query.location }) //get continents
        .then(resp => {
            const destinationData = new Object();
            if (resp.geonames[0]) {
                console.log(resp.geonames);

                ({ lat, lng } = resp.geonames[0]);
                GetWeather(lat, lng, req.query.dDate, req.query.rDate).then(resp => {
                    const weatherData = resp.data[0];
                    GetPicture(req.query.location).then(resp => {
                        destinationData.weatherData = weatherData;
                        if (resp.hits[0])
                            destinationData.image = resp.hits[0].largeImageURL;
                        res.json(destinationData);
                    });
                });
            }
            else {
                destinationData.weatherData = undefined;
                destinationData.image = undefined;
                res.json(destinationData);
            }
        })
        .catch(err => console.error(err));
})

async function GetWeather(lat, lng, startDate, endDate) {
    const sMonth = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(new Date(startDate));
    const sDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(new Date(startDate));

    const eMonth = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(new Date(endDate));
    const eDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(new Date(endDate));
    try {
        let response = await fetch(`http://api.weatherbit.io/v2.0/normals?` +
            `lat=${lat}` +
            `&lon=${lng}` +
            `&start_day=${sMonth}-${sDay}` +
            `&end_day=${eMonth}-${eDay}` +
            `&key=${process.env.API_KEY_WEATHERBIT}`);
        let data = response.json();
        return data;
    } catch (error) {
        console.log("GetWeather Error: ", error);
    }
}

async function GetPicture(location) {
    try {
        let response = await fetch(`https://pixabay.com/api/?key=${process.env.API_KEY_PIXABAY}&q=${encodeURIComponent(location)}&image_type=photo`);
        let data = response.json();
        return data;
    } catch (error) {
        console.log("GetPicture Error: ", error);
    }
}

