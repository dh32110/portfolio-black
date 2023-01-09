'use strict'

// navbar transparent and color change
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
   console.log(navbarHeight);
document.addEventListener('scroll', () => {
   if (window.scrollY > navbarHeight) {
      navbar.classList.add('navbar--black');
   } else {
      navbar.classList.remove('navbar--black');
   }
});

// navbar menu click
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
   const target = event.target;
   const link = target.dataset.link;
   if (link == null) {
      return;
   }
   navbarMenu.classList.remove('open');
   scrollIntoView(link);
});

// navbar menu toggle btn
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
   navbarMenu.classList.toggle('open');
});

// Home contact me button
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
   scrollIntoView('#contact');
});

// home transparent
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
   home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Arrow btn opacity
const arrowBtn = document.querySelector('.arrow-btn');
document.addEventListener('scroll', () => {
   if (window.scrollY > homeHeight / 2) {
      arrowBtn.classList.add('visible');
   } else {
      arrowBtn.classList.remove('visible');
   }
});

arrowBtn.addEventListener('click', () => {
   scrollIntoView('#home');
});

// Works filter
// const workBtnContainer = document.querySelector('.work__categories');
// const workProjectContainer = document.querySelector('.work__project');
// const projects = document.querySelectorAll('.project');
// workBtnContainer.addEventListener('click', (event) => {
//    const filter = event.target.dataset.filter;

// // Selected button
// const active = document.querySelector('.categories__btn.selected');
// active.classList.remove('selected');
// event.target.classList.add('selected');
//    workProjectContainer.classList.add('anim-out');
//    setTimeout(() => {
//       projects.forEach((project) => {
//          if (filter === project.dataset.type) {
//             project.classList.remove('invisible');
//          } else {
//             project.classList.add('invisible');
//          }
//       });
//       workProjectContainer.classList.remove('anim-out');  
//    },300);
// });

const sectionIds = [
   "#home",
   "#about",
   "#skills",
   "#works",
   "#read",
   "#contact",
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id =>document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected){
   selectedNavItem.classList.remove('active');
   selectedNavItem = selected;
   selectedNavItem.classList.add('active');

} 

function scrollIntoView(selector) {
   const scrollTo = document.querySelector(selector);
   scrollTo.scrollIntoView({
      behavior: 'smooth'
   });
   selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
   root: null,
   rootMargin: '0px',
   threshold: 0.3,
   };
const observerCallback = (entries, observer) => {
   entries.forEach((entry) => {
      if(!entry.isIntersecting && entry.intersectionRatio > 0){
         const index = sectionIds.indexOf(`#${entry.target.id}`);
         if (entry.boundingClientRect.y < 0){
            selectedNavIndex = index + 1;
         } else {
            selectedNavIndex = index - 1;
         }
      }
   });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
   if(window.scrollY === 0){
      selectedNavIndex = 0;
   } else if (
      Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight
   ) {
      selectedNavIndex = navItems.length - 1;
   }
   selectNavItem(navItems[selectedNavIndex]);
});