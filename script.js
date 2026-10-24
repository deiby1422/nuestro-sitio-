/* =========================
   MUSICA
========================= */

const music = document.getElementById("music");


function toggleMusic() {

    if (!music) return;

    if (music.paused) {

        music.play();

    } else {

        music.pause();

    }

}


/* =========================
   HISTORIA
========================= */

function nextStory() {

    const sections =
        document.querySelectorAll(".story-section");

    if (sections.length < 2) return;

    sections[1].scrollIntoView({

        behavior: "smooth"

    });

}


/* =========================
   ANIMACIONES AL APARECER
========================= */

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },

    {

        threshold: .2

    }

);


document
    .querySelectorAll(".story-section")
    .forEach(section => {

        observer.observe(section);

    });


/* =========================
   TECLAS
========================= */

document.addEventListener("keydown", event => {

    const sections =
        [...document.querySelectorAll(".story-section")];

    if (!sections.length) return;

    const current =
        sections.findIndex(section => {

            const rect =
                section.getBoundingClientRect();

            return (
                rect.top >= -200 &&
                rect.top < window.innerHeight / 2
            );

        });


    if (event.key === "ArrowDown") {

        const next =
            sections[Math.min(current + 1, sections.length - 1)];

        next?.scrollIntoView({
            behavior: "smooth"
        });

    }


    if (event.key === "ArrowUp") {

        const previous =
            sections[Math.max(current - 1, 0)];

        previous?.scrollIntoView({
            behavior: "smooth"
        });

    }

});
