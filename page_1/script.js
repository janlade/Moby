const login = document.querySelector('#login');
login.addEventListener('click',loginCheck);

async function loginCheck(){
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    localStorageUserInfo(username,password);
    const res = await fetch('https://my-json-server.typicode.com/janlade/Moby/db');
    const data = await res.json();
    let user = data.user;
    let checker = true;

    for (let i = 0; i < user.length; i++) {
        if (username == user[i].name){
            if (password == user[i].password){
                checker = false;
                routing();
            }
        }
    };
    if (checker===true){
        showErrorMsg();
    };
}


function localStorageUserInfo(username,password){
    localStorage.setItem("username",username);
    localStorage.setItem("password",password);
}

function routing() {
    location.replace("../page_2/page_2.html");
}

function showErrorMsg(){
    document.getElementById("login-error-msg").style.opacity = 1;
}
