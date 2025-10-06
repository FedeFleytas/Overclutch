let innerPages = document.querySelector('.races');


let dataRace = [];


const innerpagesHTML = () => {

    innerPages.innerHTML = '';
    

    if (dataRace.length > 0) {
        dataRace.forEach(race => {
            let newRace = document.createElement('div');
            newRace.classList.add('pace');
            newRace.dataset.id = dataRace.id;
            newRace.innerHTML = `
            <div class="raceIn">
                <img url(${race.class})>
                <h3 class="raceName">${race.name}</h2>
                
            </div>


            `;
            innerPages.appendChild(newRace)
        })
    }
}
innerpagesHTML();

//name ubication time access


const initApp = () => {
    fetch('js/race.json')
    .then(response => response.json())
    .then(data => {
        dataPage = data;
        innerpagesHTML();
    });
};

initApp();
