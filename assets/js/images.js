document.querySelectorAll('img').forEach(img => {
  function failed(){img.hidden=true;img.style.display='none';const n=img.nextElementSibling;if(n && n.classList.contains('image-notice')) n.hidden=false;}
  img.addEventListener('error',failed);if(img.complete && !img.naturalWidth) failed();
});
