document.addEventListener("DOMContentLoaded", () => {

    const thumb = document.getElementById("arenaThumb");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("closeLightbox");

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

});

document.querySelectorAll(".sponsor-item").forEach(el => {
    el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.05)";
    });

    el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
    });
});