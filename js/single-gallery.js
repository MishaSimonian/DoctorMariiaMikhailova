document.addEventListener("DOMContentLoaded", () => {
  const imgEl = document.getElementById("single-gallery-img");
  const leftBtn = document.querySelector(".gallery-arrow-left");
  const rightBtn = document.querySelector(".gallery-arrow-right");
  const indicator = document.getElementById("single-gallery-indicator");

  // Check if all required elements exist
  if (!imgEl || !leftBtn || !rightBtn || !indicator) {
    console.warn("Not all gallery elements found!");
    return;
  }

  const galleryImages = [
    "img/MyCollages.jpg",
    "img/MyCollages (2).jpg",
    "img/Blank 2 Grids Collage (1).png",
    "img/photo_2025-05-06_15-59-11.jpg",
    "img/photo_2025-05-06_15-59-31.jpg",
  ];

  let currentIndex = 0;
  let startX = null;
  let currentTranslate = 0;
  let dragging = false;
  let swipeHandled = false;

  /**
   * Updates the gallery image, alt text, indicator, and arrow button states.
   * Adds fade-in effect after image change.
   */
  function updateGallery() {
    if (currentIndex >= 0 && currentIndex < galleryImages.length) {
      imgEl.style.opacity = "0";
      // Remove previous onload to avoid stacking handlers
      imgEl.onload = null;
      imgEl.src = galleryImages[currentIndex];
      imgEl.alt = `Work example ${currentIndex + 1}`;
      indicator.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
      leftBtn.disabled = currentIndex === 0;
      rightBtn.disabled = currentIndex === galleryImages.length - 1;
      // Fade in after image loads
      imgEl.onload = () => {
        imgEl.style.transition = "opacity 0.4s ease";
        imgEl.style.opacity = "1";
      };
    }
  }

  /**
   * Sets the horizontal translation of the image element.
   * @param {number} x - Translation value in pixels.
   */
  function setTranslate(x) {
    imgEl.style.transform = `translateX(${x}px)`;
  }

  /**
   * Resets the image translation to center with an optional transition.
   * @param {boolean} withTransition - Enable transition animation.
   */
  function resetTranslate(withTransition = true) {
    imgEl.style.transition = withTransition ? "transform 0.3s ease" : "none";
    setTranslate(0);
    if (withTransition) {
      setTimeout(() => {
        imgEl.style.transition = "";
      }, 300);
    }
  }

  // Event handler for swipe and drag navigation
  function handleSwipe(e) {
    if (!imgEl || swipeHandled) return;

    if (e.type === "pointerdown" || e.type === "touchstart") {
      dragging = true;
      startX = (e.touches ? e.touches[0] : e).clientX;
      currentTranslate = 0;
      swipeHandled = false;
      imgEl.style.transition = "none";
      if (e.type === "pointerdown" && imgEl.setPointerCapture) {
        imgEl.setPointerCapture(e.pointerId);
      }
    } else if (
      dragging &&
      (e.type === "pointermove" || e.type === "touchmove")
    ) {
      const moveX = (e.touches ? e.touches[0] : e).clientX;
      currentTranslate = moveX - startX;
      setTranslate(currentTranslate);
      if (e.cancelable) e.preventDefault(); // Prevent scrolling during swipe
    } else if (dragging && (e.type === "pointerup" || e.type === "touchend")) {
      dragging = false;
      swipeHandled = true;
      if (e.type === "pointerup" && imgEl.releasePointerCapture) {
        imgEl.releasePointerCapture(e.pointerId);
      }
      imgEl.style.transition = "transform 0.3s ease";

      if (currentTranslate > 60 && currentIndex > 0) {
        imgEl.style.transform = "translateX(100vw)";
        setTimeout(() => {
          currentIndex--;
          updateGallery();
          resetTranslate(false);
          swipeHandled = false;
        }, 300);
      } else if (
        currentTranslate < -60 &&
        currentIndex < galleryImages.length - 1
      ) {
        imgEl.style.transform = "translateX(-100vw)";
        setTimeout(() => {
          currentIndex++;
          updateGallery();
          resetTranslate(false);
          swipeHandled = false;
        }, 300);
      } else {
        resetTranslate();
        swipeHandled = false;
      }
      startX = null;
      currentTranslate = 0;
    } else if (e.type === "pointercancel" || e.type === "touchcancel") {
      dragging = false;
      resetTranslate();
      swipeHandled = false;
    }
  }

  // Attach event listeners
  ["pointerdown", "pointermove", "pointerup", "pointercancel"].forEach(
    (event) => {
      imgEl.addEventListener(event, handleSwipe);
    }
  );
  ["touchstart", "touchmove", "touchend", "touchcancel"].forEach((event) => {
    imgEl.addEventListener(event, handleSwipe, { passive: false });
  });

  // Navigation button event listeners
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

  // Initialize gallery
  updateGallery();
});
