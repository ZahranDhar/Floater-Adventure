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


fetch("expeditions", { method: "POST" })
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("expeditions");
    container.innerHTML = "";

    data.forEach(exp => {
      const card = document.createElement("div");
      card.className = "shadow-lg rounded-xl border bg-white flex flex-col overflow-hidden";

      card.innerHTML = `
        <img src="${exp.thumbnailUrl}" alt="${exp.title}" class="w-full h-56 object-cover" />
        <div class="p-3 flex flex-col justify-between" style="min-height: 140px;">

          <h4 class="font-semibold text-lg mb-1">${exp.title}</h4>
          <p class="text-gray-600 text-sm max-h-10 overflow-y-auto pr-1">${exp.description || ""}</p>
          
          <div class="text-right mt-2">
            <a href="/getCategoryPackages?category=${exp.title}" class="text-blue-600 text-xs underline">Related Packages</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  });
