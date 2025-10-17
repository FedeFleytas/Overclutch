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
    fetch('public/data/race.json')
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




const songs = [
        { title: "Boss - Lil Pump", src: "public/music/boss.mp3" },
        { title: "Forza Freestyle - Rich Amiri", src: "public/music/forza.mp3" }
    ];

let currentSong = 0;

const music = document.getElementById('music');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const playPauseBtn = document.getElementById('playPause');
const volumeControl = document.getElementById('volume');
const equalizer = document.getElementById('equalizer');
const title = document.getElementById('songTitle');

let isPlaying = true;


    function loadSong(index) {
        const song = songs[index];
        music.src = song.src;
        title.textContent = song.title;
        music.load();
        music.play().catch(() => {
            isPlaying = false;
            playPauseBtn.textContent = '▶️';
            equalizer.classList.add('paused');
        });
    }

    window.addEventListener('load', () => {
        music.volume = 0.1;
        volumeControl.value = 0.1;
        loadSong(currentSong);
    });

    window.addEventListener('load', () => {
        music.volume = volumeControl.value;
        music.play().catch(() => {
            isPlaying = false;
            playPauseBtn.textContent = '▶️';
            equalizer.classList.add('paused');
        });
    });

    document.addEventListener('click', () => {
        if (!isPlaying) {
            music.play();
            playPauseBtn.textContent = '⏸️';
            equalizer.classList.remove('paused');
            isPlaying = true;
        }
    }, { once: true });

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            playPauseBtn.textContent = '▶️';
            equalizer.classList.add('paused');
        } else {
            music.play();
            playPauseBtn.textContent = '⏸️';
            equalizer.classList.remove('paused');
        }
        isPlaying = !isPlaying;
    });

    volumeControl.addEventListener('input', () => {
        music.volume = volumeControl.value;
    });


    nextBtn.addEventListener('click', () => {
        currentSong = (currentSong + 1) % songs.length;
        loadSong(currentSong);
        isPlaying = true;
        playPauseBtn.textContent = '⏸️';
        equalizer.classList.remove('paused');
    });


    prevBtn.addEventListener('click', () => {
        currentSong = (currentSong - 1 + songs.length) % songs.length;
        loadSong(currentSong);
        isPlaying = true;
        playPauseBtn.textContent = '⏸️';
        equalizer.classList.remove('paused');
    });


    music.addEventListener('ended', () => {
        currentSong = (currentSong + 1) % songs.length;
        loadSong(currentSong);
    });