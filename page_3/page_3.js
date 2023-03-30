const username = localStorage.getItem("username");
const header = document.querySelector('#left-header-text');
const logoutButton = document.querySelector('#logout-button');
const backButton = document.querySelector('#back-button');
const exitButton = document.querySelector('#exit-button');
const saveButton = document.querySelector('#save-button');
const type = document.querySelector('#type');
const date = document.querySelector('#date');
const time = document.querySelector('#time');
const start = document.querySelector('#start');
const end = document.querySelector('#end');
const seats = document.querySelector('#seats');
const contact = document.querySelector('#contact');
const note = document.querySelector('#note');


header.innerHTML = "Hallo " + username + " welcome to DHBW RideShare!";
logoutButton.addEventListener('click',logoutRouting);
backButton.addEventListener('click',backRouting);
exitButton.addEventListener('click',backRouting);
saveButton.addEventListener('click',saveData);


async function saveData() {
    if(date.value == ""||time.value == ""||start.value == ""||end.value == ""||contact.value == "") {
        alert("Please complete the form before you submit!");
        return;
    }
    
    let startUrl = 'https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf6248f43db33892644b6d808f1af271890c4e&text='+start;
    let endUrl = 'https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf6248f43db33892644b6d808f1af271890c4e&text='+end;
    
    const startRes = await fetch(startUrl);
    const endRes = await fetch(endUrl);

    if(startRes.status != 200 || endRes.status != 200) {
        alert("Please give valid locations!");
        return;
    }
    
    let newPost
    if(type.value == "offer_routes_id"){
        newPost = {
            offer_routes_id: 1, 
            start: start.value.toLowerCase(),
            end: end.value.toLowerCase(),
            date: date.value,
            time: time.value,
            user: localStorage.getItem("username"),
            contact: contact.value,
            seats: seats.value,
            note: note.value
        }
    } else {
        newPost = {
            request_routes_id: 1, 
            start: start.value.toLowerCase(),
            end: end.value.toLowerCase(),
            date: date.value,
            time: time.value,
            user: localStorage.getItem("username"),
            contact: contact.value,
            seats: seats.value,
            note: note.value
        }
    }
    let newPostStr = JSON.stringify(newPost);
    localStorage.setItem("newPost",newPostStr);
    alert("Successfully create a new post!")
    landingRouting();
    
}

function logoutRouting() {
    location.replace("../page_1/index.html");
}

function backRouting() {
    location.replace("../page_2/page_2.html");
}

function landingRouting() {
    location.replace("../page_4/page_4.html");
}

function parseIdStr(idStr) {
    return idStr.split(':');
}


