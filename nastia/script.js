function extractNumber(filename) {
    let match = filename.match(/\d+/); // Extracts first number found
    return match ? parseInt(match[0], 10) : null; // Convert to integer
}

function changeImage(grid) {
    let currentBg = window.getComputedStyle(grid).backgroundImage;

    // 🔹 Extract actual filename from backgroundImage
    let filename = currentBg.replace(/^url\(["']?|["']?\)$/g, "").split('/').pop();
    console.log(`Extracted filename: ${filename}`); // Debugging step

    let number = extractNumber(filename);
    console.log(`Extracted number: ${number}`); // Debugging step

    if (number === null) return; // Exit if no valid number found

    if (filename.includes("name")) {
        grid.style.backgroundImage = `url('./src/hello${number}.png')`; // Swap to "hello"
    } else {
        grid.style.backgroundImage = `url('./src/name${number}.png')`; // Swap to "name"
    }
}

// Apply event listener to all grids
document.querySelectorAll('.grid').forEach(grid => {
    grid.addEventListener('mouseover', () => {
        console.log(`Mouseover on ${grid.id}`);
        changeImage(grid);
    });
});
