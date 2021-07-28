"use strict";
const serviceButtons = document.querySelectorAll(".services-item-button");
const serviceCards = document.querySelectorAll(".service-card");
const workButtons = document.querySelectorAll(".work-item-button");
let workCards = document.querySelectorAll(".work-gallery-item");

const btnLoader = document.querySelector(".btn-load");
const loader = document.querySelector(".loader");
const workGallery = document.querySelector(".work-gallery");
const newDiv = document.querySelector(".work-gallery-item").cloneNode(true);
const newImg = newDiv.querySelector(".work-img");
const card = ["img/works/1.jpg", "img/works/2.jpg", "img/works/3.jpg", "img/works/4.jpg", "img/works/5.jpg", "img/works/6.jpg", "img/works/7.jpg", "img/works/8.jpg", "img/works/9.jpg", "img/works/10.jpg", "img/works/11.jpg", "img/works/12.jpg"];
const category = ["design", "web", "wordpress", "landing", "design", "design", "web", "wordpress", "landing", "wordpress", "landing", "wordpress"];
const text = ["Graphic Design", "Web design", "Wordpress Design", "Landing Design", "Graphic Design", "Graphic Design", "Web design", "Wordpress Design", "Landing Design", "Wordpress Design", "Landing Design", "Wordpress Design"];

function onTabClickServices(button) {
   button.addEventListener("click", () => {
      let currentBtn = button;
      let tabCategory = currentBtn.getAttribute("data-tab");
      let currentTab = document.querySelector(tabCategory);
      if (!currentBtn.classList.contains("active")) {
         serviceButtons.forEach(button => button.classList.remove("active"));
         serviceCards.forEach(card => card.classList.remove("active"));
         currentBtn.classList.add("active");
         currentTab.classList.add("active");
      }
   });
}
serviceButtons.forEach(onTabClickServices);

function onTabClickWorks(button) {
   button.addEventListener("click", () => {
      let currentBtn = button;
      let tabCategory = currentBtn.getAttribute("data-filter");

      let currentTab = document.querySelector(tabCategory);
      if (!currentBtn.classList.contains("active")) {
         workButtons.forEach(button => button.classList.remove("active"));
         currentBtn.classList.add("active");
      }
   });
}

workButtons.forEach(onTabClickWorks);





document.querySelector(".services-item-button").click(); // для выбора первого элемента активным


// прелоудер для после нажатии на кнопку и показ картинок

const loaderShow = btnLoader.addEventListener("click", () => {
   btnLoader.style.display = "none";
   loader.classList.add("show");
   setTimeout(() => {

      loader.classList.remove("show");
      for (let i = 0; i < card.length; i++) {

         const newDiv = document.querySelector(".work-gallery-item").cloneNode(true);
         const newImg = newDiv.querySelector(".work-img");
         const h4 = newDiv.querySelector(".work-gallery-item-hover h4");
         console.log(h4);
         newDiv.classList.replace("web", category[i]);
         h4.textContent = text[i];
         newImg.src = card[i];
         workGallery.appendChild(newDiv);
      }
   }, 2000);
})

workButtons.forEach(button => {
   button.addEventListener("click", () => {
      let workCards = document.querySelectorAll(".work-gallery-item");

      const currentCategory = button.dataset.filter;
      filter(currentCategory, workCards);
      workCards.forEach(card => {


         card.ontransitionend = function () {
            if (card.classList.contains("anime")) {
               card.classList.add("hide");
            }
         }
      });

   })
});


function filter(category, items) {
   items.forEach(item => {
      const isItemFiltered = !item.classList.contains(category);
      const isShowAll = category.toLowerCase() === "all";
      if (isItemFiltered && !isShowAll) {
         item.classList.add("anime");
      } else {
         item.classList.remove("hide");
         item.classList.remove("anime");
      }
   })
};

let index = 0;
const buttonPrev = document.querySelector(".button-prev");
const buttonNext = document.querySelector(".button-next");
const slides = document.querySelectorAll(".feedback-block");
const dots = document.querySelectorAll(".feedback-slider-item");
console.log(slides);
const activeSlide = n => {
   for (let slide of slides) {
      slide.classList.remove("active");
   }
   slides[n].classList.add("active");
}

const activeDot = n => {
   for (let dot of dots) {
      dot.classList.remove("active");
   }
   dots[n].classList.add("active");
}

const prepareSlide = ind => {
   activeSlide(ind);
   activeDot(ind);
}
const nextSlide = () => {
   if (index === slides.length - 1) {
      index = 0;
      prepareSlide(index);
   } else {
      index++;
      prepareSlide(index);
   }
}


const prevSlide = () => {
   if (index === 0) {
      index = slides.length - 1;
      prepareSlide(index);

   } else {
      index--;
      prepareSlide(index);
   }
}
dots.forEach((item, indexDot) => {
   item.addEventListener("click", () => {
      index = indexDot;
      prepareSlide(index);

   })
})
buttonNext.addEventListener("click", nextSlide);
buttonPrev.addEventListener("click", prevSlide);