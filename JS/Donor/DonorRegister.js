// Donor Registration script (DonorRegister.html)

// ---------- Small helper functions ----------

// Turns 5 into "05" so dates can be compared as text
function twoDigits(number) {
    if (number < 10) {
        return "0" + number;
    }
    return "" + number;
}

// Today's date as text in the same form as a date input: 2026-11-13
function getTodayText() {
    const today = new Date();
    return today.getFullYear() + "-" + twoDigits(today.getMonth() + 1) + "-" + twoDigits(today.getDate());
}

// Works out the age from a date of birth such as "2001-05-20"
function calculateAge(dobText) {
    const today = new Date();
    const birthYear = Number(dobText.slice(0, 4));
    const birthMonth = Number(dobText.slice(5, 7));
    const birthDay = Number(dobText.slice(8, 10));

    let age = today.getFullYear() - birthYear;
    const thisMonth = today.getMonth() + 1;

    // The birthday has not come yet this year
    if (thisMonth < birthMonth || (thisMonth === birthMonth && today.getDate() < birthDay)) {
        age = age - 1;
    }

    return age;
}

// Counts the digits in a text
function countDigits(text) {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] >= "0" && text[i] <= "9") {
            count++;
        }
    }
    return count;
}

// Counts the letters in a text
function countLetters(text) {
    const lower = text.toLowerCase();
    let count = 0;
    for (let i = 0; i < lower.length; i++) {
        if (lower[i] >= "a" && lower[i] <= "z") {
            count++;
        }
    }
    return count;
}

// A simple email check: something@something.something with no spaces
function isValidEmail(email) {
    const atPosition = email.indexOf("@");
    const dotPosition = email.lastIndexOf(".");

    if (email.indexOf(" ") !== -1) {
        return false;
    }
    if (atPosition < 1) {
        return false;
    }
    if (dotPosition < atPosition + 2) {
        return false;
    }
    if (dotPosition === email.length - 1) {
        return false;
    }
    return true;
}

// A phone number must be 11 digits and start with 01
function isValidPhone(phone) {
    if (phone.length !== 11) {
        return false;
    }
    if (phone.slice(0, 2) !== "01") {
        return false;
    }
    if (countDigits(phone) !== 11) {
        return false;
    }
    return true;
}

// Returns the chosen gender, or "" when none is chosen
function getGender() {
    if (document.getElementById("GenderMale").checked) {
        return "Male";
    }
    if (document.getElementById("GenderFemale").checked) {
        return "Female";
    }
    if (document.getElementById("GenderOther").checked) {
        return "Other";
    }
    return "";
}

// Returns an array of the ticked contact methods
function getContactMethods() {
    let methods = [];

    if (document.getElementById("ContactEmail").checked) {
        methods.push("Email");
    }
    if (document.getElementById("ContactPhone").checked) {
        methods.push("Phone Call");
    }
    if (document.getElementById("ContactSMS").checked) {
        methods.push("SMS");
    }

    return methods;
}

// Writes an error message under a field
function showError(errorId, text) {
    document.getElementById(errorId).textContent = text;
}

// Empties every error paragraph
function clearErrors() {
    const errorIds = [
        "FullNameError", "DOBError", "BloodGroupError", "GenderError",
        "EmailError", "PhoneError", "CityError", "LastDonationError",
        "AddressError", "ContactMethodError", "UsernameError",
        "PasswordError", "ConfirmPasswordError", "EligibilityError"
    ];

    for (let i = 0; i < errorIds.length; i++) {
        document.getElementById(errorIds[i]).textContent = "";
    }
}

// ---------- Live changes while the donor fills in the form ----------

// Runs when the date of birth changes
function showAge() {
    const dob = document.getElementById("DOB").value;
    const ageDisplay = document.getElementById("AgeDisplay");

    if (dob === "") {
        ageDisplay.textContent = "";
        return;
    }

    const age = calculateAge(dob);

    if (age < 0) {
        ageDisplay.textContent = "Date of birth cannot be in the future.";
    } else {
        ageDisplay.textContent = "Age: " + age + " years";
    }
}

// Runs while the donor types a password
function checkStrength() {
    const password = document.getElementById("Password").value;
    const strength = document.getElementById("PasswordStrength");

    const letters = countLetters(password);
    const digits = countDigits(password);
    const others = password.length - letters - digits;

    if (password === "") {
        strength.textContent = "";
    } else if (password.length < 8 || letters === 0 || digits === 0) {
        strength.textContent = "Password Strength: Weak";
        strength.style.color = "#B4233B";
    } else if (password.length >= 10 && others > 0) {
        strength.textContent = "Password Strength: Strong";
        strength.style.color = "#237A4B";
    } else {
        strength.textContent = "Password Strength: Medium";
        strength.style.color = "#9A6400";
    }

    checkConfirm();
}

