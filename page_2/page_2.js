const username = localStorage.getItem("username");
const header = document.querySelector('#left-header-text');
const rideProvider = document.querySelector('#ride-provider');
const rideRequester = document.querySelector('#ride-requester');
const content = document.querySelector('#left-content');
const contentTop = document.querySelector('#ride-share-content-top');
const contentBottom = document.querySelector('#ride-share-content-bottom');
const searchButton = document.querySelector('#search-button');
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const startPicContainer = document.querySelector('#start-pic');
const startPic = document.querySelector('#left-content-start-pic');
const loader = document.querySelector('#loader-container');
const logoutButton = document.querySelector('#logout-button');
const newPostButton = document.querySelector('.new-post-button');

loader.style.display="none";
header.innerHTML = "Hallo " + username + " welcome to DHBW RideShare!";
logoutButton.addEventListener('click',logoutRouting);
searchButton.addEventListener('click',searchRestulDisplay);
newPostButton.addEventListener('click',newPostRouting);

if(localStorage.getItem("IfPage4")){
    startPic.style.display="none";
    let newPost = JSON.parse(localStorage.getItem("newPost"));

    let date = newPost.date;
    let time = newPost.time;
    let start = newPost.start;
    let end = newPost.end;
    let user = newPost.user;

    const newRoute = document.createElement('div');
    newRoute.classList.add('box');
    newRoute.innerHTML = user + " will drive from " + capitalizeFirstLetter(start) + " to " + capitalizeFirstLetter(end) + "<br>" + "<br> On: " + date + "  <B>" + time + "</B>";
    newRoute.style.margin="200px";
    startPicContainer.appendChild(newRoute);
}

contentTop.style.display = "none";
contentBottom.style.display = "none";

async function searchRestulDisplay(){
    loader.style.display="inline-block";
    startPicContainer.style.display = "none";
    contentTop.style.display = "flex";
    contentBottom.style.display = "flex";
    let startLocation = document.querySelector('#start-location').value.toLowerCase();
    let endLocation = document.querySelector('#end-location').value.toLowerCase();
    let date = document.querySelector('#date').value;
    const res = await fetch('https://my-json-server.typicode.com/janlade/Moby/db');
    const data = await res.json();
    let offerRoutes = data.offer_routes;
    let requestRoutes = data.request_routes;

    let offerRoutesChecker = true;
    let requestRoutesChecker = true;

    while (rideProvider.hasChildNodes()) {
        rideProvider.removeChild(rideProvider.firstChild);
    }
    while (rideRequester.hasChildNodes()) {
        rideRequester.removeChild(rideRequester.firstChild);
    }

    for (let i = 0; i < offerRoutes.length; i++) {
        if(offerRoutes[i].start==startLocation && offerRoutes[i].end==endLocation && offerRoutes[i].date==date){
            let routeId = offerRoutes[i].offer_routes_id;
            const newRoute = document.createElement('div');
            newRoute.classList.add('box');
            newRoute.innerHTML = offerRoutes[i].user + " will drive from " + capitalizeFirstLetter(offerRoutes[i].start) + " to " + capitalizeFirstLetter(offerRoutes[i].end) + "<br>" + "<br> On: " + offerRoutes[i].date + "  <B>" + offerRoutes[i].time + "</B>";
            rideProvider.appendChild(newRoute);
            const detail = document.createElement('button');
            detail.classList.add('route-detial-button');
            detail.innerText = "Detail";
            detail.id = "offer_routes_id:"+routeId;
            newRoute.appendChild(detail);
            detail.addEventListener('click',detailRouting);
            offerRoutesChecker = false;
        }
    }

    if (offerRoutesChecker === true){
        rideProvider.innerHTML="Sorry, no routes found :(  <br> Would you like to post a new offer ?";
        rideProvider.style.margin = "5%";
        const msg = document.createElement('button');
        msg.classList.add('new-post-button');
        msg.innerHTML = "New Post";
        msg.addEventListener('click',newPostRouting);
        rideProvider.appendChild(msg);
        console.log(rideProvider)
    }

    for (let i = 0; i < requestRoutes.length; i++) {
        if(requestRoutes[i].start==startLocation && requestRoutes[i].end==endLocation && requestRoutes[i].date==date){
            let routeId = requestRoutes[i].request_routes_id;
            const newRoute = document.createElement('div');
            newRoute.classList.add('box');
            newRoute.innerHTML = requestRoutes[i].user + " would like to travel from " + capitalizeFirstLetter(requestRoutes[i].start) + " to " + capitalizeFirstLetter(requestRoutes[i].end) + "<br>" + "<br> On: " + requestRoutes[i].date + "  <B>" + requestRoutes[i].time + "</B>";
            rideRequester.appendChild(newRoute);
            const detail = document.createElement('button');
            detail.classList.add('route-detial-button');
            detail.innerText = "Detail";
            detail.id = "request_routes_id:"+routeId;
            newRoute.appendChild(detail);
            detail.addEventListener('click',detailRouting);
            requestRoutesChecker = false;
        }
    }

    if (requestRoutesChecker === true){
        rideRequester.innerHTML="Sorry, no routes found :(  <br> Would you like to post a new request ?";
        rideRequester.style.margin = "5%";
        const msg = document.createElement('button');
        msg.classList.add('new-post-button');
        msg.innerHTML = "New Post";
        msg.addEventListener('click',newPostRouting);
        rideRequester.appendChild(msg);
    }
    loader.style.display="none";
}

function detailRouting() {
    localStorage.setItem("routeId",this.id)
    location.replace("../page_5/page_5.html");
}

function logoutRouting() {
    location.replace("../page_1/index.html");
}

function newPostRouting() {
    location.replace("../page_3/page_3.html");
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}