(function () {
    const savedTheme = localStorage.getItem("theme");
    const theme = savedTheme || "dark"; 
    document.documentElement.setAttribute("data-theme", theme);
})();


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


document.addEventListener("DOMContentLoaded", () => {
    loadPartial("navbar", "/partials/navbar.html", setupNavbar);

    loadPartial("footer", "/partials/footer.html");

    // loadPartial("sidebar", "/partials/sidebar.html");
});
