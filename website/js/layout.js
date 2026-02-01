// =====================
// THEME (apply immediately)
// =====================
(function () {
    const savedTheme = localStorage.getItem("theme");
    const theme = savedTheme || "dark"; // default theme
    document.documentElement.setAttribute("data-theme", theme);
})();

// =====================
// FUNCTIONS
// =====================
function loadPartial(id, url, callback) {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            const container = document.getElementById(id);
            if (!container) return;
            container.innerHTML = html;
            if (callback) callback();
        })
        .catch(err => console.error(`Failed to load ${id}:`, err));
}

function setupNavbar() {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const themeToggle = document.querySelector(".theme-toggle");

    // Navbar toggle for mobile
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

    // Highlight current page
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // Theme toggle button
    if (themeToggle) {
        updateThemeIcon();
        themeToggle.addEventListener("click", () => {
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";
            const newTheme = isDark ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeIcon();
        });
    }
}

function updateThemeIcon() {
    const btn = document.querySelector(".theme-toggle");
    if (!btn) return;

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.textContent = isDark ? "☀️" : "🌙";
}

// =====================
// INITIALIZATION AFTER DOM READY
// =====================
document.addEventListener("DOMContentLoaded", () => {
    // Load navbar and footer partials for all pages
    loadPartial("navbar", "/website/partials/navbar.html", setupNavbar); // setupNavbar runs after navbar is loaded
    loadPartial("footer", "/website/partials/footer.html");

    // If you have more partials, add them here:
    // loadPartial("sidebar", "/partials/sidebar.html");
});
