let grid = document.querySelector(".grid-container");
let boxes = document.querySelectorAll(".resize");

let lastScrollTop = window.scrollY;
let isEmptyMode = false; // hiding images on scroll up

const folders = ["abstract", "sculpture", "contemporary", "photos"];
let currentIndex = 0;

let preloadedImages = {};
let scrollCounter = 0;
let lowerLevelActive = false;

// preload
function preloadImages() {
    folders.forEach(folder => {
        preloadedImages[folder] = [];
        for (let i = 1; i <= 5; i++) {
            let img = new Image();
            img.src = `${folder}/image${i}.jpg`;
            preloadedImages[folder].push(img);
        }
    });
}

function updateBackgrounds() {
    if (lowerLevelActive) return; // stop updates if in lower level mode

    let folder = folders[currentIndex];

    boxes.forEach(box => box.style.background = "rgba(170, 170, 170, 0.6)");
    boxes.forEach(box => box.style.border = "none"); // Reset borders 

    let selectedBoxes = [...boxes].sort(() => Math.random() - 0.5).slice(0, 5);
    selectedBoxes.forEach((box, index) => {
        let preloadedImage = preloadedImages[folder][index];
        if (preloadedImage) {
            box.style.background = `url('${preloadedImage.src}') center/cover no-repeat`;
        }
    });

    currentIndex = (currentIndex + 1) % folders.length;
}

function removeImages() {
    boxes.forEach(box => {
        box.style.transition = "background 0.5s ease, border 0.5s ease";
        box.style.background = "none";
        box.style.border = "1px solid black";
    });
}

function restoreImages() {
    updateBackgrounds();
}

window.addEventListener("scroll", () => {
    console.log(scrollCounter);
    let currentScroll = document.documentElement.scrollTop;

    if (!lowerLevelActive) {
        if (scrollCounter < 20) {
            if (currentScroll < lastScrollTop) {
                isEmptyMode = true;
                removeImages();
                scrollCounter++;
            } else if (isEmptyMode) {
                isEmptyMode = false;
                restoreImages();
            }
        }

        if (scrollCounter >= 20) {
            enterLowerLevelMode();
        }
    } else {
        if (scrollCounter < 30) {
            scrollCounter++;
        } else {
            exitLowerLevelMode();
        }
    }

    lastScrollTop = Math.max(0, currentScroll);
});

function enterLowerLevelMode() {
    lowerLevelActive = true;
    scrollCounter = 0;
    document.body.style.background = "black";
    grid.style.display = "grid";
    grid.innerHTML = "";
    createLowerLevel();
}

function exitLowerLevelMode() {
    lowerLevelActive = false;
    scrollCounter = 0;
    document.body.style.background = "white";
    grid.innerHTML = "";
    recreateInitialGrid();
}

function recreateInitialGrid() {
    for (let i = 1; i <= 20; i++) {
        let div = document.createElement("div");
        div.className = `resize box${i}`;
        grid.appendChild(div);
    }
    boxes = document.querySelectorAll(".resize"); // update node list
    boxes.forEach(box => {
        box.addEventListener("click", () => {
            applyRandomFilter(box);
            resizeGrid();
        });
    });

    updateBackgrounds();
    resizeGrid();
}

function applyRandomFilter(box) {
    const filters = ["grayscale(100%)", "sepia(50%)", "blur(3px)", "contrast(200%)"];
    box.style.filter = filters[Math.floor(Math.random() * filters.length)];
}

function resizeGrid() {
    let numCols = 6, numRows = 6;
    grid.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

    let usedPositions = new Set();

    boxes.forEach(box => {
        let colSpan = Math.random() > 0.5 ? 1 : 2;
        let rowSpan = Math.random() > 0.5 ? 1 : 2;
        let colStart, rowStart, attempts = 0;

        do {
            colStart = Math.floor(Math.random() * (numCols - colSpan + 1)) + 1;
            rowStart = Math.floor(Math.random() * (numRows - rowSpan + 1)) + 1;
            attempts++;
        } while (usedPositions.has(`${colStart},${rowStart}`) && attempts < 10);

        usedPositions.add(`${colStart},${rowStart}`);
        box.style.gridColumn = `${colStart} / span ${colSpan}`;
        box.style.gridRow = `${rowStart} / span ${rowSpan}`;
    });
}

