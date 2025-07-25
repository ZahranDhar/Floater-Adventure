let mediaIndex=0;

function addMedia(){
  mediaIndex++;
  const container = document.getElementById("mediafiles");
  const media =document.createElement(`media_file_${mediaIndex}`);
  media.innerHTML=`
  <input type="file" name="media_file_${mediaIndex}" accept="image/*" required class="w-full border p-2 rounded" />
  `;
  container.appendChild(media);
}

function removeMedia(){
  const container=document.getElementById("mediafiles");
  if (mediaIndex>0){
    container.lastElementChild.remove();
    mediaIndex--;
  }
}