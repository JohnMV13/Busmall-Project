"use strict"

// window.addEventListener("load", function onLoad() {
//   loadFromStorage();

//   if (Placeholder.all.length === 0) {
//     initialize();
//   }
//   displayImages();
// });

// function saveAll() {
//   localStorage["voteHistpry"] = JSON.stringify({ voteCount: Placeholder.voteCount });
//   localStorage("placeholders") = JSON.stringify(Placeholder.all);
//   console.log(localStorage);
// }

// function loadFromStorage() {
//   var jsonVoteHistoryString = localStorage["voteHistory"];
//   if (jsonVoteHistoryString) {
//     var voteHistory = JSON.parsel(jsonVoteHistoryString);
//     Placeholder.voteCount = voteHistory.voteCount;
//     console.log("setting voteCount to " + Placeholder.voteCount);
//   }

//   var jsonStringFromStorage = localStorage["placeholders"];
//   if (!jsonStringFromStorage)
//     return;

//   var arrayFromStorage = JSON.parse(jsonStringFromStorage);
//   for (var i = 0; i < arrayFromStorage.length; i++) {
//     var arrayItem = arrayFromStorage[i];
//     new Placeholder(arrayItem.name, arrayItem.src, arrayItem.showCount, arrayItem.voteCount);
//   }
//   console.log("fromStorage", Placeholder.all);
// }

function getNextImage() {
  // TODO: Write code to prevent the same random number being generated twice
  var nextIndex = Math.floor(Math.random() * Placeholder.all.length);
  var image = Placeholder.all[nextIndex];
  return image;
}

var totalVoteCount = 0;
function displayImages() {
  if (totalVoteCount >= 5) {
    showResults();
    return;
  }

  // Display image1
  var image1 = getNextImage();
  var img1 = document.getElementById("product-1");
  img1.src = image1.src;
  image1.showCount++;
  img1.currentPlaceholder = image1;

  var image2 = getNextImage();
  var img2 = document.getElementById("product-2");
  img2.src = image2.src;
  image2.showCount++;
  img2.currentPlaceholder = image2;

  var image3 = getNextImage();
  var img3 = document.getElementById("product-3");
  img3.src = image3.src;
  image3.showCount++;
  img3.currentPlaceholder = image3;

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