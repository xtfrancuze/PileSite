const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('open');     
    burgerMenu.classList.toggle('open'); 
});

const navigationLink = document.getElementById('navigationLinkes');
        const linkes = navigationLink.querySelectorAll('a');
        const path = document.location.pathname;
        linkes.forEach((link) => {
            console.log(link.pathname === path)
            if (link.pathname === path) {
                link.classList.add('active_btn');
            } else {
                link.classList.remove('active_btn');
            }
        })

import PhotoSwipeLightbox from 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/photoswipe-lightbox.esm.min.js';
const lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery',
  children: 'a',
  pswpModule: () => import('https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/photoswipe.esm.min.js'),

  
  showHideAnimationType: 'zoom',
  showAnimationDuration: 300,
  hideAnimationDuration: 300,

 
  bgOpacity: 0.85, 

  
  maxSpreadZoom: 4, 
  
  closeTitle: 'Закрыть окно',
  zoomTitle: 'Увеличить',
  arrowPrevTitle: 'Предыдущий слайд',
  arrowNextTitle: 'Следующий слайд'
});
lightbox.init();