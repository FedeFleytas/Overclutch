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
                </div>
                <div class="raceCenter">
                    <h3 class="raceName">${race.name}</h2>
                    <div class="locateContainer">
                        <p class="locate">${race.ubication}</p>
                        <p class="time">${race.time}</p>
                    </div>
                </div>
                <div class="raceFinal">
                    <p class="access">${race.access}</p>
                </div>
                <div class="raceRight" >
                    <img src="${race.img}" class="track" id="trackId">
                </div>
            </div>

            `;
            innerPages.appendChild(newRace)

        })
    }
}
innerpagesHTML();



const initApp = () => {
    fetch('data/race.json')
    .then(response => response.json())
    .then(data => {
        dataRace = data;
        innerpagesHTML();
    });
};

initApp();

// let button = document.getElementById('buttonId');
// let img = document.getElementById('imagen');
// let close = document.getElementById('buttonClose')
// let screen = document.getElementById('screenId')

// button.addEventListener('click', () =>
//     img.classList.toggle('none'),
// )

// button.addEventListener('click', () =>
//     screen.classList.toggle('none'),
// )

// close.addEventListener('click', () =>
//     screen.classList.toggle('none')
// )

// close.addEventListener('click', () =>
//     img.classList.toggle('none')
// )

const buttons = document.querySelectorAll('.buttonMember');
const screen = document.querySelector('.screenImg');
const closeButton = document.getElementById('buttonClose');
const memberImages= document.querySelectorAll('.memberImg');


function toggleScreen(show, targetMember = null) {
    if(show) {
        screen.classList.remove('none');

        memberImages.forEach(img => {
            img.classList.add('none');
        });


        if (targetMember) {
            const targetImg = document.querySelector(`.memberImg[data-target="${targetMember}"]`);
            if (targetImg) {
                targetImg.classList.remove('none')
            }
        }
    } else {
        screen.classList.add('none');
    }

}


buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const targetMember = event.currentTarget.dataset.target;

        toggleScreen(true, targetMember);
    });
});

closeButton.addEventListener('click', () => {
    toggleScreen(false);
})