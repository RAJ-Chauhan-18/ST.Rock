/* =========================================================
   ST. ROCKS COLLEGE
   INTERACTIONS
========================================================= */


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("open");

});


document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav > a");

const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink =
                    document.querySelector(
                        `.nav a[href="#${entry.target.id}"]`
                    );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            }

        });

    },
    {
        threshold: 0.25
    }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   COURSE FILTER
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter");

const courseCards =
    document.querySelectorAll(".course-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        courseCards.forEach(card => {

            const category = card.dataset.category;

            if (
                filter === "all" ||
                category === filter
            ) {

                card.style.display = "block";

                requestAnimationFrame(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                });

            } else {

                card.style.opacity = "0";
                card.style.transform = "translateY(10px)";

                setTimeout(() => {
                    card.style.display = "none";
                }, 250);

            }

        });

    });

});


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters =
    document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target =
                Number(counter.dataset.count);

            let current = 0;

            const duration = 1400;

            const startTime = performance.now();

            function updateCounter(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(elapsed / duration, 1);

                const eased =
                    1 - Math.pow(1 - progress, 3);

                current =
                    Math.floor(target * eased);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }

            }

            requestAnimationFrame(updateCounter);

            counterObserver.unobserve(counter);

        });

    },
    {
        threshold: 0.5
    }
);

counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    const answer =
        item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        const isOpen =
            item.classList.contains("open");


        faqItems.forEach(otherItem => {

            otherItem.classList.remove("open");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            otherAnswer.style.maxHeight = null;

        });


        if (!isOpen) {

            item.classList.add("open");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* =========================================================
   ADMISSION MODAL
========================================================= */

const admissionModal =
    document.getElementById("admissionModal");

const admissionForm =
    document.getElementById("admissionForm");

const successMessage =
    document.getElementById("successMessage");


function openAdmission() {

    admissionModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeAdmission() {

    admissionModal.classList.remove("active");

    document.body.style.overflow = "";

}


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeAdmission();
    }

});


/* =========================================================
   FORM
========================================================= */

admissionForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const program =
        document.getElementById("program").value;


    if (!name || !phone || !email || !program) {

        alert("Please complete all fields.");

        return;

    }


    /*
        FRONT-END DEMO

        Connect this form to your actual
        backend / email / CRM / admission
        enquiry endpoint before going live.
    */


    admissionForm.style.display = "none";

    successMessage.classList.add("active");

});


/* =========================================================
   BACK TO TOP
========================================================= */

