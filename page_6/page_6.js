const submit = document.querySelector('#submit');
submit.addEventListener('click',createAccount);

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
    localStorage.setItem("username",username);
    localStorage.setItem("password",password);
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
