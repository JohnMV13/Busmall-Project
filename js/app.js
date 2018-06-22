"use strict"

window.addEventListener("load", function onLoad() {
  loadFromStorage();

  if (Placeholder.all.length === 0) {
    initialize();
  }
  displayImages();
});

function saveAll() {
  localStorage["voteHistpry"] = JSON.stringify({ voteCount: Placeholder.voteCount });
  localStorage("placeholders") = JSON.stringify(Placeholder.all);
  console.log(localStorage);
}

function loadFromStorage() {
  var jsonVoteHistoryString = localStorage["voteHistory"];
  if (jsonVoteHistoryString) {
    var voteHistory = JSON.parsel(jsonVoteHistoryString);
    Placeholder.voteCount = voteHistory.voteCount;
    console.log("setting voteCount to " + Placeholder.voteCount);
  }

  var jsonStringFromStorage = localStorage["placeholders"];
  if (!jsonStringFromStorage)
    return;

  var arrayFromStorage = JSON.parse(jsonStringFromStorage);
  for (var i = 0; i < arrayFromStorage.length; i++) {
    var arrayItem = arrayFromStorage[i];
    new Placeholder(arrayItem.name, arrayItem.src, arrayItem.showCount, arrayItem.voteCount);
  }
  console.log("fromStorage", Placeholder.all);
}

function getNextImage() {
  // TODO: Write code to prevent the same random number being generated twice
  var nextIndex = Math.floor(Math.random() * Placeholder.all.length);
  var image = Placeholder.all[nextIndex];
  return image;
}

var totalVoteCount = 0;
function displayImages() {
  if (totalVoteCount >= 25) {
    showResults();
    return;
  }

  var lastViewed = []

  // Display image1
  var imageI = document.getElementById("product-1");
  var imageII = document.getElementById("product-2");
  var imageIII = document.getElementById("product-3");
  // Display image1
  do {
    var image1 = getNextImage();
  } while (lastViewed.includes(image1));
  lastViewed.push(image1);

  var image2 = getNextImage();
  while (lastViewed.includes(image2)) {
   
    image2 = getNextImage();
  }
  lastViewed.push(image2);

    do {
    var image3 = getNextImage();
    } while (lastViewed.includes(image3));
    lastViewed.push(image3);

    if (lastViewed.length > 3) {
      lastViewed.splice(0, 3);
    }

    image1.showCount++;
    image2.showCount++;
    image3.showCount++;

    imageI.src = image1.src;
    imageII.src = image2.src;
    imageIII.src = image3.src;

    imageI.currentPlaceholder = image1;
    imageII.currentPlaceholder = image2;
    imageIII.currentPlaceholder = image3;
    
  console.log("updated Placeholders", Placeholder.all);
}

var productImages = document.querySelectorAll("#voting img");
for(var i =0; i < productImages.length; i++) {
  var thisImage = productImages[i];
  thisImage.addEventListener("click", function (event) {
    var clickedPlaceholder = event.target.currentPlaceholder;
    totalVoteCount++;
    console.log("click #" + totalVoteCount);
    clickedPlaceholder.voteCount++;
    displayImages();
  });
}

function Placeholder(name, src) {
  this.name = name;
  this.src = src;
  this.showCount = 0;
  this.voteCount = 0; 

  Placeholder.all.push(this);
}
Placeholder.all = [];

new Placeholder("bag", "../img/bag.jpg");
new Placeholder("breakfast", "../img/breakfast.jpg");
new Placeholder("pen", "../img/pen.jpg");
new Placeholder("scissors", "../img/scissors.jpg");
new Placeholder("tauntaun", "../img/tauntaun.jpg");
new Placeholder("usb", "../img/usb.gif");
new Placeholder("wine-glass", "../img/wine-glass.jpg");
new Placeholder("banana", "../img/banana.jpg");
new Placeholder("bathroom", "../img/bathroom.jpg");
new Placeholder("bubblegum", "../img/bubblegum.jpg");
new Placeholder("chair", "../img/chair.jpg");
new Placeholder("cthulhu", "../img/cthulhu.jpg");
new Placeholder("dog-duck", "../img/dog-duck.jpg");
new Placeholder("dragon", "../img/dragon.jpg");
new Placeholder("shark", "../img/shark.jpg");
new Placeholder("sweep", "../img/sweep.png");

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
          label: "Vote Count",
          backgroundColor: "rgb(0, 0, 0)",
          data: voteCounts
        },
      ]
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            biginAtZero: true
          }
        }]
      }
    },
    title: {
      display: true,
      text: "Voting Results"
    }
  })
}