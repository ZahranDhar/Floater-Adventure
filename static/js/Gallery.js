// Fetch Images
const params = new URLSearchParams(window.location.search);
const title = params.get("title");

fetch(`/gallery?title=${title}`,{method:"POST"})
.then(res=>res.json())
.then(data=>{
  const gallery = document.getElementById("bigGallery");
  gallery.innerHTML="";

 data.mediaFiles.forEach(imgURL => {
      const image = document.createElement("img");
      image.src = imgURL;
      image.className = "flex-shrink-0 object-contain h-full w-full";
      gallery.appendChild(image);
    });

  // Navigation Module
  const images = gallery.querySelectorAll("img");
  let index = 0;

  const updateGallery = () => {
    const width = gallery.clientWidth;
    gallery.style.transform = `translateX(-${index * width}px)`;
  };

  document.getElementById("prevBtn").onclick = () => {
    if (index > 0) index--;
    updateGallery();
  };

  document.getElementById("nextBtn").onclick = () => {
    if (index < images.length - 1) index++;
    updateGallery();
  };

  window.addEventListener("resize", updateGallery);

});


