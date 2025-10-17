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
            ${race.id ? `<div class="racing">
                <div class="raceIn">
                    ${race.class ? `<p class="classType">${race.class}</p>` : ""}
                </div>
                <div class="raceCenter">
                    ${race.name ? `<h3 class="raceName">${race.name}</h2>` : ""}
                    <div class="locateContainer">
                        ${race.ubication ? `<p class="locate">${race.ubication}</p>` : ""}
                        ${race.time ? `<p class="time">${race.time}</p>` : ""}
                    </div>
                </div>
                <div class="raceFinal">
                    ${race.access ? `<p class="access">${race.access}</p>` : ""}
                </div>
                <div class="raceRight" >
                    ${race.img ? `<img src="${race.img}" class="track" id="trackId">` : ""}
                </div>
            </div>` : ""}

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




const songs = [
        { title: "Boss - Lil Pump", src: "music/boss.mp3" },
        { title: "Forza Freestyle - Rich Amiri", src: "music/forza.mp3" }
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







import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Necesitas importar getAuth
import { getFirestore } from "firebase/firestore"; // Necesitas importar getFirestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkhN5e6zka2JFS3ZO5gDKZSATGI51JW5U",
    authDomain: "blacklist-oc.firebaseapp.com",
    projectId: "blacklist-oc",
    storageBucket: "blacklist-oc.firebaseapp.com",
    messagingSenderId: "784801482803",
    appId: "1:784801482803:web:677d09879668d53a883b46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth y Firestore usando las funciones "get"
const auth = getAuth(app); 
const db = getFirestore(app);

const loginModal = document.getElementById('loginModal');
const crearCarreraModal = document.getElementById('crearCarreraModal');
const abrirLoginBtn = document.getElementById('abrirLoginBtn');
const loginBtn = document.getElementById('loginBtn');
const guardarCarreraBtn = document.getElementById('guardarCarreraBtn');
const mensajeError = document.getElementById('mensajeError');

abrirLoginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
    crearCarreraModal.style.display = 'none'; // Asegúrate de que el otro esté oculto
    mensajeError.textContent = '';
});

loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    mensajeError.textContent = '';

    try {
        // 1. Logear al usuario
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // 2. Verificar si el UID del usuario está en la colección de 'administradores'
        const adminDocRef = db.collection('userAdmin').doc(user.uid);
        const doc = await adminDocRef.get();

        if (doc.exists) {
            // Es administrador, procede a abrir la ventana de creación
            loginModal.style.display = 'none';
            crearCarreraModal.style.display = 'block';
            console.log("Login de Admin exitoso.");
        } else {
            // No es administrador, cierra sesión y notifica
            await auth.signOut();
            mensajeError.textContent = 'Acceso denegado: No es un administrador.';
        }
    } catch (error) {
        mensajeError.textContent = `Error de Login: ${error.message}`;
        console.error("Error de login:", error);
    }
});


guardarCarreraBtn.addEventListener('click', async () => {
    const nombre = document.getElementById('nombreCarrera').value;
    const precio = parseFloat(document.getElementById('precioCarrera').value);
    const mensajeExito = document.getElementById('mensajeExito');
    mensajeExito.textContent = '';

    if (!nombre || isNaN(precio)) {
        mensajeExito.textContent = 'Por favor, introduce un nombre y un precio válido.';
        return;
    }

    try {
        // Añade el documento a la colección 'Carreras'
        await db.collection('Carreras').add({
            nombre: nombre,
            precio: precio,
            fechaCreacion: new Date()
        });

        mensajeExito.textContent = `Carrera "${nombre}" guardado con éxito!`;
        // Opcional: limpiar los campos
        document.getElementById('nombreCarrera').value = '';
        document.getElementById('precioCarrera').value = '';

    } catch (error) {
        mensajeExito.textContent = `Error al guardar: ${error.message}`;
        console.error("Error al guardar el carrera:", error);
    }
});