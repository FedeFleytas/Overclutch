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
                    <p class="classType">${race.class}</p>
                    <h3 class="raceName">${race.name}</h2>
                    <p class="locate">${race.ubication}</p>
                    <p class="time">${race.time}</p>
                    <p class="access">${race.access}</p>
                    <img src="${race.img}" class="track">
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
