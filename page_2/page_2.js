const username = localStorage.getItem("username");
const header = document.querySelector('#left-header-text');
const rideProvider = document.querySelector('#ride_provider');
const rideRequester = document.querySelector('#ride_requester');
const content = document.querySelector('#left-content');
const contentTop = document.querySelector('#ride-share-content-top');
const contentBottom = document.querySelector('#ride-share-content-bottom');
const searchButton = document.querySelector('#search-button');
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const startPic = document.querySelector('#left-content-start-pic');
const loader = document.querySelector('#loader-container');
const logoutButton = document.querySelector('#logout-button');
const newPostButton = document.querySelector('.new-post-button');

loader.style.display="none";
header.innerHTML = "Hallo " + username + " welcome to DHBW RideShare!";
logoutButton.addEventListener('click',logoutRouting);
searchButton.addEventListener('click',searchRestulDisplay);
newPostButton.addEventListener('click',newPostRouting);

contentTop.style.display = "none";
contentBottom.style.display = "none";
startPic.onload = function(){
    right.style.height = left.offsetHeight + 5 + "px";
};

async function searchRestulDisplay(){
    loader.style.display="inline-block";
    startPic.style.display = "none";
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

    right.style.height = left.offsetHeight + 5 + "px";
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

// const container = document.querySelector('#container');

// const values = [1, 2, 3, 4, 5];
// text = ['Max', 'Lörrach', 'Freiburg'];

// for (let i = 0; i < values.length; i++) {
//     const newBox = document.createElement('div');
//     newBox.classList.add('box');
//     newBox.innerHTML = text[0] + " fährt von " + text[1] + " nach " + text[2] + "   Value: " + values[i];
//     container.appendChild(newBox);

//     newBox.addEventListener('click', function() {
//         this.innerHTML = text[0] + "fährt von " + text[1] + "nach " + text[2] + "Value: " + (parseInt(this.innerHTML.split(': ')[1]) + 1);
//     });
// }


// // Vprschlag von chat gpt
// const saveButton = document.querySelector('#save-button');
// const nameInput = document.querySelector('#name');
// const emailInput = document.querySelector('#email');
// const boxContainer = document.querySelector('#box-container');

// let data = [];

// saveButton.addEventListener('click', function() {
//     const name = nameInput.value;
//     const email = emailInput.value;

//     data.push({ name, email });

//     localStorage.setItem('data', JSON.stringify(data));

//     createBox(name, email);
// });


// // ToDo: data besser abspeichern und hier richtig aufrufen


// localStorage.setItem('data', JSON.stringify(data));


// const createBox = (name, email) => {
//     const newBox = document.createElement('div');
//     newBox.classList.add('box');
//     newBox.innerHTML = `Name: ${name}<br>Email: ${email}`;
//     boxContainer.appendChild(newBox);
// };

// const savedData = JSON.parse(localStorage.getItem('data')) || [];

// savedData.forEach(({ name, email }) => {
//     createBox(name, email);
// });