# Udacity FEND Travel App project

The final project in the Front-End web developer couse is a travel app that uses all lessons learned during the course:

- 1-CSS, Website Layout, Website Components
- 2-Javascript & The DOM
- 3-Web APIs and Asynchronous
- 4-Build Tools and Single Page Web Apps

The travel app obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs. 

Only define port 8081 in the .env file for the server. The client is expecting to communicate using http://localhost:8081. The api endpoint in the server to retreive the travel itineary information is http://localhost:8081/travelItineary passing the parameters:

- location = the destination city
- dDate = the departure date
- rDate = the return date

for example: http://localhost:8081/travelItineary?location=Cancun&dDate=2020-07-08&rDate=2020-07-09

