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

right.style.height = left.offsetHeight + 5 + "px";

function saveData() {
    if(date.value == ""||time.value == ""||start.value == ""||end.value == ""||contact.value == "") {
        alert("Please complete the form before you submit!");
        return;
    } 
    let newPost
    if(type.value == "offer_routes_id"){
        newPost = {
            offer_routes_id: 5, 
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
            request_routes_id: 3, 
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






// following old script from leni

// var id = 0

// function saveAnfrage() {

//     this.id += 1;

//     var type = document.getElementById("type").value;
//     var seats = document.getElementById("seats").value;
//     var start = document.getElementById("start").value;
//     var ziel = document.getElementById("ziel").value;
//     var time_start = document.getElementById("time_start").value;
//     var time_end = document.getElementById("time_end").value;

//     var id = { 'id': this.id, 'Typ': type, 'Sitze': seats, 'Start': start, 'Ziel': ziel, 'Startzeit': time_start, 'Endzeit': time_end };
//     window.alert(id)
//     var username = window.localStorage.getItem("user");
//     // Put the object into storage
//     localStorage.setItem(username, JSON.stringify(id));
//     console.log(id)



//     // Retrieve the object from storage
//     var retrievedObject = localStorage.getItem(id);

//     console.log(JSON.parse(retrievedObject));

// }






// // Put the object into storage
// localStorage.setItem('testObject', JSON.stringify(testObject));

// // Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');

// console.log('retrievedObject: ', JSON.parse(retrievedObject));