const form = document.getElementById("loginForm");
let attemptsLeft = 3;
const adminId = document.getElementById("adminId");
const password = document.getElementById("password");
document.getElementById("togglePassword").addEventListener("click", function(){
  password.type = password.type === "password" ? "text" : "password";
  this.textContent = password.type === "password" ? "Show" : "Hide";
});
form.addEventListener("submit", function(e){
  e.preventDefault();
  if(attemptsLeft <= 0) return;
  const idOk = /^ADM-\d{4}$/.test(adminId.value.trim());
  const pass = password.value;
  const passOk = pass.length >= 8 && /[A-Z]/.test(pass) && /[a-z]/.test(pass) && /\d/.test(pass);
  document.getElementById("adminIdError").textContent = idOk ? "" : "Enter an ID in the format ADM-1001.";
  document.getElementById("passwordError").textContent = passOk ? "" : "Use at least 8 characters with uppercase, lowercase and a number.";
  if(!idOk || !passOk){ document.getElementById("loginMessage").textContent = "Please correct the highlighted fields."; return; }
  if(adminId.value.trim() === "ADM-1001" && pass === "Admin123"){
    document.getElementById("loginMessage").textContent = "Check passed. This demo does not provide real authentication or save data.";
    return;
  }
  attemptsLeft--;
  document.getElementById("attempts").textContent = attemptsLeft + (attemptsLeft === 1 ? " attempt" : " attempts") + " left.";
  document.getElementById("loginMessage").textContent = "Demo credentials did not match.";
  if(attemptsLeft === 0){
    document.getElementById("locked").classList.remove("hidden");
    document.getElementById("loginButton").disabled = true;
  }
});
