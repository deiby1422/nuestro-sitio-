// --- Datos para el Carrusel ---
const contentItems = [
    { type: 'image', src: 'img/img1.jpg', alt: 'Abrazo', text: "Cada día a tu lado fue un regalo que atesoro." },
    { type: 'text', src: '', alt: '', text: "Mi corazón te pertenece por completo, ahora y siempre." },
    { type: 'image', src: 'img/img2.jpg', alt: 'Corazones', text: "Juntos, habiamos construido un mundo hermoso." },
    { type: 'text', src: '', alt: '', text: "Dos almas, un mismo destino,\nunidos por la magia de este amor divino." }

    // Asegúrate de tener las imágenes img1.jpg e img2.jpg en una carpeta llamada 'img'
];

let currentIndex = 0;

// --- Elementos del DOM ---
const mainImage = document.getElementById('main-image');
const mainText = document.getElementById('main-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// --- Función para Actualizar el Contenido ---
function updateContent() {
    const currentItem = contentItems[currentIndex];

    // 1. Manejar Imagen
    if (currentItem.type === 'image') {
        mainImage.src = currentItem.src;
        mainImage.alt = currentItem.alt;
        mainImage.style.display = 'block'; // Mostrar la imagen
    } else {
        mainImage.style.display = 'none'; // Ocultar si es solo texto/poema
    }

    // 2. Manejar Texto/Poema
    mainText.innerText = currentItem.text;
}

// --- Event Listeners para los Botones ---
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % contentItems.length;
    updateContent();
});

prevBtn.addEventListener('click', () => {
    // Asegura que el índice siempre sea positivo
    currentIndex = (currentIndex - 1 + contentItems.length) % contentItems.length;
    updateContent();
});

// Inicializa el contenido al cargar la página
updateContent();


// --- Funcionalidad del Audio de Fondo ---
const backgroundMusic = document.getElementById('background-music');
const playPauseBtn = document.getElementById('play-pause-btn');
let isPlaying = false;

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        playPauseBtn.innerText = '▶️ Tocar Música';
    } else {
        // Nota: Los navegadores modernos pueden bloquear la reproducción automática.
        // El usuario debe interactuar con la página (hacer clic en un botón) para que el audio se reproduzca.
        backgroundMusic.play().then(() => {
            isPlaying = true;
            playPauseBtn.innerText = '⏸️ Pausar Música';
        }).catch(error => {
            console.error("Error al intentar reproducir el audio:", error);
            alert("El navegador bloqueó la reproducción automática. Por favor, intenta de nuevo.");
        });
    }
    isPlaying = !isPlaying;
});
// --- Funcionalidad de Corazones al hacer Clic ---

document.body.addEventListener('click', function(event) {
    const corazon = document.createElement('div');
    corazon.classList.add('corazon-click');

    // Definimos el tamaño para centrar el corazón en el puntero
    const size = 25; 
    
    // Posiciona el corazón exactamente donde se hizo clic (restamos la mitad del tamaño para centrarlo)
    corazon.style.left = (event.clientX - size / 2) + 'px';
    corazon.style.top = (event.clientY - size / 2) + 'px';

    document.body.appendChild(corazon);

    // Eliminar el corazón después de que termine su animación
    // La animación 'desvanecer-corazon' dura 1 segundo (1000 milisegundos) en el CSS.
    setTimeout(() => {
        corazon.remove();
    }, 1000); 
});
