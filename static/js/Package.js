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


const params = new URLSearchParams(window.location.search);
const packageId = params.get("package_id");

fetch(`/get-package?package_id=${packageId}`, { method: "POST" })
.then(res => res.json())
.then(data => {
  // Set banner
  const banner = document.getElementById("banner");
  banner.style.backgroundImage = `url('${data.thumbnailURL}')`;
  document.getElementById("banner-title").textContent = data.title;

  // Set overview
  document.getElementById("overview").textContent = data.overview;

  // Populate itineraries
  const container = document.getElementById("itinerary-list");
  data.itineraries.forEach((item, i) => {
    const block = document.createElement("div");
    block.className = "bg-white shadow rounded-md overflow-hidden flex flex-col md:flex-row w-full";
    block.innerHTML = `
      <img src="${item.itinerarythumbnailURL}" class="w-full md:w-80 h-64 object-cover" />
      <div class="p-6 overflow-y-auto max-h-64">
        <h3 class="text-xl font-bold mb-2">Day ${i+1}: ${item.title}</h3>
        <p class="text-gray-700 mb-2">${item.content}</p>
      </div>
        <p class="text-sm text-gray-600"><strong>Accommodation:</strong> ${item.accommodation || "N/A"}</p>
        <p class="text-sm text-gray-600"><strong>Meals:</strong> ${item.meals || "N/A"}</p>
    `;
    container.appendChild(block);
  });

  // Populate inclusions
  const inclusionsList = document.getElementById("inclusions-list");
  inclusionsList.innerHTML = "";
  data.inclusions.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    inclusionsList.appendChild(li);
  });

  // Populate exclusions
  const exclusionsList = document.getElementById("exclusions-list");
  exclusionsList.innerHTML = "";
  data.exclusions.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    exclusionsList.appendChild(li);
  });

  // Populate Highlihts
  const highlightsList = document.getElementById("highlights-list");
  highlightsList.innerHTML = "";
  data.highlights.forEach(item => {
    const li = document.createElement("li");
    li.className="flex items-start"
    li.innerHTML = `<span class="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3"></span> ${item}`
    highlightsList.appendChild(li);
  });

  // View Gallery Button
  const gallery=document.getElementById("view-gallery");
  gallery.innerHTML="";
  gallery.innerHTML=`
  <a href="/gallery?title=${data.galleryTitle}"
     class="px-10 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-xl shadow-md border border-indigo-600 transition duration-300 hover:bg-indigo-600 hover:text-white">
    View Gallery >
  </a>
  `;
  
  const avgRating = data.average_rating || 0;
  const starsContainer = document.getElementById("average-rating");
  starsContainer.innerHTML = "";

  // Render stars
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.className = "text-yellow-400 text-2xl";
    star.textContent = i <= Math.round(avgRating) ? "★" : "☆";
    starsContainer.appendChild(star);
  }

  // Append numeric value
  const text = document.createElement("span");
  text.className = "ml-2 text-white text-base";
  text.textContent = `(${avgRating.toFixed(1)})`;
  starsContainer.appendChild(text);

  // Populate reviews
  const reviewsContainer = document.getElementById("reviews-container");
  reviewsContainer.innerHTML = "";
  if(data.reviews && data.reviews.length>0){
    document.getElementById("review_heading").innerHTML=`
    <h2 class="text-3xl font-bold text-indigo-900 text-center mb-4">
      Why Travelers Love Floater Adventure
    </h2>
    <p class="text-gray-600 text-center max-w-2xl mx-auto mb-8">
      Discover what our happy explorers have to say about their unforgettable journeys with us.
    </p>`
  }
  (data.reviews || []).forEach(r => {
    const div = document.createElement("div");
    div.className = "border p-3 rounded bg-gray-50";
    div.innerHTML = `
      <p class="font-semibold">${r.reviewer}</p>
      <p class="text-gray-700">${r.review}</p>
      <p class="text-yellow-500">★ ${r.rating}</p>
    `;
    reviewsContainer.appendChild(div);
  });

  // Price Display
  document.getElementById("package_price").textContent = `₹${data.price.toLocaleString()}`;
  document.getElementById("discounted_price").textContent = `₹${data.discounted_price.toLocaleString()}`;

  let percentage_discount=((data.price-data.discounted_price)/data.price)*100;
  document.getElementById("discount_percent").textContent = `${percentage_discount.toLocaleString()}% OFF`;

  // Package ID Display
  document.getElementById("package-id-display").textContent = packageId;

});

// Get Package Titles
  fetch("/get-package-titles",{method:"POST"})
  .then(res=>res.json())
  .then(data=>{

    const container = document.getElementById("package");
    data.forEach(title=>{
      const option = document.createElement("option");
      option.innerHTML=`
        <option value="${title}">${title}</option>
      `;
      container.appendChild(option);
    });

  });

