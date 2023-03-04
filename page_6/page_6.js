const submit = document.querySelector('#submit');
submit.addEventListener('click',createAccount);
right.style.height = left.offsetHeight + 5 + "px";

async function createAccount(){
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    const res = await fetch('https://my-json-server.typicode.com/janlade/Moby/db');
    const data = await res.json();
    let user = data.user;
    for (let i = 0; i < user.length; i++) {
        if (username == user[i].name){
            showErrorMsg();
            return;
        }
    };
    alert("successfully created a new account!");
    routing();
}


function localStorageUserInfo(username,password){
    localStorage.setItem("username",username);
    localStorage.setItem("password",password);
}

function routing() {
    location.replace("../page_2/page_2.html");
}

function showErrorMsg(){
    document.getElementById("error-msg").style.opacity = 1;
}





// function saveLogin() {

//     this.username = document.getElementById("username").value;
//     if (window.localStorage.getItem(this.username)) {
//         window.alert("username already taken! Please choose another username!");
//         return;
//     }
//     window.alert(this.username);

//     var password = document.getElementById("password").value;
//     window.alert(password);

//     window.localStorage.setItem(this.username, password);
// }

// function Login() {
//     this.username = document.getElementById("username").value;
//     var saved_password = window.localStorage.getItem(this.username);
//     var password = document.getElementById("password").value;
//     if (saved_password == password) {
//         window.alert("Yuhu, you remembered your password!")
//         this.linking = "../page_2/page_2.html"
//     } else {
//         window.alert("wrong password! Please try again")
//     }
//     // Merke, welcher user angemeldet ist!
//     window.localStorage.setItem("user", this.username);
// }

