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

// const params = new URLSearchParams(window.location.search);
// const title = params.get("title");

// fetch(`/gallery?title=${title},{method:"POST}`)
// .then(res=>res.json())
// .then(data=>{

// })

  const gallery = document.getElementById("bigGallery");
  const images = gallery.querySelectorAll("img");
  let currentIndex = 0;

  function updateGallery() {
    const width = images[0].clientWidth + 16; // + margin (mx-2)
    gallery.style.transform = `translateX(-${currentIndex * width}px)`;
  }

  document.getElementById("prevBtn").onclick = () => {
    if (currentIndex > 0) currentIndex--;
    updateGallery();
  };

  document.getElementById("nextBtn").onclick = () => {
    if (currentIndex < images.length - 1) currentIndex++;
    updateGallery();
  };
