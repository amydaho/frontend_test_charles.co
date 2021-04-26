import "./index.css";
const regeneratorRuntime = require("regenerator-runtime");

async function getCars(duration=null, distance=null) {
    var params =''
    if (duration != null) {
        params+= "duration="+duration;
    }
    if (distance != null) {
        params+= "&distance="+distance;
    }
    let url = params !== '' ? "/cars.json?"+params : "/cars.json?"
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderCars(duration=null, distance=null) {
    let cars = await getCars(duration, distance);
    let html = '';
    cars.forEach(car => {
        let htmlSegment = `
                            <div class="column">
                            <div class="car">
                            <img src="${car.picturePath}" >
                            <h2 style="text-align: center">${car.brand} ${car.model}</h2>
                            <h3 style="text-align: center">Price per day : <b>${car.pricePerDay}</b></h3>
                            <h3 style="text-align: center">Price per km : <b>${car.pricePerKm}</b></h3>
                        </div>
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.row');
    container.innerHTML = html;
}
renderCars();

$(document).ready(function(){
    $("form").on("submit", function(event){
        event.preventDefault();
        var duration = document.getElementById('duration').value
        var distance = document.getElementById('distance').value
        renderCars(duration,distance);
    });
});
