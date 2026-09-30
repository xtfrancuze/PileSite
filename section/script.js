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


const servicesSection = document.querySelectorAll('.info-row');
const scrollOnObserverServ = new IntersectionObserver((entries, observer) => {
    entries.forEach(x => {
        if (x.isIntersecting) {
            x.target.classList.add('visible');
            observer.unobserve(x.target);
        }
    }) 
}, {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px',
});
scrollOnObserverServ(servicesSection);