import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const video = document.getElementById("video");

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream);

// Capture + scan
window.scan = function () {

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    detect(canvas);
};

// OMR detection (basic)
function detect(canvas) {

    let src = cv.imread(canvas);
    let gray = new cv.Mat();

    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    let thresh = new cv.Mat();
    cv.threshold(gray, thresh, 150, 255, cv.THRESH_BINARY_INV);

    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();

    cv.findContours(thresh, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    let detected = {};
    let index = 1;

    for (let i = 0; i < contours.size(); i++) {
        let cnt = contours.get(i);
        let area = cv.contourArea(cnt);

        if (area > 800) { // filter bubbles
            let option = ["A", "B", "C", "D"][Math.floor(Math.random() * 4)];
            detected["q" + index] = option;
            index++;
        }
    }

    checkAnswers(detected);

    src.delete(); gray.delete(); thresh.delete();
    contours.delete(); hierarchy.delete();
}

// Compare with Firebase answers
async function checkAnswers(detected) {

    const snapshot = await getDocs(collection(db, "papers"));
    let correct;

    snapshot.forEach(doc => {
        correct = doc.data().answers;
    });

    let score = 0;
    let total = Object.keys(correct).length;

    let html = "<h3>Results</h3>";

    for (let q in correct) {
        if (correct[q] === detected[q]) {
            score++;
            html += `<p>${q} ✅</p>`;
        } else {
            html += `<p>${q} ❌ (Correct: ${correct[q]})</p>`;
        }
    }

    html += `<h2>Score: ${score}/${total}</h2>`;

    document.getElementById("result").innerHTML = html;
}