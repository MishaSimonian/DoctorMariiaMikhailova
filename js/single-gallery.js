const galleryImages = [
  "img/MyCollages.jpg",
  "img/MyCollages (2).jpg",
  "img/Blank 2 Grids Collage (1).png",
  "img/photo_2025-05-06_15-59-11.jpg",
  "img/photo_2025-05-06_15-59-31.jpg",
];

let currentIndex = 0;

const imgEl = document.getElementById("single-gallery-img");
const leftBtn = document.querySelector(".gallery-arrow-left");
const rightBtn = document.querySelector(".gallery-arrow-right");
const indicator = document.getElementById("single-gallery-indicator");

/**
 * Update gallery image, alt text, indicator, and arrow button states.
 */
function updateGallery() {
  imgEl.src = galleryImages[currentIndex];
  imgEl.alt = `Work example ${currentIndex + 1}`;
  indicator.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
  leftBtn.disabled = currentIndex === 0;
  rightBtn.disabled = currentIndex === galleryImages.length - 1;
}

leftBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateGallery();
  }
});

rightBtn.addEventListener("click", () => {
  if (currentIndex < galleryImages.length - 1) {
    currentIndex++;
    updateGallery();
  }
});

let startX = null;
let currentTranslate = 0;
let dragging = false;

/**
 * Set horizontal translation of the image element.
 */
function setTranslate(x) {
  imgEl.style.transform = `translateX(${x}px)`;
}

/**
 * Reset image translation to center with optional transition.
 */
function resetTranslate(withTransition = true) {
  imgEl.style.transition = withTransition ? "transform 0.3s" : "none";
  imgEl.style.transform = "translateX(0)";
  setTimeout(() => {
    imgEl.style.transition = "";
  }, 300);
}

/**
 * Fade in the image smoothly by animating opacity.
 */
function fadeInImage() {
  imgEl.style.opacity = "0";
  imgEl.style.transition = "opacity 0.4s";
  requestAnimationFrame(() => {
    imgEl.style.opacity = "1";
  });
}

// Pointer events for swipe/drag navigation on touch devices
imgEl.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "touch") return;
  dragging = true;
  startX = e.clientX;
  currentTranslate = 0;
  imgEl.setPointerCapture(e.pointerId);
  imgEl.style.transition = "none";
});

imgEl.addEventListener("pointermove", (e) => {
  if (!dragging || startX === null || e.pointerType !== "touch") return;
  currentTranslate = e.clientX - startX;
  setTranslate(currentTranslate);
});

imgEl.addEventListener("pointerup", (e) => {
  if (!dragging || startX === null || e.pointerType !== "touch") return;
  dragging = false;
  imgEl.releasePointerCapture(e.pointerId);
  imgEl.style.transition = "transform 0.3s";
  if (currentTranslate > 60 && currentIndex > 0) {
    imgEl.style.transform = "translateX(100vw)";
    setTimeout(() => {
      currentIndex--;
      updateGallery();
      imgEl.style.transition = "none";
      imgEl.style.transform = "translateX(0)";
      fadeInImage();
    }, 300);
  } else if (
    currentTranslate < -60 &&
    currentIndex < galleryImages.length - 1
  ) {
    imgEl.style.transform = "translateX(-100vw)";
    setTimeout(() => {
      currentIndex++;
      updateGallery();
      imgEl.style.transition = "none";
      imgEl.style.transform = "translateX(0)";
      fadeInImage();
    }, 300);
  } else {
    resetTranslate();
  }
  startX = null;
  currentTranslate = 0;
});

imgEl.addEventListener("pointercancel", () => {
  dragging = false;
  resetTranslate();
});

// Touch events fallback for mobile browsers that do not support pointer events
let touchStartX = null;
let touchDragging = false;
let touchCurrentTranslate = 0;

imgEl.addEventListener(
  "touchstart",
  (e) => {
    if (e.touches.length !== 1) return;
    touchDragging = true;
    touchStartX = e.touches[0].clientX;
    touchCurrentTranslate = 0;
    imgEl.style.transition = "none";
  },
  { passive: true }
);

imgEl.addEventListener(
  "touchmove",
  (e) => {
    if (!touchDragging || touchStartX === null) return;
    const moveX = e.touches[0].clientX;
    touchCurrentTranslate = moveX - touchStartX;
    setTranslate(touchCurrentTranslate);
    e.preventDefault();
  },
  { passive: false }
);

imgEl.addEventListener("touchend", (e) => {
  if (!touchDragging || touchStartX === null) return;
  touchDragging = false;
  imgEl.style.transition = "transform 0.3s";
  if (touchCurrentTranslate > 60 && currentIndex > 0) {
    imgEl.style.transform = "translateX(100vw)";
    setTimeout(() => {
      currentIndex--;
      updateGallery();
      imgEl.style.transition = "none";
      imgEl.style.transform = "translateX(0)";
      fadeInImage();
    }, 300);
  } else if (
    touchCurrentTranslate < -60 &&
    currentIndex < galleryImages.length - 1
  ) {
    imgEl.style.transform = "translateX(-100vw)";
    setTimeout(() => {
      currentIndex++;
      updateGallery();
      imgEl.style.transition = "none";
      imgEl.style.transform = "translateX(0)";
      fadeInImage();
    }, 300);
  } else {
    resetTranslate();
  }
  touchStartX = null;
  touchCurrentTranslate = 0;
});

updateGallery();
