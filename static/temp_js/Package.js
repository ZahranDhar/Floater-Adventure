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
        <h3 class="text-xl font-bold mb-2">Day ${i + 1}: ${item.title}</h3>
        <p class="text-gray-700 mb-2">${item.content}</p>
        <p class="text-sm text-gray-600"><strong>Accommodation:</strong> ${item.accommodation || "N/A"}</p>
        <p class="text-sm text-gray-600"><strong>Meals:</strong> ${item.meals || "N/A"}</p>
      </div>
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
  document.getElementById("package-price").textContent = `₹${data.price.toLocaleString()}`;

  // Package ID Display
  document.getElementById("package-id-display").textContent = packageId;

});

// Review form submission
const reviewForm = document.getElementById("review-form");
if (reviewForm) {
reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const reviewer = this.reviewer.value.trim();
  const review = this.review.value.trim();
  const rating = this.querySelector('input[name="rating"]:checked')?.value;
  if (!reviewer || !review || !rating) return;

  fetch(`/add-review?package_id=${packageId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reviewer, review, rating }),
  })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        const div = document.createElement("div");
        div.className = "border p-3 rounded bg-gray-50";
        div.innerHTML = `
          <p class="font-semibold">${reviewer}</p>
          <p class="text-gray-700">${review}</p>
          <p class="text-yellow-500">★ ${rating}</p>
        `;
        if (result.success) {
      // prepend review (already done)
      document.getElementById("reviews-container").prepend(div);

      // update average rating UI
      const avgContainer = document.getElementById("average-rating");
      avgContainer.innerHTML = "";

      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.className = "text-yellow-400 text-2xl";
        star.textContent = i <= Math.round(result.average_rating) ? "★" : "☆";
        avgContainer.appendChild(star);
      }

      const txt = document.createElement("span");
      txt.className = "ml-2 text-white text-base";
      txt.textContent = `(${result.average_rating.toFixed(1)})`;
      avgContainer.appendChild(txt);



      this.reset();

}
      } else {
        alert("Failed to submit review");
      }
    });
});
}
