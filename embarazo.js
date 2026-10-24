
const heartButton = document.getElementById("heartButton");
const surprise = document.getElementById("surprise");
const intro = document.getElementById("intro");

function revealSurprise() {
  surprise.classList.remove("hidden");
  intro.classList.add("hidden");
  heartButton.textContent = "♥";
  heartButton.setAttribute("aria-label", "Sorpresa descubierta");
  heartButton.removeEventListener("click", revealSurprise);
}

heartButton.addEventListener("click", revealSurprise);
heartButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    revealSurprise();
  }
});

// Mensajes de los objetos sorpresa
const toyMessage = document.getElementById("toyMessage");

document.querySelectorAll(".toy").forEach((toy) => {
  toy.addEventListener("click", () => {
    toyMessage.textContent = toy.dataset.message;
    toyMessage.animate(
      [
        { opacity: 0.3, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 350, easing: "ease-out" }
    );
  });
});

// Cartas para Lía Victoria
const letters = {
  mom: {
    title: "De mamá, Julieth 💗",
    text: `Mi pequeña Lía Victoria:

Desde que supe que venías en camino, mi corazón empezó a imaginar un amor que todavía no sabía cómo explicar. Sueño con tenerte entre mis brazos, cuidarte cuando tengas miedo y celebrar cada pequeño logro tuyo.

No puedo prometerte que todos los días serán perfectos, pero sí quiero esforzarme por darte amor, paciencia y un lugar donde siempre puedas sentirte segura.

Te espero con todo mi corazón, mi princesa.

Con amor infinito,
Mamá.`
  },
  dad: {
    title: "De papá, Deivy 💙",
    text: `Mi pequeña Lía Victoria:

Todavía no te tengo en mis brazos y ya tengo tantos sueños contigo. Imagino el día en que pueda mirarte, sostener tu manita y decirte que aquí está papá.

Quiero acompañarte mientras creces, enseñarte lo que pueda y aprender de ti también. Tal vez cometa errores, porque seré un papá que también está aprendiendo, pero nunca dejaré de esforzarme por cuidarte y demostrarte cuánto te amo.

Tu llegada está cambiando nuestra historia para siempre.

Con todo mi amor,
Papá.`
  },
  future: {
    title: "Para cuando seas grande ✨",
    text: `Querida Lía:

Si algún día lees estas palabras, quiero que sepas algo: fuiste amada incluso antes de que pudiéramos conocerte.

Tu llegada representa un nuevo comienzo para nosotros. Deseamos que crezcas sabiendo que tu valor no depende de ser perfecta, de complacer a todos ni de cumplir los sueños de otras personas.

Que tengas valentía para descubrir el mundo, humildad para aprender y siempre un hogar al cual regresar.

Con amor, desde antes de tu primer abrazo,
Mamá y papá.`
  }
};

const letterCard = document.getElementById("letter");

document.querySelectorAll("[data-letter]").forEach((button) => {
  button.addEventListener("click", () => {
    const letter = letters[button.dataset.letter];
    if (!letter) return;

    letterCard.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = letter.title;

    const paragraph = document.createElement("p");
    paragraph.textContent = letter.text;

    letterCard.append(heading, paragraph);
    letterCard.animate(
      [
        { opacity: 0.4, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 350 }
    );
  });
});

// Cuenta regresiva para la fecha estimada: 15 de enero de 2027
const dueDate = new Date("2027-01-15T12:00:00");

function updateCountdown() {
  let difference = dueDate.getTime() - Date.now();

  if (difference <= 0) {
    document.getElementById("days").textContent = "♡";
    document.getElementById("hours").textContent = "♡";
    document.getElementById("minutes").textContent = "♡";
    document.getElementById("seconds").textContent = "♡";
    document.querySelector(".countdown-note").textContent =
      "Hoy puede ser un día muy especial. La fecha es estimada; ¡les deseamos mucho amor!";
    return;
  }

  const days = Math.floor(difference / 86400000);
  difference %= 86400000;

  const hours = Math.floor(difference / 3600000);
  difference %= 3600000;

  const minutes = Math.floor(difference / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Animaciones al desplazarse por la página
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Música opcional. Para activarla, añade un archivo musica.mp3
// en la misma carpeta y quita el comentario de la siguiente línea.
const lullaby = document.getElementById("lullaby");
// lullaby.src = "musica.mp3";

const musicButton = document.getElementById("musicButton");

musicButton.addEventListener("click", async () => {
  if (!lullaby.src) {
    musicButton.textContent = "♫ Añade musica.mp3 para escuchar";
    return;
  }

  if (lullaby.paused) {
    try {
      await lullaby.play();
      musicButton.textContent = "♫ Música: pausar";
      musicButton.setAttribute("aria-pressed", "true");
    } catch {
      musicButton.textContent = "♫ Toca para intentar reproducir";
    }
  } else {
    lullaby.pause();
    musicButton.textContent = "♫ Música: activar";
    musicButton.setAttribute("aria-pressed", "false");
  }
});
