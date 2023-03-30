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
const routeInfo = document.querySelector('#route-info');


loadContent(routeType,routeId);
header.innerHTML = "Hallo " + username + " welcome to DHBW RideShare!";
logoutButton.addEventListener('click',logoutRouting);
backButton.addEventListener('click',backRouting);
newPostButton.addEventListener('click',newPostRouting);




async function loadContent(routeType,routeId) {
    const res = await fetch('https://my-json-server.typicode.com/janlade/Moby/db');
    const data = await res.json();
    let offerRoutes = data.offer_routes;
    let requestRoutes = data.request_routes;
    let date;
    let time;
    let start;
    let end;
    let user;
    let contact;
    let seatInt;
    let noteStr;

    if (routeType == "offer_routes_id") {
        for (let i = 0; i < offerRoutes.length; i++) {
            if(offerRoutes[i].offer_routes_id == routeId) {
                date = offerRoutes[i].date;
                time = offerRoutes[i].time;
                start = offerRoutes[i].start;
                end = offerRoutes[i].end;
                user = offerRoutes[i].user;
                contact = offerRoutes[i].contact;
                seatInt = offerRoutes[i].seats;
                noteStr = offerRoutes[i].note;
            }
        }
    } else if (routeType == "request_routes_id") {
        for (let i = 0; i < requestRoutes.length; i++) {
            if(requestRoutes[i].request_routes_id == routeId) {
                date = requestRoutes[i].date;
                time = requestRoutes[i].time;
                start = requestRoutes[i].start;
                end = requestRoutes[i].end;
                user = requestRoutes[i].user;
                contact = requestRoutes[i].contact;
                seatInt = requestRoutes[i].seats;
                noteStr = requestRoutes[i].note;
            }
        }
    } else {
        leftContent.innerHTML="sorry, something went wrong..."
        return 
    }

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
    if (routeType == "offer_routes_id"){
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
    let startUrl = 'https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf6248f43db33892644b6d808f1af271890c4e&text='+start+'&boundary.circle.lon=7.6691&boundary.circle.lat=47.6168&boundary.circle.radius=300&boundary.country=DE&sources=openstreetmap&size=1';
    let endUrl = 'https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf6248f43db33892644b6d808f1af271890c4e&text='+end+'&boundary.circle.lon=7.6691&boundary.circle.lat=47.6168&boundary.circle.radius=300&boundary.country=DE&sources=openstreetmap&size=1';

    const startRes = await fetch(startUrl);
    const startData = await startRes.json();
    const endRes = await fetch(endUrl);
    const endData = await endRes.json();

    let startLat = startData.features[0].geometry.coordinates[1];
    let startLn = startData.features[0].geometry.coordinates[0];
    let endLat = endData.features[0].geometry.coordinates[1];
    let endLn = endData.features[0].geometry.coordinates[0];

    let routeUrl = 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248f43db33892644b6d808f1af271890c4e&start='+startLn+','+startLat+'&end='+endLn+','+endLat;
    const routeRes = await fetch(routeUrl);
    const routeData = await routeRes.json();
    let route = routeData.features[0].geometry.coordinates;
    let distance = (routeData.features[0].properties.summary.distance)/1000;
    let duration = routeData.features[0].properties.summary.duration;
    swapElementPosition(route);
    getMap(startLat, startLn, endLat, endLn, route);

    //show route-info
    let durationH = duration/3600
    routeInfo.innerHTML = "This route is " + distance.toFixed(2) + " km. It will probably takes you " + durationH.toFixed(2) + " h to arrive " + capitalizeFirstLetter(end);
}

function getMap(latStart,lnStart,latEnd,lnEnd,route) {
    var map = L.map('map').setView([latStart, lnStart], 9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const path = L.polyline(route, {"color": "red"}).addTo(map);
    L.marker([latStart,lnStart]).addTo(map);
    L.marker([latEnd,lnEnd]).addTo(map);
}

function swapElementPosition(route) {
    for (let coordinates of route) {
        coordinates = coordinates.reverse()
    }
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