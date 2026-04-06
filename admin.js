import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.generate = function () {
    let count = document.getElementById("count").value;
    let qDiv = document.getElementById("questions");

    qDiv.innerHTML = "";

    for (let i = 1; i <= count; i++) {
        qDiv.innerHTML += `
        <div class="mb-2">
            Q${i}
            <select id="q${i}" class="form-control">
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
            </select>
        </div>`;
    }
};

window.save = async function () {
    let count = document.getElementById("count").value;
    let answers = {};

    for (let i = 1; i <= count; i++) {
        answers["q" + i] = document.getElementById("q" + i).value;
    }

    await addDoc(collection(db, "papers"), {
        answers: answers
    });

    alert("Saved to Firebase!");
};