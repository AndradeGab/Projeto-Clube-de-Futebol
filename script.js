document.addEventListener("DOMContentLoaded", () => {

    initLightbox();
    initSponsorsHover();
    initNewsSlider();

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
        if (e.target === lightbox) closeLightbox();
    });
}

/* ==========================================================
   SPONSORS HOVER (sem inline style)
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
   NEWS SLIDER
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

    updateSlider();
}

const sections = document.querySelectorAll("section");
const menuLinks = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    menuLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const menu = document.querySelector(".menu");

    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        hamburger.classList.toggle("active");
        menu.classList.toggle("active");
    });

    menu.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    document.addEventListener("click", () => {
        hamburger.classList.remove("active");
        menu.classList.remove("active");
    });
});

let startX = 0;
let endX = 0;

track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;

    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0 && currentPage < totalPages - 1) {
            currentPage++;
        } else if (diff < 0 && currentPage > 0) {
            currentPage--;
        }
        updateSlider();
    }
});