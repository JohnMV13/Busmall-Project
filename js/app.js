"use strict"


function displayImages() {
  var nextImage = 0;
  // Display First Image
  var image1 = Placeholder.all[nextImage++];
  console.log(image1);
  var img1 = document.getElementById("product-1");
  img1.src = image1.src;
  img1.currentPlaceholder = image1;

  var image2 = Placeholder.all[nextImage++];
  console.log(image2);
  var img2 = document.getElementById("product-2");
  img2.src = image2.src;
  img2.currentPlaceholder = image2;

  var image3 = Placeholder.all[nextImage++];
  console.log(image3);
  var img3 = document.getElementById("product-3");
  img3.src = image3.src;
  img3.currentPlaceholder = image3;
}

var productImages = document.querySelectorAll("#voting img");
for(var i =0; i < productImages.length; i++) {
  productImages[i].addEventListener("click", function (event) {
    console.log("click", event.target.currentPlaceholder);
    voteCount++

    console.log("click #" + voteCount);
    event.target.currentPlaceholder;

    displayImages();
  });
}

function Placeholder(name, src) {
  this.name = name;
  this.src = src;

  Placeholder.all.push(this);
}
Placeholder.all = [];

new Placeholder("bag", "../img/bag.jpg", 7, 2);
new Placeholder("breakfast", "../img/breakfast.jpg", 10,10);
new Placeholder("pen", "../img/pen.jpg", 6, 3);
new Placeholder("scissors", "../img/scissors.jpg", 9, 5);
new Placeholder("tauntaun", "../img/tauntaun.jpg", 8, 1);
new Placeholder("usb", "../img/usb.gif", 9, 4);
new Placeholder("wine-glass", "../img/wine-glass.jpg", 7,5);

for (var i = 0; i < Placeholder.all.length; i++) {
  Placeholder.all[i].voteCount = Math.floor(5 + Math.random() * 500);
  Placeholder.all[i].showCount = Math.floor(20 + Math.random() * 1000);
}

console.log("all Placeholders", Placeholder.all);

window.addEventListener("load", displayImages);

function showResults() {
  var ul = document.getElementById("results");
  ul.innerHTML = "";

  for (var i = 0; i < Placeholder.all.length; i++) {
    var current = Placeholder.all[i];

    var li = document.createElement("li");
    li.textContent = current.name + " got " + current.voteCount + " votes";
    ul.appendChild(li);
  }

  showResultChart();
}

function showResultChart() {
  var canvas = document.getElementById("resultsCanvas");

  canvas.style.display = "block";

  var labels = [];
  var voteCounts = [];
  var showCounts = [];
  var votePercentage = [];
  for (var i = 0; i < Placeholder.all.length; i++) {
    labels[i] = Placeholder.all[i].name;
    voteCounts[i] = Placeholder.all[i].voteCount;
    showCounts[i] = Placeholder.all[i].showCount;
    votePercentage[i] = 100 * voteCounts[i] / showCounts[i];
  }

  var ctx = canvas.getContext("2d");
  var chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Vote Count",
          backgroundColor: "rgb(121, 0, 158)",
          data: voteCounts
        },
        {
          label: "Show Count",
          backgroundColor: "rgb(25, 96, 26)",
          data: showCounts
        },
        {
          label: "Vote %",
          backgroundColor: "rgb(0, 0, 0)",
          data: votePercentage
        },
      ]
    },
    title: {
      display: true,
      text: "Voting Results"
    }
  })
}