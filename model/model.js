const username = localStorage.getItem("username");
const idStr = localStorage.getItem("routeId");
const routeType = parseIdStr(idStr)[0];
const routeId = parseIdStr(idStr)[1];
const header = document.querySelector('#left-header-text');
const logoutButton = document.querySelector('#logout-button');
const backButton = document.querySelector('#back-button');

header.innerHTML = "Hallo " + username + " welcome to DHBW RideShare!";
logoutButton.addEventListener('click',logoutRouting);
backButton.addEventListener('click',backRouting);

console.log(routeType,routeId);


function logoutRouting() {
    location.replace("../page_1/index.html");
}

function backRouting() {
    location.replace("../page_2/page_2.html");
}

function parseIdStr(idStr) {
    return idStr.split(':');
}