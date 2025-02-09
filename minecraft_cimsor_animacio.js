window.addEventListener("scroll", function () {
    let title = document.querySelector(".minecraft_cimsor");
    title.style.opacity = window.scrollY > 50 ? "0" : "1";
    title.style.transition = "opacity 0.3s ease-in-out";
});
