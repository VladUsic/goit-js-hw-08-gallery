'use strict';

import gallery from './gallery-items.js';

const ulGallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.lightbox');
const btn = document.querySelector('[data-action="close-lightbox"]');
const closeModalImage = document.querySelector('.lightbox__content');
const lightboxImage = lightbox.querySelector('.lightbox__image');

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
    `;
    return elGallery;
}

function createAllElementGallery(array) {
    return array.map((gallery) => createElementGallery(gallery)).join('');
}

const pictures = createAllElementGallery(gallery);
ulGallery.insertAdjacentHTML('afterbegin', pictures);

ulGallery.addEventListener('click', onClickHandlerOpen);
closeModalImage.addEventListener('click', closeLightbox);
btn.addEventListener('click', onClickHandlerClose);

function onClickHandlerOpen(e) {
    e.preventDefault();

    if (e.target.nodeName !== 'IMG') {
        return;
    }

    lightbox.classList.add('is-open');
    lightboxImage.src = e.target.getAttribute('data-source');
    lightboxImage.alt = e.target.alt;
    window.addEventListener('keyup', clickKey);
}

function onClickHandlerClose(e) {
    lightbox.classList.remove('is-open');
    window.removeEventListener('keyup', clickKey);
    lightboxImage.src = '';
    lightboxImage.alt = '';
}

function closeLightbox(event) {
    if (event.target === event.currentTarget) {
        onClickHandlerClose();
    }
}

function clickKey(event) {
    if (event.code === 'Escape') {
        console.log('click');
        onClickHandlerClose();
    }
}