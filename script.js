
const magritte = document.querySelector("#magritte");
const links = document.querySelectorAll(".link");
const moon = document.querySelector("#moon");
const moonText = document.querySelector("#moontext")
const shadow = document.querySelector('#shadow');
const shadowText = document.querySelector("#shadowtext");


const picture = document.querySelector('#picture');
const rightSide = document.querySelector("#rightSide");

moonText.textContent = "One, two  Moon river, wider than a mile  I'm crossing you in style someday (someday, day)  A dream maker(maker)  My heart(you heart) breaker   Wherever you're goin'  I'm goin' that way(the same, the same)  Two drifters off to see the world  There's such a crazy world to see  We're all chasin' after all the same  Chasing after our ends  Moon river, wider than a mile  Crossin' in style someday  My dream maker, heartbreaker  Wherever you're goin', I'm goin' the same  Two drifters off to see the world   It's such a crazy world you'll see(what I see, who I become  (What I see, who I become)  We're all chasin' after our ends  Chasin' after our ends  Life's just around the bend, my friend  Moon river and me";

let backgroundColors = ["#22223b", "#4a4e69", "#403d39", "#454545", "#051923", "#1b2021"]


rightSide.addEventListener('mouseclick', () => {

})


moon.addEventListener('mouseenter', () => {
    moonText.style.opacity = "100";
});
moon.addEventListener('mouseleave', () => {
    moonText.style.opacity = "0";
})

shadow.addEventListener('mouseenter', () => {
    let randomNumber = Math.floor(Math.random() * 5);
    document.body.style.backgroundColor = backgroundColors[randomNumber];
});



function displayMagritte() {
    picture.appendChild(shadow);
    picture.appendChild(moon);
    picture.appendChild(magritte);

    document.body.appendChild
}

function clearPage() {

}