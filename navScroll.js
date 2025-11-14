let lastScroll = 0;
const header = document.querySelector("header");
const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

// Toggle menu open/close
burger.addEventListener("click", () => {
    menu.classList.toggle("open");
    burger.classList.toggle("active"); // optional: for animation
});

// Close menu when a menu link is clicked
menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("open");
        burger.classList.remove("active");
    });
});

// Hide header on scroll down, show on scroll up
window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Only hide if menu is NOT open
    if (!menu.classList.contains("open")) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            // scrolling down
            header.style.transform = "translateY(-100%)";
        } else {
            // scrolling up
            header.style.transform = "translateY(0)";
        }
        header.style.transition = "transform 0.3s ease";
    }

    lastScroll = currentScroll;
});
