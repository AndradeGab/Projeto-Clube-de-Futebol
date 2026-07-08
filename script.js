document.addEventListener("DOMContentLoaded", () => {

    initLightbox();
    initSponsorsHover();
    initNewsSlider();
    initHamburger();
    initScrollSpy();
    initGallery();
    initHistory();
    initAnthem();
    initMembership();

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

function initHistory() {

    const button = document.getElementById("historyButton");
    const content = document.getElementById("historyContent");

    if (!button || !content) return;


    button.addEventListener("click", e => {

        e.preventDefault();

        content.classList.toggle("active");


        if (content.classList.contains("active")) {

            button.textContent = "Fechar história";

        } else {

            button.textContent = "História completa";

        }

    });

}

function initAnthem() {

    const button = document.getElementById("anthemButton");
    const player = document.getElementById("anthemPlayer");
    const audio = document.getElementById("anthemAudio");
    const playPause = document.getElementById("playPause");
    const volume = document.getElementById("volume");


    if (!button || !audio) return;


    button.addEventListener("click", () => {

        player.classList.toggle("active");

    });


    playPause.addEventListener("click", () => {

        if (audio.paused) {

            audio.play();
            playPause.innerHTML = '<i class="bi bi-pause-fill"></i>';

        } else {

            audio.pause();
            playPause.innerHTML = '<i class="bi bi-play-fill"></i>';

        }

    });


    volume.addEventListener("input", () => {

        audio.volume = volume.value;

    });

}

/* ==========================================================
   ASSINATURA SÓCIO TORCEDOR - LEÃO CAVC
========================================================== */

function initMembership() {


    const buttons = document.querySelectorAll(".fake-plan");

    const animation = document.getElementById("membershipAnimation");

    const loader = document.querySelector(".membership-loader");

    const progress = document.getElementById("membershipProgress");

    const flash = document.getElementById("lionFlash");

    const lion = document.getElementById("membershipLion");

    const welcome = document.getElementById("welcomeText");

    const card = document.getElementById("memberCard");

    const cardPlan = document.getElementById("cardPlan");

    const success = document.getElementById("membershipSuccess");

    const close = document.getElementById("closeMembership");



    if (!buttons.length || !animation) return;



    let selectedPlan = "";



    /*
        sons
    */

    const roar = new Audio("audio/leão.mp3");

    roar.volume = .65;




    buttons.forEach(button => {


        button.addEventListener("click", () => {


            selectedPlan = button.dataset.plan;


            startMembership();


        });


    });




    function startMembership() {



        resetAnimation();



        animation.style.setProperty(
            "--plan-color",
            getPlanColor(selectedPlan)
        );



        animation.classList.add("active");



        let value = 0;



        const interval = setInterval(() => {


            value++;


            progress.style.width = value + "%";



            if (value >= 100) {


                clearInterval(interval);


                finishLoading();


            }


        }, 35);



    }




    function finishLoading() {


        loader.style.opacity = "0";



        setTimeout(() => {


            loader.style.display = "none";


            // rugido

            roar.currentTime = 0;
            roar.play().catch(() => { });

            animation.classList.add("impact");

            setTimeout(() => {

                animation.classList.remove("impact");

            }, 300);

            // brilho

            flash.classList.add("active");



            // aparece o leão

            setTimeout(() => {


                applyPlanClass();

                lion.classList.add("show");
                console.log("leão apareceu", lion);


            }, 500);




            // começa o recuo

            setTimeout(() => {


                lion.style.transform =
                    "scale(.45) translateY(-120px)";



            }, 3500);




            // texto

            setTimeout(() => {


                showWelcome();


            }, 4500);



        }, 700);


    }




    function showWelcome() {



        welcome.innerHTML =
            "BEM-VINDO À FAMÍLIA<br>" +
            selectedPlan.toUpperCase();



        welcome.classList.add("show");



        setTimeout(() => {

            showCard();

        }, 2200);



    }




    function showCard() {



        cardPlan.innerHTML =
            selectedPlan.toUpperCase();



        card.classList.add("show");



        setTimeout(() => {


            finishScreen();



        }, 2500);



    }




    function finishScreen() {


        card.classList.remove("show");

        welcome.classList.remove("show");

        lion.classList.remove("show");


        setTimeout(() => {

            success.style.display = "block";

        }, 800);


    }





    close.addEventListener("click", () => {

        animation.classList.remove("active");

        resetAnimation();

    });






    function resetAnimation() {


        progress.style.width = "0%";


        loader.style.display = "block";

        loader.style.opacity = "1";


        flash.classList.remove("active");


        lion.className = "";

        lion.style.transform = "";


        welcome.className = "";

        welcome.innerHTML = "";


        card.className = "";

        card.style.opacity = "1";


        success.style.display = "none";


    }




    function applyPlanClass() {

        lion.classList.remove(
            "bronze",
            "prata",
            "ouro"
        );


        if (selectedPlan.includes("Bronze")) {

            lion.classList.add("bronze");

        }


        if (selectedPlan.includes("Prata")) {

            lion.classList.add("prata");

        }


        if (selectedPlan.includes("Ouro")) {

            lion.classList.add("ouro");

        }

    }





    function getPlanColor(plan) {


        if (plan.includes("Bronze")) {

            return "#2E8B57";

        }


        if (plan.includes("Prata")) {

            return "#FFFFFF";

        }


        if (plan.includes("Ouro")) {

            return "#C9A227";

        }


        return "#C9A227";


    }



}