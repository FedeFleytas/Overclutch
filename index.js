let innerPages = document.querySelector('.races');


let dataRace = [];


const innerpagesHTML = () => {

    innerPages.innerHTML = '';
    

    if (dataRace.length > 0) {
        dataRace.forEach(race => {
            let newRace = document.createElement('div');
            newRace.classList.add('race');
            newRace.dataset.id = dataRace.id;
            newRace.innerHTML = `
            <div class="racing">
                <div class="raceIn">
                    <div>
                        <p>${race.class}</p>
                    </div>
                    <h3 class="raceName">${race.name}</h2>
                    <p>${race.ubication}</p>
                    <p>${race.time}</p>
                    <p>${race.access}</p>
                    <img url="${race.track}" class="trackImg">
                </div>
            </div>

            `;
            innerPages.appendChild(newRace)
        })
    }
}
innerpagesHTML();

//class name ubication time access track


const initApp = () => {
    fetch('data/race.json')
    .then(response => response.json())
    .then(data => {
        dataRace = data;
        innerpagesHTML();
    });
};

initApp();
