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

  let currentIndex = 0; 


const prevButton = document.createElement("button");
const nextButton = document.createElement("button");


prevButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
nextButton.innerHTML = '<i class="fas fa-arrow-right"></i>';


prevButton.classList.add("prevButton", "buttonStyle");
nextButton.classList.add("nextButton", "buttonStyle");

mediaPopup.appendChild(prevButton);
mediaPopup.appendChild(nextButton);

  
  responsiveMenu.style.top = "-500px";

  function toggleMenu() {
    const isOpen = responsiveMenu.style.top === "78px";
    responsiveMenu.style.top = isOpen ? "-500px" : "78px";
    menuBar.classList.toggle("active");
  }

  menuBar.addEventListener("click", toggleMenu);

  document.addEventListener("click", function (event) {
    if (!menuBar.contains(event.target) && !responsiveMenu.contains(event.target) && menuBar.classList.contains("active")) {
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
      const isVideo = this.classList.contains("videoBox");
      const source = isVideo ? this.querySelector("video source").src : this.querySelector("img").src;
      const contentHtml = isVideo ? `<video controls><source src="${source}" type="video/mp4"></video>` : `<img src="${source}" alt="Media">`;
      popupContent.innerHTML = contentHtml;
      mediaPopup.style.display = "flex";
    });
  });

  function showPrev() {
    currentIndex = (currentIndex - 1 + mediaBoxes.length) % mediaBoxes.length;
    mediaBoxes[currentIndex].click();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % mediaBoxes.length;
    mediaBoxes[currentIndex].click();
  }

  prevButton.addEventListener("click", showPrev);
  nextButton.addEventListener("click", showNext);

  window.addEventListener("click", function (event) {
    if (event.target === mediaPopup) {
      mediaPopup.style.display = "none";
    } 
  });

  closeButtonMedia.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});
