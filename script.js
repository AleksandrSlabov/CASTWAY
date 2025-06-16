'use strict';

const inputName = document.querySelector('.inputName');
const inputEmail = document.querySelector('.inputEmail');
const form = document.querySelector('.form');
const conteinerLinksAndForm = document.querySelector('.conteiner__form');
const conteinerForm = document.querySelector('.conteiner_episodes__form');
const navToggle = document.querySelector('.nav__toggle');
const nuvSiteLinks = document.querySelector('.site__links');

const sliderbtn = document.querySelector('.button__star');
const btnEpisodes = document.querySelector('.btn__episodesAll');
const btnDetalis = document.querySelectorAll('.btn__detalis');
const btnSubmit = document.querySelector('.button__submit');

const clickR = document.querySelector('.clickR');
const clickL = document.querySelector('.clickL');

const conteinerStar = document.querySelectorAll('.conteiner__star');

console.log(btnSubmit);

const productCard = document.querySelector(
  '.description--and--button__product__card'
);

const headerLinks = document.querySelector('.site__links');
const siteLinks = document.querySelectorAll('.site__link__a');
const episodes = document.querySelector('.episodes');
const slidesWrapper = document.querySelector('.slides-wrapper');
const slides = document.querySelectorAll('.conteiner__star');
console.log(headerLinks);
let currentIndex = 0;

navToggle.addEventListener('click', function () {
  this.classList.toggle('active');
  siteLinks.classList.toggle('active');
});

document.querySelectorAll('.site__link__a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    nuvSiteLinks.classList.remove('active');
  });
});
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

function initSlider() {
  slides.forEach((slide, index) => {
    if (index === 0) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  updateWrapperHeight();
}

function updateWrapperHeight() {
  const activeSlide = document.querySelector('.conteiner__star.active');
  if (activeSlide) {
    slidesWrapper.style.height = `${activeSlide.scrollHeight}px`;
  }
}

function showSlide(index) {
  if (index >= slides.length) currentIndex = 0;
  else if (index < 0) currentIndex = slides.length - 1;
  else currentIndex = index;

  slides.forEach((slide) => {
    slide.classList.remove('active');
    slide.style.transform = 'translateX(100%)';
  });

  slides[currentIndex].classList.add('active');
  slides[currentIndex].style.transform = 'translateX(0)';

  updateWrapperHeight();
}

clickR.addEventListener('click', () => {
  showSlide(currentIndex + 1);
});

clickL.addEventListener('click', () => {
  showSlide(currentIndex - 1);
});

document.addEventListener('DOMContentLoaded', () => {
  initSlider();

  window.addEventListener('resize', updateWrapperHeight);
});

headerLinks.addEventListener('click', function (e) {
  const clickedLink = e.target.closest('.site__link__a');
  console.log(clickedLink);
  if (!clickedLink) return;

  siteLinks.forEach((link) => link.classList.remove('active'));
  clickedLink.classList.add('active');
});

const detalis = document.createElement('div');
detalis.classList.add('conteiner__cards', 'hidden');
detalis.innerHTML = `  <div class="conteiner__cards">
          <div class="product__Card">
            <img
              class="product__Card__img"
              src="image/music.avif"
              alt="imgCard"
            />
            <div class="conteiner__product__card">
              <p class="name__product__Card">Music</p>
              <div class="title__product__Card">
                <a href="#">Episode4</a>
                <p>
What kind of music is there?</p>
              </div>
              <div class="description--and--button__product__card">
                <p>
                  Conventionally, music can be divided into three global categories:
Classical music. An academic tradition that includes symphonies, sonatas, operas, instrumental and vocal works.
Folk music. An oral legacy passed down from generation to generation. These are folklore, ethnic melodies, ritual and dance songs.
Popular music. For a wide audience: pop, rock, rap, techno, jazz, reggae, etc..
                </p>
                <button class="btn__detalis">View Episode Details</button>
              </div>
            </div>
          </div>
        </div>`;
episodes.append(detalis);

btnEpisodes.addEventListener('click', function () {
  detalis.classList.toggle('hidden');
  if (!detalis.classList.contains('hidden')) {
    btnEpisodes.textContent = 'close';
  } else {
    btnEpisodes.textContent = 'View all episodes';
  }
});
btnDetalis.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const card = this.closest('.product__Card');
    const mainContent = card.querySelector(
      '.description--and--button__product__card:not(.discription__Card)'
    );
    const hiddenContent = card.querySelector('.discription__Card');

    if (mainContent && hiddenContent) {
      mainContent.classList.toggle('hidden');
      hiddenContent.classList.toggle('hidden');
    }
  });
});

btnSubmit.addEventListener('click', function (e) {
  console.log();
});

let arrForm = [];
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  arrForm.push(data);
  let current = 5;

  const modalWindow = document.createElement('div');
  modalWindow.classList.add('conteiner__form');

  modalWindow.innerHTML = `  
          <div class="conteiner__links__and__form">
            <div class="conteiner__links__news">
              <a href="">Email Newsletter</a>
              <p>Subscribe for updates</p>
            </div>
            <div class="form" >
            <p>Успешно</p>
         
         
              <button  class="button__close button__submit">close</button>
            </div>
          </div>
        `;

  conteinerForm.append(modalWindow);
  conteinerLinksAndForm.remove();
  const btnClose = document.querySelector('.button__close ');
  btnClose.addEventListener('click', function (e) {
    modalWindow.remove();
  });
  let countInterwal = setInterval(() => {
    current--;
    btnClose.textContent = `close(${current})`;
    if (current <= 0) {
      clearInterval(countInterwal);
      modalWindow.remove();
    }
  }, 1000);
});
