"use strict";
let mathTotal = 0;
function newMathQuestion() {
  const first = Math.floor(Math.random() * 8) + 2;
  const second = Math.floor(Math.random() * 8) + 2;
  mathTotal = first + second;
  showText("mathQuestion", `What is ${first} + ${second}?`);
  document.getElementById("mathAnswer").value = "";
  showText("mathAnswerError", "");
}
document.getElementById("newQuestion").addEventListener("click", newMathQuestion);
document.getElementById("loginForm").addEventListener("submit", event => {
  event.preventDefault();
  const id = document.getElementById("staffId").value.trim();
  const pass = document.getElementById("password").value;
  const centre = document.getElementById("centre").value;
  const answer = document.getElementById("mathAnswer").value;
  const validId = /^CO-\d{4}$/.test(id);
  const validPass = pass.length >= 8;
  showText("staffIdError", validId ? "" : "Use this format: CO-2001.");
  showText("passwordError", validPass ? "" : "Password must be at least 8 characters.");
  showText("centreError", centre ? "" : "Choose a centre.");
  const validMath = Number(answer) === mathTotal;
  showText("mathAnswerError", validMath ? "" : "That answer is not correct. Try the new question.");
  const ok = validId && validPass && centre && validMath;
 
if (ok) {
    sessionStorage.setItem("coordinatorDemoLogin", "true");
    window.location.href = "CoordinatorDashboard.html";
} else {
    showText("loginMessage", "Please fix the fields above.");
}

  if (!validMath) newMathQuestion();
});
newMathQuestion();
