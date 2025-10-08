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





const slider = document.querySelector('.carouselSlider');
const items = document.querySelectorAll('.carouselItem');
const prevButton = document.querySelector('.carouselControl.prev');
const nextButton = document.querySelector('.carouselControl.next');

let currentIndex = 0;
const totalItems = items.length;
const itemWidth = 100 / totalItems;
function updateSlider() {
    const offset = currentIndex * (100 / totalItems); 
    
    slider.style.transform = `translateX(-${offset}%)`;
}

nextButton.addEventListener('click', () => {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; 
    }
    updateSlider();
});


prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
    }
    updateSlider();
});