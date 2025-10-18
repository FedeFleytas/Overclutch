import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';
import { getFirestore, doc, getDoc, getDocs, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkhN5e6zka2JFS3ZO5gDKZSATGI51JW5U",
    authDomain: "blacklist-oc.firebaseapp.com",
    projectId: "blacklist-oc",
    storageBucket: "blacklist-oc.appspot.com",
    messagingSenderId: "784801482803",
    appId: "1:784801482803:web:677d09879668d53a883b46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);




document.addEventListener('DOMContentLoaded', () => {

    let innerPages = document.querySelector('.races');

    const innerpagesHTML = (data) => {

        innerPages.innerHTML = '';

        const ONE_DAY_MS = 5 * 60 * 60 * 1000;
        const now = new Date().getTime();

        if (data.length > 0) {
            data.forEach(race => {
                let newRace = document.createElement('div');
                newRace.classList.add('race');
                newRace.dataset.id = race.id;

                let newTagHTML = '';
                            
                // Lógica de cálculo de tiempo
                if (race.fechaCreacion) { 
                    const creationTime = race.fechaCreacion.toDate().getTime(); 
                    if (now - creationTime <= ONE_DAY_MS) {
                        newTagHTML = '<span class="new-tag">NEW</span>'; 
                    }
                }

                newRace.innerHTML = `
                ${race.id ? `<div class="racing">
                    <div class="raceIn">
                        ${race.clase ? `<p class="classType">${race.clase}</p>` : ""}
                    </div>
                    <div class="raceCenter">
                        ${race.nombre ? `<h3 class="raceName">${race.nombre}</h2>` : ""}
                        <div class="locateContainer">
                            ${race.ubicacion ? `<p class="locate">${race.ubicacion}</p>` : ""}
                            ${race.hora ? `<p class="time">${race.hora}</p>` : ""}
                        </div>
                    </div>
                    <div class="raceFinal">
                        ${race.acceso ? `<p class="access">${race.acceso}</p>` : ""}
                    </div>
                    <div class="raceRight" >
                        ${race.img ? `<img src="${race.img}" class="track" id="trackId">` : ""}
                    </div>
                ${newTagHTML}</div>` : ""}

                `;
                innerPages.appendChild(newRace)

            })
        }
    }



async function loadRacesFromFirestore() {
    try {
        const q = collection(db, "carreras");
        const querySnapshot = await getDocs(q);
        
        // 3. Mapear los documentos al formato de array
        const dataRace = querySnapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data() 
        }));

        console.log("Datos recibidos de Firestore:", dataRace);
        
        // 4. Llama a la función de renderizado con los datos obtenidos
        // 🛑 CORRECCIÓN: Llamamos a innerpagesHTML, no a insertInnerPages
        innerpagesHTML(dataRace); 

    } catch (error) {
        console.error("Error al cargar las carreras desde Firestore:", error);
        innerPages.innerHTML = '<h2>No se pudieron cargar las carreras.</h2>';
    }
}

// 🛑 AHORA SÍ: LLAMAR A LA FUNCIÓN DE CARGA
// Esto asume que estás dentro de document.addEventListener('DOMContentLoaded', () => { ... });
loadRacesFromFirestore();

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
            { title: "Boss - Lil Pump", src: "./music/boss.mp3" },
            { title: "Forza Freestyle - Rich Amiri", src: "./music/forza.mp3" }
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
        // ESTA PARTE ES FUNDAMENTAL Y DEBÍA FALTARTE:
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;
        const mensajeError = document.getElementById('mensajeError'); 
        mensajeError.textContent = '';
        // FIN PARTE FUNDAMENTAL
        loginModal.style.display = 'none';
        // Mostrar modal de Creación de Carrera
        crearCarreraModal.style.display = 'none';

        try {
            console.log(email, password)
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const adminDocRef = doc(db, 'userAdmin', user.uid);
            const adminDoc = await getDoc(adminDocRef);

            if (adminDoc.exists() && adminDoc.data().isAdmin === true) {
            // ✅ VERIFICACIÓN EXITOSA: Es un administrador
            
            // Muestra el modal de Creación de Carrera
            crearCarreraModal.style.display = 'block';
            // Opcional: Mostrar mensaje de bienvenida y mantener el estado
            mensajeError.textContent = `Bienvenido Admin: ${user.email}`;
            console.log("Admin logueado y autorizado.");
            
            } else {
                // ❌ VERIFICACIÓN FALLIDA: No es administrador (o no tiene el rol)
                
                // Cerrar sesión inmediatamente por seguridad si no es admin
                await signOut(auth);
                
                // Mostrar error y el modal de login de nuevo
                crearCarreraModal.style.display = 'none';
                mensajeError.textContent = `Acceso Denegado: Credenciales válidas, pero no autorizado como administrador.`;
                loginModal.style.display = 'block'; // Volver a mostrar el modal de login
            }
            
            // ... (resto de la lógica de verificación de admin) ...
        } catch (error) {
            mensajeError.textContent = `Error de Login: ${error.message}`;
            loginModal.style.display = 'block';
        }
    });


    guardarCarreraBtn.addEventListener('click', async () => {
        // Obtención de valores del DOM (está bien)
        const clase = document.getElementById('claseCarrera').value;
        const nombre = document.getElementById('nombreCarrera').value;
        const ubication = document.getElementById('ubicationCarrera').value;
        const hora = document.getElementById('timeCarrera').value; 
        const acceso = document.getElementById('accesoCarrera').value; 
        const mensajeExito = document.getElementById('mensajeExito');
        mensajeExito.textContent = '';

        // Validar que todos los campos requeridos estén llenos.
        if (!clase || !nombre || !ubication || !hora || !acceso) {
            mensajeExito.textContent = 'Por favor, completa todos los campos de la carrera.';
            return;
        }

        try {
            const carrerasCollectionRef = collection(db, 'carreras');
            
            await addDoc(carrerasCollectionRef, {
                clase: clase,
                nombre: nombre,
                ubicacion: ubication,
                hora: hora,
                acceso: acceso,
                fechaCreacion: new Date()
            });

            mensajeExito.textContent = `Carrera "${nombre}" guardada con éxito! 🎉`;
            
            // CORRECCIÓN: Limpiar TODOS los campos de texto
            document.getElementById('claseCarrera').value = '';
            document.getElementById('nombreCarrera').value = '';
            document.getElementById('ubicationCarrera').value = ''; // <--- AGREGAR ESTA LIMPIEZA
            document.getElementById('timeCarrera').value = '';
            document.getElementById('accesoCarrera').value = '';
            
            // Para limpiar el input de archivo:
            document.getElementById('imagenCarreraInput').value = ''; // <--- LIMPIAR EL INPUT FILE
            crearCarreraModal.style.display = 'none';


        } catch (error) {
            mensajeExito.textContent = `Error al guardar: ${error.message}`;
            console.error("Error al guardar la carrera:", error);
        }
    });

});
