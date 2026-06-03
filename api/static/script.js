/* ===== Mobile Menu Toggle ===== */
const menuMobile = document.querySelector(".menu-mobile");
const menuIcon = menuMobile.querySelector("i");
const body = document.body;

menuMobile.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-nav-active");
    menuIcon.className = isOpen ? "bi bi-x" : "bi bi-list";
});

/* Close menu when clicking a nav item */
document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
        if (body.classList.contains("menu-nav-active")) {
            body.classList.remove("menu-nav-active");
            menuIcon.className = "bi bi-list";
        }
    });
});

/* ===== Scroll Animations ===== */
const animatedElements = document.querySelectorAll("[data-anime]");

const observerOptions = {
    root: null,
    rootMargin: "0px 0px -15% 0px",
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
        }
    });
}, observerOptions);

animatedElements.forEach((el) => observer.observe(el));

/* ===== Active Nav Link on Scroll ===== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

const highlightNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
};

window.addEventListener("scroll", highlightNav);

/* ===== Form Submit Loader ===== */
const btnEnviar = document.querySelector("#btn-enviar");
const btnEnviarLoader = document.querySelector("#btn-enviar-loader");

if (btnEnviar) {
    btnEnviar.addEventListener("click", () => {
        btnEnviarLoader.style.display = "inline-flex";
        btnEnviar.style.display = "none";
    });
}

/* ===== Flash Message Auto-dismiss ===== */
const alerta = document.querySelector("#alerta");
if (alerta) {
    setTimeout(() => {
        alerta.style.opacity = "0";
        alerta.style.transform = "translateY(-10px)";
        setTimeout(() => alerta.remove(), 300);
    }, 5000);
}
