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

function fadeInImage() {
  imgEl.style.opacity = "0";
  imgEl.style.transition = "opacity 0.4s";
  // Нужно дождаться применения opacity=0, затем плавно показать
  requestAnimationFrame(() => {
    imgEl.style.opacity = "1";
  });
}

// Используем только pointer события для свайпа
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
    // свайп вправо, новое фото появляется из центра (без смещения)
    imgEl.style.transform = "translateX(100vw)";
    setTimeout(() => {
      currentIndex--;
      updateGallery();
      imgEl.style.transition = "none";
      imgEl.style.transform = "translateX(0)"; // появляется из центра
      fadeInImage();
    }, 300);
  } else if (
    currentTranslate < -60 &&
    currentIndex < galleryImages.length - 1
  ) {
    // свайп влево, новое фото появляется из центра (без смещения)
    imgEl.style.transform = "translateX(-100vw)";
    setTimeout(() => {
      currentIndex++;
      updateGallery();
      imgEl.style.transition = "none";
      imgEl.style.transform = "translateX(0)"; // появляется из центра
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

updateGallery();
