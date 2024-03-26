document.addEventListener("DOMContentLoaded", function () {
  const menuBar = document.getElementById("menuBar");
  const responsiveMenu = document.getElementById("responsiveMenu");
  const shareButton = document.querySelector(".shareButton");
  const popup = document.querySelector(".popup");
  const closeButton = document.querySelector(".closeButton");
  const copyButton = document.querySelector(".copyButton");
  const urlInput = document.querySelector(".urlInput");

  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    responsiveMenu.style.top = menuOpen ? "5px" : "-500px";
    menuBar.classList.toggle("active");
  }

  menuBar.addEventListener("click", toggleMenu);

  document.addEventListener("click", function (event) {
    if (
      !menuBar.contains(event.target) &&
      !responsiveMenu.contains(event.target)
    ) {
      responsiveMenu.style.top = "-500px";
      menuBar.classList.remove("active");
      menuOpen = false;
    }
  });

  const menuItems = document.querySelectorAll("#menuItems a");
  menuItems.forEach(function (item) {
    item.addEventListener("click", function () {
      responsiveMenu.style.top = "-500px";
      menuBar.classList.remove("active");
      menuOpen = false;
    });
  });

  responsiveMenu.style.top = "-500px";

  function openPopup() {
    popup.style.display = "block";
    urlInput.value = window.location.href;
  }

  function closePopup() {
    popup.style.display = "none";
  }

  document.addEventListener("click", function (event) {
    if (popup.contains(event.target)) {
      popup.style.display = "none";
    }
  });

  function copyUrl() {
    urlInput.select();
    urlInput.setSelectionRange(0, 99999); 
    document.execCommand("copy");
  }

  shareButton.addEventListener("click", openPopup);

  closeButton.addEventListener("click", closePopup);

  copyButton.addEventListener("click", copyUrl);
});

// img klik olunduqda acilan slider 

const imgBoxes = document.querySelectorAll(".imgBox");
const overlay = document.getElementById("overlay");
const imgOverlay = document.getElementById("imgOverlay");
let currentIndex = 0;

imgBoxes.forEach((imgBox, index) => {
  imgBox.addEventListener("click", () => {
    currentIndex = index;
    showImage(index);
  });
});

function showImage(index) {
  overlay.style.display = "flex";
  imgOverlay.src = imgBoxes[index].querySelector("img").src;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + imgBoxes.length) % imgBoxes.length;
  imgOverlay.src = imgBoxes[currentIndex].querySelector("img").src;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % imgBoxes.length;
  imgOverlay.src = imgBoxes[currentIndex].querySelector("img").src;
}

function closeOverlay(event) {
  if (event.target === overlay) {
    overlay.style.display = "none";
  }
}

overlay.addEventListener("click", closeOverlay);
