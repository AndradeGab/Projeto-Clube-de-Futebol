document.addEventListener("DOMContentLoaded", () => {

    initLightbox();
    initSponsorsHover();
    initNewsSlider();
    initHamburger();
    initScrollSpy();
    initGallery();
    initHistory();
    initAnthem();

});

/* ==========================================================
   LIGHTBOX
========================================================== */

function initLightbox() {

    const thumb = document.getElementById("arenaThumb");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("closeLightbox");

    if (!thumb || !lightbox || !lightboxImg || !closeBtn) return;

    function openLightbox() {

        lightbox.style.display = "flex";
        lightboxImg.src = thumb.src;

        requestAnimationFrame(() => {
            lightbox.classList.add("active");
        });

    }

    function closeLightbox() {

        lightbox.classList.remove("active");

        setTimeout(() => {
            lightbox.style.display = "none";
        }, 250);

    }

    thumb.addEventListener("click", openLightbox);

    closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            closeLightbox();

        }

    });

}

/* ==========================================================
   SPONSORS
========================================================== */

function initSponsorsHover() {

    const items = document.querySelectorAll(".sponsor-item");

    items.forEach(item => {

        item.addEventListener("mouseenter", () => {

            item.classList.add("hover");

        });

        item.addEventListener("mouseleave", () => {

            item.classList.remove("hover");

        });

    });

}

/* ==========================================================
   NEWS
========================================================== */

function initNewsSlider() {

    const track = document.querySelector(".news-track");
    const prevBtn = document.getElementById("prevNews");
    const nextBtn = document.getElementById("nextNews");
    const dots = document.querySelectorAll(".news-dot");
    const pages = document.querySelectorAll(".news-page");

    if (!track || !prevBtn || !nextBtn || pages.length === 0) return;

    let currentPage = 0;
    const totalPages = pages.length;

    function updateSlider() {

        if (window.innerWidth <= 900) return;

        track.style.transform = `translateX(-${currentPage * 100}%)`;

        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;

        prevBtn.style.opacity = currentPage === 0 ? ".4" : "1";
        nextBtn.style.opacity = currentPage === totalPages - 1 ? ".4" : "1";

        dots.forEach(dot => dot.classList.remove("active"));

        if (dots[currentPage]) {

            dots[currentPage].classList.add("active");

        }

    }

    nextBtn.addEventListener("click", () => {

        if (currentPage < totalPages - 1) {

            currentPage++;
            updateSlider();

        }

    });

    prevBtn.addEventListener("click", () => {

        if (currentPage > 0) {

            currentPage--;
            updateSlider();

        }

    });

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentPage = index;
            updateSlider();

        });

    });

    /* Swipe apenas desktop ignora */

    let startX = 0;

    track.addEventListener("touchstart", e => {

        startX = e.touches[0].clientX;

    });

    track.addEventListener("touchend", e => {

        if (window.innerWidth > 900) return;

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) < 50) return;

        track.scrollBy({

            left: diff > 0 ? 350 : -350,
            behavior: "smooth"

        });

    });

    updateSlider();

}

/* ==========================================================
   MENU MOBILE
========================================================== */

function initHamburger() {

    const hamburger = document.getElementById("hamburger");
    const menu = document.querySelector(".menu");

    if (!hamburger || !menu) return;

    hamburger.addEventListener("click", e => {

        e.stopPropagation();

        hamburger.classList.toggle("active");
        menu.classList.toggle("active");

    });

    menu.addEventListener("click", e => {

        e.stopPropagation();

    });

    document.addEventListener("click", () => {

        hamburger.classList.remove("active");
        menu.classList.remove("active");

    });

}

/* ==========================================================
   MENU ATIVO
========================================================== */

function initScrollSpy() {

    const sections = document.querySelectorAll("section");
    const menuLinks = document.querySelectorAll(".menu a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            if (window.scrollY >= top) {

                current = section.id;

            }

        });

        menuLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}

/* ==========================================================
   GALLERY ELENCO
========================================================== */

function initGallery() {

    const squadOpen = document.getElementById("squadOpen");
    const button = document.querySelector(".squad-content .btn");
    const gallery = document.getElementById("galleryModal");
    const image = document.getElementById("galleryImage");
    const buttons = document.querySelectorAll(".gallery-buttons button");
    const close = document.querySelector(".gallery-close");

    if (!gallery || !squadOpen) return;

    function openGallery(e) {

        if (e) e.preventDefault();

        gallery.classList.add("active");

    }

    squadOpen.addEventListener("click", openGallery);

    button?.addEventListener("click", openGallery);

    buttons.forEach(btn => {

        btn.addEventListener("click", () => {

            image.src = btn.dataset.image;

        });

    });

    close?.addEventListener("click", () => {

        gallery.classList.remove("active");

    });

    gallery.addEventListener("click", e => {

        if (e.target === gallery) {

            gallery.classList.remove("active");

        }

    });

}

function initHistory(){

    const button = document.getElementById("historyButton");
    const content = document.getElementById("historyContent");

    if(!button || !content) return;


    button.addEventListener("click", e => {

        e.preventDefault();

        content.classList.toggle("active");


        if(content.classList.contains("active")){

            button.textContent = "Fechar história";

        } else {

            button.textContent = "História completa";

        }

    });

}

function initAnthem(){

    const button = document.getElementById("anthemButton");
    const player = document.getElementById("anthemPlayer");
    const audio = document.getElementById("anthemAudio");
    const playPause = document.getElementById("playPause");
    const volume = document.getElementById("volume");


    if(!button || !audio) return;


    button.addEventListener("click",()=>{

        player.classList.toggle("active");

    });


    playPause.addEventListener("click",()=>{

        if(audio.paused){

            audio.play();
            playPause.innerHTML = '<i class="bi bi-pause-fill"></i>';

        } else {

            audio.pause();
            playPause.innerHTML = '<i class="bi bi-play-fill"></i>';

        }

    });


    volume.addEventListener("input",()=>{

        audio.volume = volume.value;

    });

}