import "./index.css";

async function getCars() {
    let url = "/cars.json?"
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderCars() {
    let cars = await getCars();
    let html = '';
    cars.forEach(car => {
        let htmlSegment = `
                            <div class="column">
                            <div class="car">
                            <img  alt="" src="${car.picturePath}" >
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
