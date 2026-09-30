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