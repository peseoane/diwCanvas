window.addEventListener('load', function() {
    const storedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', storedTheme);

    setTimeout(function() {
        const toggle = document.getElementById("themeButton");
        if(toggle) {
            toggle.onclick = function() {
                const currentTheme = document.documentElement.getAttribute("data-theme");
                let targetTheme = "light";

                if (currentTheme === "light") {
                    targetTheme = "dark";
                }

                document.documentElement.setAttribute('data-theme', targetTheme);
                localStorage.setItem('theme', targetTheme);
            };
        }
    }, 100); // Solución temporal... :(
});