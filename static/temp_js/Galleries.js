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

fetch("galleries",{method:"POST"})
.then(res=>res.json())
.then(data=>{
  const container= document.getElementById("galleries");
  container.innerHTML="";
  
  data.forEach(element => {
    const card=document.createElement("div");
    card.className = "shadow-lg rounded-xl border bg-white flex flex-col overflow-hidden";

    card.innerHTML = `
        <img src="${element.mediaFiles[0]}" alt="${element.title}" class="w-full h-56 object-cover" />
        <div class="p-3 flex flex-col justify-between" style="min-height: 100px;">

          <h4 class="font-semibold text-lg mb-1">${element.title}</h4>
          
          <div class="text-right mt-2">
            <a href="/gallery?title=${element.title}" class="text-blue-600 text-xs underline">View Gallery</a>
          </div>
        </div>
      `;

      container.appendChild(card);
    
  });

});