function handleSubmit(event) {
    event.preventDefault()

    // get the inputs from the form fields
    let location = document.getElementById('destination').value;
    let departureDate = document.getElementById('date').value;
    
    //Client.checkForName(formText)

    //Calculate the numbers of days until departure
    const today = new Date();
    const future = new Date(departureDate);
    const daysUntilDeparture = Math.ceil((Math.abs(future.getTime() - today.getTime())) / (1000 * 3600 * 24));

    fetch(`http://localhost:8081/travelItineary?location=${location}`)
        .then(res => res.json())
        .then(function (res) {
            let image = document.getElementById('destImage');
            image.src = res.image;
            image.alt = location;
            
            document.getElementById('results').innerHTML = `${location} is ${daysUntilDeparture} days until departure. 
                                                           <br><br>Typical weather for then is: High: ${res.weatherData.max_temp} Low: ${res.weatherData.min_temp}`;
        })
}

export { handleSubmit }
