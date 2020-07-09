# Udacity FEND Travel App project

The final project in the Front-End web developer couse is a travel app that uses all lessons learned during the course:
- 1-CSS, Website Layout, Website Components
- 2-Javascript & The DOM
- 3-Web APIs and Asynchronous
- 4-Build Tools and Single Page Web Apps

The travel app obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs. The travel app has <mark>additional functionality</mark> that takes a return date and displays the length of the trip.

## Setup
The app requires the use of an .env file located in the root of the applications. The .env file needs to contain the enviroment variables:
- PORT = must be set to <ins>8081</ins>
- API_USERNAME_GEONAMES = your user name for the GeoNames API
- API_KEY_WEATHERBIT = your api key for the Weatherbit API
- API_KEY_PIXABAY = your api key for Pixabay API

## App Infomation
The client is expecting to communicate using http://localhost:8081. The api endpoint in the server to retreive the travel itineary information is http://localhost:8081/travelItineary passing the parameters:
- location = the destination city
- dDate = the departure date
- rDate = the return date

for example: http://localhost:8081/travelItineary?location=Cancun&dDate=2020-07-08&rDate=2020-07-09

## Execution
The application consists of a Server and a Client. The server can be run from a CLI by going to the root of the application folder and running 'npm start'. If the server started you should see the message 'Server app listening on port 8081'.

After the server has successfully started, the client can be view from a Web Browser by entering the url 'http://localhost:8081'.

## Client Instructions
In the client web site enter the trips destination, departure date, and return date. Select the 'Find Trip' button. If a valid destination has been entered and an image exist for the destination then it will be displayed. Otherwise, a default image will be displayed that says "WHERE" with the leters spelled with question (?) marks. 

The departure date must be greater than the current date. The return date must be greater than or equal to the departure date.

