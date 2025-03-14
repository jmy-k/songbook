let boxes = document.querySelectorAll(".resize");

let lastScrollTop = window.scrollY;
let isEmptyMode = false; // whether images should be hidden

const folders = ["abstract", "sculpture", "contemporary", "photos"]; // img folders
let currentIndex = 0; // start with abstract images

let preloadedImages = {}; // Object to store preloaded images

// Preload images for each folder
function preloadImages() {
    folders.forEach(folder => {
        preloadedImages[folder] = [];
        for (let i = 1; i <= 5; i++) { // Assuming each folder has 5 images
            let img = new Image();
            let imageUrl = `${folder}/image${i}.jpg`; // Adjust based on your actual image paths
            img.src = imageUrl;
            preloadedImages[folder].push(img);
        }
    });
}

// Run preload when DOM loads
document.addEventListener("DOMContentLoaded", () => {
    preloadImages();
    updateBackgrounds(); // Apply preloaded images

    // Change folder every 10 seconds
    setInterval(checkScrollState, 10000);
});

function updateBackgrounds() {
    let folder = folders[currentIndex];

    // Clear divs before applying new images
    boxes.forEach(box => {
        box.style.background = "rgba(170, 170, 170, 0.6)";
    });

    // Shuffle box array
    let boxesArray = Array.from(boxes);
    for (let i = boxesArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [boxesArray[i], boxesArray[j]] = [boxesArray[j], boxesArray[i]];
    }

    // Select 5 random divs for images
    let selectedBoxes = boxesArray.slice(0, 5);
    selectedBoxes.forEach((box, index) => {
        let preloadedImage = preloadedImages[folder][index];

        if (preloadedImage) {
            box.style.background = `url('${preloadedImage.src}') center/cover no-repeat`;
        }
    });

    // Cycle through folders
    currentIndex = (currentIndex + 1) % folders.length;
}

function removeImages() {
    boxes.forEach(box => {
        box.style.transition = "background 0.5s ease, border 0.5s ease";
        box.style.background = "none";
        box.style.border = "1px solid black";
    });
}

function checkScrollState() {
    if (!isEmptyMode) {
        updateBackgrounds(); // Update images only when scrolling down
    }
}
