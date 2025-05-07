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

// Swipe support for mobile
let startX = null;
imgEl.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
imgEl.addEventListener("touchend", (e) => {
  if (startX === null) return;
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 40) leftBtn.click();
  if (startX - endX > 40) rightBtn.click();
  startX = null;
});

updateGallery();
