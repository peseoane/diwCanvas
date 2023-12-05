document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 0;
  const slides = document.querySelectorAll(".fotos");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  function showSlides(n) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slideIndex += n;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    } else if (slideIndex < 1) {
      slideIndex = slides.length;
    }

    slides[slideIndex - 1].style.display = "block";
  }

  prevButton.addEventListener("click", function () {
    showSlides(-1);
  });

  nextButton.addEventListener("click", function () {
    showSlides(1);
  });

  showSlides(0);
});
