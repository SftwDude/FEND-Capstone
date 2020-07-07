function handleSubmit(event) {
    event.preventDefault()

    // get the inputs from the form fields
    let location = document.getElementById('destination').value;
    let departureDate = document.getElementById('dateDeparture').value;
    let returnDate = document.getElementById('dateReturn').value;

    //Calculate the numbers of days until departure
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

    const daysUntilDeparture = Math.ceil((futureDeparture.getTime() - today.getTime()) / (1000 * 3600 * 24));
    const tripDuration = Math.ceil((futureReturn.getTime() - futureDeparture.getTime()) / (1000 * 3600 * 24)) + 1;
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
        .then(function (res) {
            let image = document.getElementById('destImage');
            image.src = res.image;
            image.alt = location;

            document.getElementById('results').innerHTML = `${tripDuration} day trip to ${location} is ${daysUntilDeparture} days until departure. 
                                                           <br><br>Typical weather for then is: High: ${res.weatherData.max_temp} Low: ${res.weatherData.min_temp}`;
        })
}

export { handleSubmit }
