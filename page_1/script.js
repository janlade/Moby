var username = ""
var linking = "../page_1/index.html"

function saveLogin() {

    this.username = document.getElementById("username").value;
    if (window.localStorage.getItem(this.username)) {
        window.alert("username already taken! Please choose another username!");
        return;
    }
    window.alert(this.username);

    var password = document.getElementById("password").value;
    window.alert(password);

    window.localStorage.setItem(this.username, password);
}

function Login() {
    this.username = document.getElementById("username").value;
    var saved_password = window.localStorage.getItem(this.username);
    var password = document.getElementById("password").value;
    if (saved_password == password) {
        window.alert("Yuhu, you remembered your password!")
        this.linking = "../page_2/page_2.html"
    } else {
        window.alert("wrong password! Please try again")
    }
    // Merke, welcher user angemeldet ist!
    window.localStorage.setItem("user", this.username);
}

function Routing() {
    location.replace(window.location.href.replace("/page_1/index.html", this.linking));

}