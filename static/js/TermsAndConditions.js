// Responsive Navigation Bar

const toggle = document.getElementById('menu-toggle');
const close = document.getElementById('close-menu');
const menu = document.getElementById('mobile-menu');

toggle.addEventListener('click', () => {
  menu.classList.remove('translate-x-full');
  menu.classList.add('translate-x-0');
});

close.addEventListener('click', () => {
  menu.classList.remove('translate-x-0');
  menu.classList.add('translate-x-full');
});
