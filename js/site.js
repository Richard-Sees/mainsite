(() => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav-links");

    if (toggle && nav) {
        const closeMenu = (returnFocus = false) => {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open navigation");
            if (returnFocus) toggle.focus();
        };

        toggle.addEventListener("click", () => {
            const open = !nav.classList.contains("open");
            nav.classList.toggle("open", open);
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        });
        nav.addEventListener("click", event => {
            if (event.target.closest("a")) closeMenu();
        });
        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && nav.classList.contains("open")) closeMenu(true);
        });
        document.addEventListener("click", event => {
            if (nav.classList.contains("open") && !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
        });
        document.documentElement.classList.add("nav-enhanced");
    }

    const targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
        targets.forEach(element => element.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    }, { threshold: 0.1 });
    targets.forEach(element => observer.observe(element));
})();
