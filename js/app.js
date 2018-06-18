"use strict"

var nextImage = 0;
function displayImages() {
  // Display First Image
  var image1 = Placeholder.all[nextimage++];
  console.log(image1);
  var img1 = document.getElementById("product-1");
  img1.src = image1.src;
  img1.currentPlaceholder = image1;

  var image2 = Placeholder.all[nextImage++];
  console.log(image2);
  var img2 = document.getElementById("product-2");
  img2.src = image2.src;
  img2.currentPlaceholder = image2;
}