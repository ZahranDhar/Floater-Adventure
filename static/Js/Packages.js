const params = new URLSearchParams(window.location.search);
const category = params.get("category");

fetch(`/getCategoryPackages?category=${category}`, { method: "POST" })
  .then(res => res.json())
  .then(data => {
    
    document.getElementById("heading").innerText=`Explore ${category}`

    if (!data || data.length === 0) {
      const container=document.getElementById("category-packages");
      container.innerHTML = `
        <div class="col-span-full text-center py-20">
          <div class="text-5xl mb-4">🚧</div>
          <h2 class="text-2xl font-semibold mb-2">Exciting Packages Coming Soon!</h2>
          <p class="text-gray-600">We're working hard to bring you amazing experiences in this category. Stay tuned!</p>
        </div>
      `;
      return;
    }
    const container = document.getElementById("category-packages");
    container.innerHTML = "";

    data.forEach(pkg => {
      const card = document.createElement("div");
      card.className = "shadow-lg rounded-xl border bg-white flex flex-col overflow-hidden";

      card.innerHTML = `
        <img src="${pkg.thumbnailURL}" alt="${pkg.title}" class="w-full h-56 object-cover" />
        <div class="p-4 flex flex-col justify-between" style="min-height: 200px;">
          <h4 class="font-semibold text-lg mb-1">${pkg.title}</h4>
          <p class="text-gray-600 text-sm max-h-10 overflow-y-auto pr-1">${pkg.description || ""}</p>
          <div class="text-right mt-2">
            <div class="mt-2 flex justify-between items-center text-sm">
              <span class="text-yellow-500">★ ${pkg.average_rating?.toFixed(1) || "N/A"}</span>
              <span class="text-gray-800 font-medium">₹${pkg.price?.toLocaleString() || "N/A"}</span>
            </div>
            <a href="/get-package?package_id=${pkg._id}" class="text-blue-600 text-xs underline">View Details</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  });

  fetch(`/get-expedition-id?category=${category}`)
    .then(res=>res.json())
    .then(data=>{

      // Expedition ID Display
      document.getElementById("expedition_id").textContent = data.expedition_id;
    });