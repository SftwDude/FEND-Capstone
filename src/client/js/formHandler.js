import unknownLocationImage from '../media/where-2730754_1280.png'

function handleSubmit(event) {
    event.preventDefault()

    // get the inputs from the form fields
    let location = document.getElementById('destination').value;
    let departureDate = document.getElementById('dateDeparture').value;
    let returnDate = document.getElementById('dateReturn').value;

    const today = new Date();
    const futureDeparture = new Date(departureDate);
    const futureReturn = new Date(returnDate);

    if (!Client.checkValidDate(futureDeparture)) {
        alert(`The departure date is not valid`);
        return;
    }

    if (!Client.checkValidDate(futureReturn)) {
        alert(`The return date is not valid`);
        return;
    }

    //Calculate the numbers of days until departure and duration of the trip
    const daysUntilDeparture = Math.ceil((futureDeparture.getTime() - today.getTime()) / (1000 * 3600 * 24));
    const tripDuration = Math.ceil((futureReturn.getTime() - futureDeparture.getTime()) / (1000 * 3600 * 24));
    if (daysUntilDeparture < 1) {
        alert('Please pick a date in the future.');
        return;
    }
    if (tripDuration < 0) {
        alert('Please enter a return date greater than the departure date.');
        return;
    }

    fetch(`http://localhost:8081/travelItineary?location=${location}&dDate=${futureDeparture}&rDate=${futureReturn}`)
        .then(res => res.json())
        .then(res => {
                let image = document.getElementById('destImage');
                if (res.image) {
                    image.src = res.image;
                }
                else {
                    image.src = unknownLocationImage;
                }
                image.alt = location;

                const durationStr = (function IIFE(duration) {
                    if (duration == 0)
                        return 'A day ';
                    else
                        return `${tripDuration} day `
                }(tripDuration));

                if (res.weatherData) {
                    document.getElementById('results').innerHTML = `${durationStr} trip to ${location} is ${daysUntilDeparture} days until departure. 
                                                           <br><br>Typical weather for then is: High: ${res.weatherData.max_temp} Low: ${res.weatherData.min_temp}`;
                }
        })
}

export { handleSubmit }
