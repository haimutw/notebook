document.addEventListener("DOMContentLoaded", () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            once: true,
            offset: 60,
            delay: 50
        });
    }
});