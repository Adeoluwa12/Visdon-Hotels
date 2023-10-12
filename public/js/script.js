const menu = document.querySelector('#mobile-menu');

const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

//Display Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

//Show active when scrolling
const highlightMenu = () => {
const elem = document.querySelector('.highlight')
const homeMenu = document.querySelector('#home-page')
const aboutMenu = document.querySelector('#about-page')
const servicesMenu = document.querySelector('#dervices-page')
let scrollPos = window.scrollY;
//console.log(scrollPos);


//adds 'highlight' class to my menu items
if(window.innerwidth > 960 && scrollPos < 600) {
    homeMenu.classList.add('highlight')
    aboutMenu.classList.remove('highlight')
    return
} else if (window.innerwidth > 960 && scrollPos < 1400) {
    aboutMenu.classList.add('highlight')
    homeMenu.classList.remove('highlight')
    servicesMenu.classList.remove('highlight')
    return

} else if (window.innerwidth > 960 && scrollPos < 2345) {
    servicesMenu.classList.add('highlight')
    aboutMenu.classList.remove('highlight')
   
    return
}
    if((elem && window.innerwidth < 960 && scrollPos < 600) || elem) {
        elem.classList.remove('highlight')
    }
}


window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

//close mobile menu when clicking on a menu item
const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active')
    if(window.innerwidth <= 768 && menuBars) {
        menu.classList.toggle('is-active')
        menuLinks.classList.remove('active')
    }
}

menuLinks.addEventListener('click', hideMobileMenu)
navLogo.addEventListener('click', hideMobileMenu)
