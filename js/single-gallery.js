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

// Touch events (mobile)
imgEl.addEventListener(
  "touchstart",
  (e) => {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX;
    }
  },
  { passive: true }
);

imgEl.addEventListener(
  "touchmove",
  (e) => {
    // Prevent scrolling when swiping horizontally
    if (startX !== null) {
      const moveX = e.touches[0].clientX;
      if (Math.abs(moveX - startX) > 10) {
        e.preventDefault();
      }
    }
  },
  { passive: false }
);

imgEl.addEventListener("touchend", (e) => {
  if (startX === null) return;
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 40) leftBtn.click();
  if (startX - endX > 40) rightBtn.click();
  startX = null;
});

// Pointer events (for touchscreens and hybrid devices)
imgEl.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "touch") {
    isPointerDown = true;
    pointerStartX = e.clientX;
  }
});

imgEl.addEventListener("pointerup", (e) => {
  if (isPointerDown && pointerStartX !== null) {
    const pointerEndX = e.clientX;
    if (pointerEndX - pointerStartX > 40) leftBtn.click();
    if (pointerStartX - pointerEndX > 40) rightBtn.click();
  }
  isPointerDown = false;
  pointerStartX = null;
});

updateGallery();
