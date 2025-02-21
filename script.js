
const magritte = document.querySelector("#magritte");
const links = document.querySelectorAll(".link");
const moon = document.querySelector("#moon");
const moonText = document.querySelector("#moontext")
const shadow = document.querySelector('#shadow');
const shadowText = document.querySelector("#shadowtext");

moonText.textContent = "One, two  Moon river, wider than a mile  I'm crossing you in style someday (someday, day)  A dream maker(maker)  My heart(you heart) breaker   Wherever you're goin'  I'm goin' that way(the same, the same)  Two drifters off to see the world  There's such a crazy world to see  We're all chasin' after all the same  Chasing after our ends  Moon river, wider than a mile  Crossin' in style someday  My dream maker, heartbreaker  Wherever you're goin', I'm goin' the same  Two drifters off to see the world   It's such a crazy world you'll see(what I see, who I become  (What I see, who I become)  We're all chasin' after our ends  Chasin' after our ends  Life's just around the bend, my friend  Moon river and me";


moon.addEventListener('mouseenter', () => {
    moonText.style.opacity = "100";
});
moon.addEventListener('mouseleave', () => {
    moonText.style.opacity = "0";
})