var id = 0

function saveAnfrage() {

    this.id += 1;

    var type = document.getElementById("type").value;
    var seats = document.getElementById("seats").value;
    var start = document.getElementById("start").value;
    var ziel = document.getElementById("ziel").value;
    var time_start = document.getElementById("time_start").value;
    var time_end = document.getElementById("time_end").value;

    var id = { 'id': this.id, 'Typ': type, 'Sitze': seats, 'Start': start, 'Ziel': ziel, 'Startzeit': time_start, 'Endzeit': time_end };
    window.alert(id)
    var username = window.localStorage.getItem("user");
    // Put the object into storage
    localStorage.setItem(username, JSON.stringify(id));
    console.log(id)



    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem(id);

    console.log(JSON.parse(retrievedObject));

}






// Put the object into storage
localStorage.setItem('testObject', JSON.stringify(testObject));

// Retrieve the object from storage
var retrievedObject = localStorage.getItem('testObject');

console.log('retrievedObject: ', JSON.parse(retrievedObject));