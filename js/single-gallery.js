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

// Swipe support for mobile and touch devices
let startX = null;
let isPointerDown = false;
let pointerStartX = null;

let currentTranslate = 0;
let dragging = false;
let animationFrameId = null;

function setTranslate(x) {
  imgEl.style.transform = `translateX(${x}px)`;
}

function resetTranslate(withTransition = true) {
  if (withTransition) {
    imgEl.style.transition = "transform 0.3s";
  } else {
    imgEl.style.transition = "none";
  }
  imgEl.style.transform = "translateX(0)";
  setTimeout(() => {
    imgEl.style.transition = "";
  }, 300);
}

// Touch events (mobile)
imgEl.addEventListener("touchstart", (e) => {
  if (e.touches.length !== 1) return;
  dragging = true;
  startX = e.touches[0].clientX;
  currentTranslate = 0;
  imgEl.style.transition = "none";
});

imgEl.addEventListener(
  "touchmove",
  (e) => {
    if (!dragging || startX === null) return;
    const moveX = e.touches[0].clientX;
    currentTranslate = moveX - startX;
    setTranslate(currentTranslate);
    e.preventDefault();
  },
  { passive: false }
);

imgEl.addEventListener("touchend", (e) => {
  if (!dragging || startX === null) return;
  dragging = false;
  imgEl.style.transition = "transform 0.3s";
  if (currentTranslate > 60 && currentIndex > 0) {
    imgEl.style.transform = "translateX(100vw)";
    setTimeout(() => {
      currentIndex--;
      updateGallery();
      imgEl.style.transform = "translateX(-100vw)";
      setTimeout(() => {
        imgEl.style.transition = "transform 0.3s";
        imgEl.style.transform = "translateX(0)";
      }, 20);
    }, 300);
  } else if (
    currentTranslate < -60 &&
    currentIndex < galleryImages.length - 1
  ) {
    imgEl.style.transform = "translateX(-100vw)";
    setTimeout(() => {
      currentIndex++;
      updateGallery();
      imgEl.style.transform = "translateX(100vw)";
      setTimeout(() => {
        imgEl.style.transition = "transform 0.3s";
        imgEl.style.transform = "translateX(0)";
      }, 20);
    }, 300);
  } else {
    resetTranslate();
  }
  startX = null;
  currentTranslate = 0;
});

// Pointer events (for touchscreens and hybrid devices)
imgEl.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "touch") return;
  dragging = true;
  startX = e.clientX;
  currentTranslate = 0;
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
  imgEl.style.transition = "transform 0.3s";
  if (currentTranslate > 60 && currentIndex > 0) {
    imgEl.style.transform = "translateX(100vw)";
    setTimeout(() => {
      currentIndex--;
      updateGallery();
      imgEl.style.transform = "translateX(-100vw)";
      setTimeout(() => {
        imgEl.style.transition = "transform 0.3s";
        imgEl.style.transform = "translateX(0)";
      }, 20);
    }, 300);
  } else if (
    currentTranslate < -60 &&
    currentIndex < galleryImages.length - 1
  ) {
    imgEl.style.transform = "translateX(-100vw)";
    setTimeout(() => {
      currentIndex++;
      updateGallery();
      imgEl.style.transform = "translateX(100vw)";
      setTimeout(() => {
        imgEl.style.transition = "transform 0.3s";
        imgEl.style.transform = "translateX(0)";
      }, 20);
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

updateGallery();
