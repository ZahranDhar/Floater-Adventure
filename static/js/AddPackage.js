let itineraryCount = 0;
let inclusionCount = 1;
let exclusionCount = 1;

// Add Itinerary
function addItinerary() {
  itineraryCount++;
  const container = document.getElementById('itinerary-container');
  const newItem = document.createElement('div');
  newItem.className = "itinerary-item bg-gray-50 p-4 rounded border space-y-2";
  newItem.innerHTML = `
    <input type="file" name="itinerary_image_${itineraryCount}" accept="image/*" class="w-full border p-2 rounded" required />
    <input type="text" name="itinerary_title_${itineraryCount}" placeholder="Itinerary Title" class="w-full border p-2 rounded" required />
    <textarea name="itinerary_content_${itineraryCount}" rows="2" placeholder="Day ${itineraryCount+1}: ..." class="w-full border p-2 rounded" required></textarea>
    <input type="text" name="itinerary_accommodation_${itineraryCount}" placeholder="Accommodation" class="w-full border p-2 rounded" />
    <input type="text" name="itinerary_meals_${itineraryCount}" placeholder="Meals" class="w-full border p-2 rounded" />
  `;
  container.appendChild(newItem);
}

// Remove Itinerary
function removeItinerary() {
  if (itineraryCount > 0) {
    document.getElementById('itinerary-container').lastElementChild.remove();
    itineraryCount--;
  }
}

// Add Inclusion
function addInclusion() {
  inclusionCount++;
  const container = document.getElementById('inclusions-container');
  const div = document.createElement('div');
  div.className = "flex gap-2";
  div.innerHTML = `
   <input type="text" name="inclusion[]" placeholder="Enter inclusion" class="w-full border p-2 rounded" />

    <button type="button" onclick="this.parentElement.remove()" class="text-red-500 font-bold">×</button>
  `;
  container.appendChild(div);
}

// Add Exclusion
function addExclusion() {
  exclusionCount++;
  const container = document.getElementById('exclusions-container');
  const div = document.createElement('div');
  div.className = "flex gap-2";
  div.innerHTML = `
    <input type="text" name="exclusion[]" placeholder="Enter exclusion" class="w-full border p-2 rounded" />

    <button type="button" onclick="this.parentElement.remove()" class="text-red-500 font-bold">×</button>
  `;
  container.appendChild(div);
}

//  Fetch Categories
fetch("/getCategories", { method: "POST" })
  .then(res => res.json())
  .then(categories => {
    const select = document.getElementById("categorySelect");
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      select.appendChild(option);
    });
  })
  .catch(err => console.error("Failed to load categories:", err));
