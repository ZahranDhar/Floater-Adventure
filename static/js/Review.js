 
 // Review form submission
const reviewForm = document.getElementById("review-form");
if (reviewForm) {
reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const packageID=this.package_id.value.trim();
  const reviewer = this.reviewer.value.trim();
  const review = this.review.value.trim();
  const rating = this.querySelector('input[name="rating"]:checked')?.value;
  if (!reviewer || !review || !rating || !packageID) return;

  fetch(`/add-review?package_id=${packageId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reviewer, review, rating }),
  })
    
})
} 