// Donor Login script (DonorLogin.html)

// Fictional demo account. A real system would check a database on the server.
const demoAccount = {
    id: "DN-1001",
    password: "donor1234"
};

// Checks whether the text looks like DN-1001
function isDonorIdFormat(id) {
    if (id.length !== 7) {
        return false;
    }

    if (id.slice(0, 3) !== "DN-") {
        return false;
    }

    // The last four characters must be digits
    for (let i = 3; i < 7; i++) {
        let ch = id[i];
        if (ch < "0" || ch > "9") {
            return false;
        }
    }

    return true;
}

// Runs when the Login button is clicked
function validateLogin() {
    const donorId = document.getElementById("DonorID").value;
    const password = document.getElementById("Password").value;

    const donorIdError = document.getElementById("DonorIDError");
    const passwordError = document.getElementById("PasswordError");
    const loginButton = document.getElementById("LoginButton");
    const successBox = document.getElementById("LoginSuccess");

    let isValid = true;

    // Start again from the normal state
    donorIdError.textContent = "";
    passwordError.textContent = "";
    successBox.style.display = "none";
    loginButton.style.display = "block";

    // Step 1: check the format of the Donor ID
    if (donorId === "") {
        donorIdError.textContent = "Donor ID is required.";
        isValid = false;
    } else if (isDonorIdFormat(donorId) === false) {
        donorIdError.textContent = "Donor ID must look like DN-1001.";
        isValid = false;
    }

    // Step 2: check the format of the password
    if (password === "") {
        passwordError.textContent = "Password is required.";
        isValid = false;
    } else if (password.length < 8) {
        passwordError.textContent = "Password must contain at least 8 characters.";
        isValid = false;
    }

    // Step 3: only when both formats are fine, compare with the demo account
    if (isValid) {
        if (donorId !== demoAccount.id) {
            donorIdError.textContent = "No demo account found for this Donor ID.";
            isValid = false;
        } else if (password !== demoAccount.password) {
            passwordError.textContent = "Incorrect password for this demo account.";
            isValid = false;
        }
    }

    // When every check passed, swap Login for Continue to Profile
    if (isValid) {
        loginButton.style.display = "none";
        successBox.style.display = "block";
    }

    // Always false: there is no server to send the form to
    return false;
}

// Runs when the Show Password checkbox changes
function togglePassword() {
    const passwordInput = document.getElementById("Password");
    const showBox = document.getElementById("ShowPassword");

    if (showBox.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

// Runs when the Forgot Password link is clicked
function toggleForgot() {
    const note = document.getElementById("ForgotNote");

    if (note.style.display === "block") {
        note.style.display = "none";
    } else {
        note.style.display = "block";
    }

    // false stops the link from jumping to the top of the page
    return false;
}