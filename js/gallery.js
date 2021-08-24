'use strict';

import gallery from './gallery-items.js';


const ulGallery = document.querySelector('.js-gallery');
console.log('ulGallery:', ulGallery);
const lightbox = document.querySelector('.lightbox');
const btn = document.querySelector('[data-action="close-lightbox"]');
const closeModalImage = document.querySelector('.js-lightboxContent');
const lightbox__image = lightbox.querySelector('.lightbox__image');

function createElementGallery({ preview, original, description }) {
    const elGallery = `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `
    return elGallery;
}

function createAllElementGallery(array) {
    return array
        .map((gallery) => createElementGallery(gallery))
        .join('');
};

const pictures = createAllElementGallery(gallery);
ulGallery.insertAdjacentHTML('afterbegin', pictures);


ulGallery.addEventListener('click', onClickHandlerOpen);
btn.addEventListener('click', onClickHandlerClose);
if (closeModalImage) {
    closeModalImage.addEventListener('click', closeLightbox);
};

function onClickHandlerOpen(e) {
    e.preventDefault();

    if (e.target.nodeName === 'IMG') {
        lightbox.classList.add('is-open');
        lightbox__image.src = e.target.getAttribute('data-source');
        lightbox__image.alt = e.target.alt;
    }
    window.addEventListener('keyup', clickKey);
}

function onClickHandlerClose(e) {
    lightbox.classList.remove('is-open');
    window.removeEventListener('keyup', clickKey);
    lightbox__image.src = e.target.getAttribute('data-source');
    lightbox__image.alt = e.target.alt;
}

function closeLightbox(event) {
    if (event.target === event.currentTarget) {
        onClickHandlerClose();
    };
}

function clickKey(event) {
    if (event.code === 'Escape') {
        onClickHandlerClose();
    }
}