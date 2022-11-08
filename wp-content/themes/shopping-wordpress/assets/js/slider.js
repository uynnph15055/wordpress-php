const images = document.querySelectorAll(".container__image");
const dots = document.querySelectorAll(".container__dots--item");
const btnPrev = document.querySelector(".container__btn-prev");
const btnNext = document.querySelector(".container__btn-next");
let currentIndex = 0;

dots.forEach((item , index) => {
    item.addEventListener('click' , () => {
        currentIndex = index;
        updateStatusImage(currentIndex);
    })
});

images[currentIndex].classList.add("active");

function updateStatusImage(index) {
  images.forEach((item, ind) => {
    if (ind == index) {
      images[index].classList.add("active");
    } else {
      if (index == images.length) {
        currentIndex = 0;
        images[currentIndex].classList.add("active");
        dots[currentIndex].classList.add("active");
      }else{
        item.classList.remove("active");
      }
    }

    dots.forEach((item, ind) => {
      ind == index
        ? dots[index].classList.add("active")
        : item.classList.remove("active");
    });
  });
}

btnNext.addEventListener("click", () => {
  if (currentIndex == images.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  updateStatusImage(currentIndex);
});

btnPrev.addEventListener("click", () => {
    if (currentIndex == 0) {
      currentIndex = images.length-1;
    } else {
      currentIndex--;
    }
    updateStatusImage(currentIndex);
  });
