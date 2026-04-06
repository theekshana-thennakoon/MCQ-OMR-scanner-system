import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = function () {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
            alert("Login success");
            window.location = "admin.html";
        })
        .catch(err => alert(err.message));
};