
function changeLoginMethod() {
    const selectedMethod = document.querySelector(
        'input[name="loginMethod"]:checked'
    ).value;

    const loginLabel = document.getElementById("loginInputLabel");
    const loginInput = document.getElementById("loginInput");

    if (selectedMethod === "email") {
        loginLabel.textContent = "Email Address:";
        loginInput.placeholder = "example@example.com";
    } else {
        loginLabel.textContent = "Phone Number:";
        loginInput.placeholder = "01XXXXXXXXX";
    }

    loginInput.value = "";

    document.getElementById("loginInputError").textContent = "";
    document.getElementById("loginPasswordError").textContent = "";
    document.getElementById("requesterLoginMessage").textContent = "";

    document.getElementById("continueButton").hidden = true;
}

function validateRequesterLogin() {
    const selectedMethod = document.querySelector(
        'input[name="loginMethod"]:checked'
    ).value;

    const loginInput = document.getElementById("loginInput").value.trim();
    const password = document.getElementById("loginPassword").value;

    const loginInputError = document.getElementById("loginInputError");
    const loginPasswordError = document.getElementById("loginPasswordError");
    const loginMessage = document.getElementById("requesterLoginMessage");
    const continueButton = document.getElementById("continueButton");

    loginInputError.textContent = "";
    loginPasswordError.textContent = "";
    loginMessage.textContent = "";
    continueButton.hidden = true;

    let isValid = true;

    if (loginInput === "") {
        loginInputError.textContent = "Please enter your email or phone number.";
        isValid = false;
    } else if (selectedMethod === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(loginInput)) {
            loginInputError.textContent = "Please enter a valid email address.";
            isValid = false;
        }
    } else {
        const phonePattern = /^[0-9]{11}$/;

        if (!phonePattern.test(loginInput)) {
            loginInputError.textContent = "Phone number must contain exactly 11 digits.";
            isValid = false;
        }
    }

    if (password === "") {
        loginPasswordError.textContent = "Please enter your password.";
        isValid = false;
    } else if (password.length < 8) {
        loginPasswordError.textContent = "Password must be at least 8 characters.";
        isValid = false;
    }

    if (isValid) {
        continueButton.hidden = false;
        loginMessage.textContent = "Input format is valid. Click Continue.";
    }

    return false;
}

function continueRequesterLogin() {
    const loginMessage = document.getElementById("requesterLoginMessage");

    loginMessage.textContent =
        "Check passed. This demo does not save data yet.";

    document.getElementById("continueButton").hidden = true;
}