// Runs while the donor types in Confirm Password
function checkConfirm() {
    const password = document.getElementById("Password").value;
    const confirm = document.getElementById("ConfirmPassword").value;

    if (confirm !== "" && confirm !== password) {
        showError("ConfirmPasswordError", "Passwords do not match.");
    } else {
        showError("ConfirmPasswordError", "");
    }
}

// Runs when the Show Passwords checkbox changes
function togglePasswords() {
    const showBox = document.getElementById("ShowPasswords");
    const password = document.getElementById("Password");
    const confirm = document.getElementById("ConfirmPassword");

    if (showBox.checked) {
        password.type = "text";
        confirm.type = "text";
    } else {
        password.type = "password";
        confirm.type = "password";
    }
}

// ---------- Validation when Register as Donor is clicked ----------

function validateRegister() {
    const fullName = document.getElementById("FullName").value;
    const dob = document.getElementById("DOB").value;
    const bloodGroup = document.getElementById("BloodGroup").value;
    const gender = getGender();
    const email = document.getElementById("Email").value;
    const phone = document.getElementById("Phone").value;
    const city = document.getElementById("City").value;
    const lastDonation = document.getElementById("LastDonation").value;
    const address = document.getElementById("Address").value;
    const contactMethods = getContactMethods();
    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;
    const confirm = document.getElementById("ConfirmPassword").value;
    const eligibility = document.getElementById("Eligibility").checked;

    let isValid = true;
    let age = 0;

    clearErrors();

    // Personal Information
    if (fullName === "") {
        showError("FullNameError", "Full name is required.");
        isValid = false;
    } else if (fullName.length < 3) {
        showError("FullNameError", "Full name must contain at least 3 characters.");
        isValid = false;
    }

    if (dob === "") {
        showError("DOBError", "Date of birth is required.");
        isValid = false;
    } else {
        age = calculateAge(dob);
        if (age < 18) {
            showError("DOBError", "You must be at least 18 years old to register.");
            isValid = false;
        }
    }

    if (bloodGroup === "") {
        showError("BloodGroupError", "Please select a blood group.");
        isValid = false;
    }

    if (gender === "") {
        showError("GenderError", "Please select a gender.");
        isValid = false;
    }

    // Contact Information
    if (email === "") {
        showError("EmailError", "Email is required.");
        isValid = false;
    } else if (isValidEmail(email) === false) {
        showError("EmailError", "Please enter a valid email, such as name@example.com.");
        isValid = false;
    }

    if (phone === "") {
        showError("PhoneError", "Phone number is required.");
        isValid = false;
    } else if (isValidPhone(phone) === false) {
        showError("PhoneError", "Phone number must be 11 digits and start with 01.");
        isValid = false;
    }

    if (city === "") {
        showError("CityError", "Please select a city.");
        isValid = false;
    }

    if (lastDonation !== "" && lastDonation > getTodayText()) {
        showError("LastDonationError", "Last donation date cannot be in the future.");
        isValid = false;
    }

    if (address === "") {
        showError("AddressError", "Address is required.");
        isValid = false;
    }

    if (contactMethods.length === 0) {
        showError("ContactMethodError", "Please select at least one contact method.");
        isValid = false;
    }

    // Account Information
    if (username === "") {
        showError("UsernameError", "Username is required.");
        isValid = false;
    } else if (username.length < 4) {
        showError("UsernameError", "Username must contain at least 4 characters.");
        isValid = false;
    }

    if (password === "") {
        showError("PasswordError", "Password is required.");
        isValid = false;
    } else if (password.length < 8 || countLetters(password) === 0 || countDigits(password) === 0) {
        showError("PasswordError", "Password must contain at least 8 characters, with letters and numbers.");
        isValid = false;
    }

    if (confirm === "") {
        showError("ConfirmPasswordError", "Please confirm your password.");
        isValid = false;
    } else if (confirm !== password) {
        showError("ConfirmPasswordError", "Passwords do not match.");
        isValid = false;
    }

    if (eligibility === false) {
        showError("EligibilityError", "Please tick this box to continue.");
        isValid = false;
    }

    // When every check passed, show the summary instead of the form
    if (isValid) {
        document.getElementById("SummaryName").textContent = fullName;
        document.getElementById("SummaryAge").textContent = age + " years";
        document.getElementById("SummaryGender").textContent = gender;
        document.getElementById("SummaryBloodGroup").textContent = bloodGroup;
        document.getElementById("SummaryCity").textContent = city;
        document.getElementById("SummaryEmail").textContent = email;
        document.getElementById("SummaryPhone").textContent = phone;
        document.getElementById("SummaryContact").textContent = contactMethods.join(", ");
        document.getElementById("SummaryUsername").textContent = username;

        document.getElementById("RegisterCard").style.display = "none";
        document.getElementById("RegisterSummary").style.display = "block";
    }

    // Always false: there is no server to send the form to
    return false;
}