function createLowerLevel() {
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(5, 1fr)";
    grid.style.gridTemplateRows = "repeat(4, 1fr)";


    let imageCaptionPairs = [];

    let captions = [
        "Helen Frankenthaler, <i>Cool Summer</i>, 1962", "Joan Mitchell, <i>Untitled</i>, 1992", "Willem de Kooning, <i>Landscape, Abstract</i>, 1949", "Gerhard Richter, <i>941-4 Abstraktes Bild</i>, 2015", "Carmen Herrera, <i>Alpes</i>, 2015",
        "Jeanne-Claude and Christo, <i>Wrapped television (hommage à Nam June Park)</i>, 1967", "Ruth Asawa, <i>Untitled (S.453, Hanging Three-Lobed, Three-Layered Continuous Form within a Form)</i>, 1957-59", "Isa Genzken, <i>Schauspieler</i>, 2013", "Jean-Marie Appriou, <i>The cave of time (mythologique)</i>, 2018", "Roni Horn, <i>Untitled (“Y is for the ambush of youth and escaping it year by year.”)</i>, 2013-17",
        "Henni Alftan, <i>Sharp</i>, 2016", "Vija Celmins, <i>Untitled [Waves]</i>, 1970", "Erwin Wurm, <i>Fat Convertible</i>, 2005", "Faith Ringgold, <i>Tar Beach</i>, 1988", "Gerhard Richter, <i>Betty</i>, 1988",
        "Nan Goldin, <i>Misty and Jimmy Paulette in a taxi</i>, NYC, 1991", "Cindy Sherman, <i>Untitled #477</i>, 2008", "Wolfgang Tillmans, <i>Suzanne & Lutz</i>, 1993", "Tyler Mitchell, <i>Treading</i>, 2022", "Robert Mapplethorpe, <i>White Gauze</i>, 1984"
    ];

    folders.forEach((folder, index) => {
        for (let i = 1; i <= 5; i++) {
            imageCaptionPairs.push({
                imagePath: `${folder}/image${i}.jpg`,
                caption: captions[index * 5 + (i - 1)]
            });
        }
    });

    imageCaptionPairs.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 20; i++) {
        let { imagePath, caption } = imageCaptionPairs[i % imageCaptionPairs.length];

        let gridItem = document.createElement("div");
        gridItem.style.background = `url('${imagePath}') center/cover no-repeat`;
        gridItem.classList.add("lowerLevelGridItem");
        gridItem.style.transition = "transform 0.3s ease";


        let captionDiv = document.createElement("div");
        captionDiv.innerHTML = caption;
        captionDiv.classList.add("imageCaptions");
        gridItem.appendChild(captionDiv);

        let columnIndex = i % 5;
        captionDiv.style.top = "50%";
        captionDiv.style.transform = "translateY(-50%) scale(0.95)";

        if (columnIndex === 4) {
            captionDiv.style.right = "110%";
        } else {
            captionDiv.style.left = "110%";
        }

        gridItem.addEventListener("mouseover", () => {
            captionDiv.style.opacity = "1";
            captionDiv.style.visibility = "visible";
            captionDiv.style.transform = "translateY(-50%) scale(1.05)"; // enlargement

            gridItem.style.transform = "scale(1.05)"; // enlargement
        });

        gridItem.addEventListener("mouseleave", () => {
            captionDiv.style.opacity = "0";
            captionDiv.style.transform = "translateY(-50%) scale(0.95)";
            setTimeout(() => {
                captionDiv.style.visibility = "hidden";
            }, 400);

            gridItem.style.transform = "scale(1)"; // reset size
        });

        grid.appendChild(gridItem);
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    preloadImages();
    boxes.forEach(box => {
        box.addEventListener("click", () => {
            applyRandomFilter(box);
            resizeGrid();
        });
    });

    updateBackgrounds();
    setInterval(updateBackgrounds, 10000);
});
