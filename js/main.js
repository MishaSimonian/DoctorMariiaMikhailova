document.addEventListener("DOMContentLoaded", () => {
  const logoPath = document.querySelector("svg path");

  const restartAnimation = (element, animationName) => {
    element.style.animation = "none";
    void element.offsetWidth; // Trigger reflow to restart animation
    element.style.animation = animationName;
  };

  if (logoPath) {
    restartAnimation(
      logoPath,
      "stroke-dasharray-animation 3s ease-out forwards"
    );
  }

  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const href = link.getAttribute("href");
      setTimeout(() => {
        window.location.href = href;
      }, 1000); // Delay matches animation duration
    });
  });

  window.addEventListener("popstate", () => {});

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
    }
  });
});
