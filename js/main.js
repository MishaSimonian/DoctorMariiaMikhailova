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

  window.addEventListener("popstate", () => {});

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
    }
  });
});
