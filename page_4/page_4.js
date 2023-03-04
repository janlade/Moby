const username = localStorage.getItem("username");
const idStr = localStorage.getItem("routeId");
const routeType = parseIdStr(idStr)[0];
const routeId = parseInt(parseIdStr(idStr)[1]);
const header = document.querySelector('#left-header-text');
const logoutButton = document.querySelector('#logout-button');
const backButton = document.querySelector('#back-button');
const newPostButton = document.querySelector('#new-post-button-right');
const leftContent = document.querySelector('#left-content');
const dateTime = document.querySelector('#date-time');
const startEndLocation = document.querySelector('#start-end-location');
const mapContainer = document.querySelector('#map-container');
const price = document.querySelector('#price');
const userContainer = document.querySelector('#user-container');
const seat = document.querySelector('#seat');
const note = document.querySelector('#note');
const userContact = document.querySelector('#user-contact');

loadContent();
header.innerHTML = "Thank you " + username + " for your post on DHBW RideShare!";
logoutButton.addEventListener('click',logoutRouting);
backButton.addEventListener('click',backRouting);
newPostButton.addEventListener('click',newPostRouting);




async function loadContent() {
    let data = JSON.parse(localStorage.getItem("newPost"));
    
    let date = data.date;
    let time = data.time;
    let start = data.start;
    let end = data.end;
    let user = data.user;
    let contact = data.contact;
    let seatInt = data.seats;
    let noteStr = data.note;

    //show date-time  
    const dateTimeCont = document.createElement('div');
    dateTimeCont.id = "date-time-content";
    dateTimeCont.innerHTML = date + "  " + time;
    dateTime.appendChild(dateTimeCont);

    //show start-end-location  
    const startEndLocationCont = document.createElement('div');
    startEndLocationCont.id = "start-end-location-content";
    startEndLocationCont.innerHTML = "From "+ capitalizeFirstLetter(start) + " To " + capitalizeFirstLetter(end);
    startEndLocation.appendChild(startEndLocationCont);

    //show user  
    const userCont = document.createElement('div');
    userCont.id = "user-content";
    userCont.innerHTML = "User: "+ user;
    userContainer.appendChild(userCont);

    //show contact  
    const contactCont = document.createElement('div');
    contactCont.id = "user-contact-content";
    contactCont.innerHTML = "Contact: "+ contact;
    userContact.appendChild(contactCont);


    //show seat  
    const seatCont = document.createElement('div');
    seatCont.id = "seat-content";
    if (data.hasOwnProperty("offer_routes_id")) {
        seatCont.innerHTML = "Seats available: "+ seatInt;
    } else {
        seatCont.innerHTML = "Seats requested: "+ seatInt;
    }
    seat.appendChild(seatCont);

    //show note  
    const noteCont = document.createElement('div');
    noteCont.id = "note-content";
    noteCont.innerHTML = "Note from the user: "+ noteStr;
    note.appendChild(noteCont);

    // show map
    let startUrl = 'http://api.positionstack.com/v1/forward?access_key=f85160d34d59ee7e59b0ac09f83ac9e6&query='+ start +',Germany'
    let endUrl = 'http://api.positionstack.com/v1/forward?access_key=f85160d34d59ee7e59b0ac09f83ac9e6&query='+ end +',Germany'
    const startRes = await fetch(startUrl);
    const startData = await startRes.json();
    const endRes = await fetch(endUrl);
    const endData = await endRes.json();

    let startLat = startData.data[0].latitude;
    let startLn = startData.data[0].longitude;
    let endLat = endData.data[0].latitude;
    let endLn = endData.data[0].longitude;

    getMap(startLat, startLn, endLat, endLn);

    right.style.height = left.offsetHeight + 5 + "px";
}

function getMap(latStart,lnStart,latEnd,lnEnd) {
    var map = L.map('map').setView([47.9959, 7.85222], 8);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    L.marker([latStart,lnStart]).addTo(map);
    L.marker([latEnd,lnEnd]).addTo(map);
}

function newPostRouting() {
    location.replace("../page_3/page_3.html");
}

function logoutRouting() {
    location.replace("../page_1/index.html");
}

function backRouting() {
    location.replace("../page_2/page_2.html");
}

function parseIdStr(idStr) {
    return idStr.split(':');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}