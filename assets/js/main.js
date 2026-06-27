document.addEventListener("DOMContentLoaded", () => {
    initTheme();

    Promise.all([
        loadComponent("header-placeholder", "/components/header.html"),
        loadComponent("footer-placeholder", "/components/footer.html")
    ]).then(() => {
        setupNavbarActiveLink();
        setupThemeToggle();
    });
});

function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-bs-theme", savedTheme);
}

function loadComponent(placeholderId, filePath) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return Promise.resolve();

    return fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`無法載入組件: ${filePath}`);
            return response.text();
        })
        .then(data => {
            placeholder.innerHTML = data;
        })
        .catch(error => {
            console.error("載入組件錯誤:", error);
        });
}

function setupNavbarActiveLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
        }
    });
}

function setupThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    updateToggleIcon();

    toggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute("data-bs-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-bs-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateToggleIcon();

        const highlightTheme = document.getElementById('highlight-theme');
        if (highlightTheme) {
            if (newTheme === 'dark') {
                highlightTheme.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
            } else {
                highlightTheme.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
            }
        }
    });
}

function updateToggleIcon() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    const currentTheme = document.documentElement.getAttribute("data-bs-theme");
    const icon = toggleBtn.querySelector("i");
    
    if (icon) {
        if (currentTheme === "dark") {
            icon.className = "bi bi-sun-fill";
        } else {
            icon.className = "bi bi-moon-fill";
        }
    }
}