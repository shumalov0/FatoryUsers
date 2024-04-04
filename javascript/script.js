document.addEventListener("DOMContentLoaded", function () {
  const menuBar = document.getElementById("menuBar");
  const responsiveMenu = document.getElementById("responsiveMenu");
  const shareButton = document.querySelector(".shareButton");
  const sharePopup = document.querySelector(".popups");
  const closeButtonShare = sharePopup.querySelector(".closeButtons");
  const copyButton = document.querySelector(".copyButton");
  const urlInput = document.querySelector(".urlInput");
  const mediaPopup = document.querySelector(".popup");
  const closeButtonMedia = mediaPopup.querySelector(".closeButton");
  const popupContent = mediaPopup.querySelector(".popup-content");
  const mediaBoxes = document.querySelectorAll(".imgBox, .videoBox");
  const scrollBottom = document.querySelector(".scrollBottom"); 
  const secondSection = document.getElementById("1");

  let touchStartX = 0;
  let touchEndX = 0;

  let currentIndex = 0;
  let isSwipeActive = false; 

  const prevButton = document.createElement("button");
  const nextButton = document.createElement("button");

  function handleSwipeGesture() {
    if (!isSwipeActive) return; 

    if (touchStartX - touchEndX > 50) {
      showNext();
    } else if (touchStartX - touchEndX < -50) {
      showPrev();
    }
  }

  prevButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
  nextButton.innerHTML = '<i class="fas fa-arrow-right"></i>';

  prevButton.classList.add("prevButton", "buttonStyle");
  nextButton.classList.add("nextButton", "buttonStyle");

  mediaPopup.appendChild(prevButton);
  mediaPopup.appendChild(nextButton);

  responsiveMenu.style.top = "23px";

  function toggleMenu() {
    const isOpen = responsiveMenu.style.top === "78px";

    if (isOpen) {
      // Menüyü kapat
      responsiveMenu.style.top = "23px";
      setTimeout(() => {
        responsiveMenu.style.visibility = "hidden";
      }, 320);
    } else {
      responsiveMenu.style.visibility = "visible";
      responsiveMenu.style.top = "78px";
    }
    menuBar.classList.toggle("active");
  }

  menuBar.addEventListener("click", toggleMenu);

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      showPrev();
    } else if (event.key === "ArrowRight") {
      showNext();
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !menuBar.contains(event.target) &&
      !responsiveMenu.contains(event.target) &&
      menuBar.classList.contains("active")
    ) {
      toggleMenu();
    }
  });

  shareButton.addEventListener("click", function () {
    sharePopup.style.display = "flex";
    urlInput.value = window.location.href;
  });

  closeButtonShare.addEventListener("click", function () {
    sharePopup.style.display = "none";
  });

  copyButton.addEventListener("click", function () {
    urlInput.select();
    document.execCommand("copy");
  });

  closeButtonMedia.addEventListener("click", function () {
    mediaPopup.style.display = "none";
  });

  mediaBoxes.forEach((box, index) => {
    box.addEventListener("click", function () {
      currentIndex = index;
      isSwipeActive = true; 
      const isVideo = this.classList.contains("videoBox");
      const source = isVideo
        ? this.querySelector("video source").src
        : this.querySelector("img").src;
      const contentHtml = isVideo
        ? `<video class="rounded-[16px]" controls><source src="${source}" type="video/mp4"></video>`
        : `<img src="${source}" alt="Media">`;
      popupContent.innerHTML = contentHtml;
      mediaPopup.style.display = "flex";
    });
  });

  // closeButtonMedia.addEventListener("click", function () {
  //   isSwipeActive = false; // Medya popup'ı kapandığında kaydırma işlevselliğini devre dışı bırak
  //   mediaPopup.style.display = "none";
  // });

  window.addEventListener("click", function (event) {
    if (event.target === mediaPopup) {
      mediaPopup.style.display = "none";
      isSwipeActive = false; 
    } else if (
      event.target === sharePopup ||
      event.target.classList.contains("dark-background")
    ) {
      sharePopup.style.display = "none";
    }
  });
  
  closeButtonMedia.addEventListener("click", function (event) {
    event.stopPropagation();
    mediaPopup.style.display = "none";
    isSwipeActive = false; 
  });
  

  document.addEventListener("touchstart", function (e) {
    if (isSwipeActive) touchStartX = e.touches[0].clientX;
  }, false);

  document.addEventListener("touchend", function (e) {
    if (isSwipeActive) {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipeGesture();
    }
  }, false);

  function showPrev() {
    currentIndex = (currentIndex - 1 + mediaBoxes.length) % mediaBoxes.length;
    mediaBoxes[currentIndex].click();
  }

  scrollBottom.addEventListener('click', function () {
    secondSection.scrollIntoView({ behavior: 'smooth' });
  });

  function showNext() {
    currentIndex = (currentIndex + 1) % mediaBoxes.length;
    mediaBoxes[currentIndex].click();
  }

  prevButton.addEventListener("click", showPrev);
  nextButton.addEventListener("click", showNext);

  window.addEventListener("click", function (event) {
    if (event.target === mediaPopup) {
      mediaPopup.style.display = "none";
    } else if (
      event.target === sharePopup ||
      event.target.classList.contains("dark-background")
    ) {
  
      sharePopup.style.display = "none";
    }
  });

  closeButtonMedia.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});
