 
 // Review form submission
const reviewForm = document.getElementById("review-form");
if (reviewForm) {
reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const package_id=this.package_id.value.trim();
  const reviewer = this.reviewer.value.trim();
  const review = this.review.value.trim();
  const rating = this.querySelector('input[name="rating"]:checked')?.value;
  if (!reviewer || !review || !rating || !package_id) return;

  fetch(`/add-review?package_id=${package_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reviewer, review, rating }),
  })
    
})
} 