function toggleOrganisationField() {

    const requesterType = document.getElementById("requesterType").value;
    const organisationRow = document.getElementById("organisationRow");
    const organisationName = document.getElementById("organisationName");

    if (requesterType === "Hospital staff" ||
        requesterType === "Organisation") {

        organisationRow.hidden = false;

    } else {

        organisationRow.hidden = true;
        organisationName.value = "";
        document.getElementById("organisationNameError").textContent = "";

    }
}


function checkPasswordMatch() {

    const password = document.getElementById("requesterPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const matchMessage = document.getElementById("passwordMatchMessage");

    if (confirmPassword === "") {

        matchMessage.textContent = "";

    } else if (password === confirmPassword) {

        matchMessage.textContent = "Passwords match.";
        matchMessage.style.color = "#237A4B";

    } else {

        matchMessage.textContent = "Passwords do not match.";
        matchMessage.style.color = "#B4233B";

    }
}


function clearRequesterErrors() {

    const errorIds = [
        "requesterNameError",
        "requesterEmailError",
        "requesterPhoneError",
        "requesterTypeError",
        "organisationNameError",
        "requesterCityError",
        "requesterAddressError",
        "requesterUsernameError",
        "requesterPasswordError",
        "confirmPasswordError",
        "termsCheckboxError"
    ];

    for (let i = 0; i < errorIds.length; i++) {

        document.getElementById(errorIds[i]).textContent = "";

    }

}


function validateRequesterRegister() {

    clearRequesterErrors();

    let isValid = true;

    const name = document.getElementById("requesterName").value.trim();

    const email = document.getElementById("requesterEmail").value.trim();

    const phone = document.getElementById("requesterPhone").value.trim();

    const requesterType = document.getElementById("requesterType").value;

    const organisationName = document.getElementById("organisationName").value.trim();

    const city = document.getElementById("requesterCity").value;

    const address = document.getElementById("requesterAddress").value.trim();

    const username = document.getElementById("requesterUsername").value.trim();

    const password = document.getElementById("requesterPassword").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    const terms = document.getElementById("termsCheckbox").checked;


    if (name === "") {

        document.getElementById("requesterNameError").textContent =
            "Name is required.";

        isValid = false;

    }


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        document.getElementById("requesterEmailError").textContent =
            "Email is required.";

        isValid = false;

    } else if (!emailPattern.test(email)) {

        document.getElementById("requesterEmailError").textContent =
            "Enter a valid email address.";

        isValid = false;

    }


    const phonePattern = /^[0-9]{11}$/;

    if (phone === "") {

        document.getElementById("requesterPhoneError").textContent =
            "Phone number is required.";

        isValid = false;

    } else if (!phonePattern.test(phone)) {

        document.getElementById("requesterPhoneError").textContent =
            "Enter a valid 11-digit phone number.";

        isValid = false;

    }


    if (requesterType === "") {

        document.getElementById("requesterTypeError").textContent =
            "Please select a requester type.";

        isValid = false;

    }

    if (requesterType === "Hospital staff" ||
        requesterType === "Organisation") {

        if (organisationName === "") {

            document.getElementById("organisationNameError").textContent =
                "Organisation name is required.";

            isValid = false;

        }

    }


    if (city === "") {

        document.getElementById("requesterCityError").textContent =
            "Please select your city.";

        isValid = false;

    }


    if (address === "") {

        document.getElementById("requesterAddressError").textContent =
            "Address is required.";

        isValid = false;

    }


    if (username === "") {

        document.getElementById("requesterUsernameError").textContent =
            "Username is required.";

        isValid = false;

    }


    if (password === "") {

        document.getElementById("requesterPasswordError").textContent =
            "Password is required.";

        isValid = false;

    } else if (password.length < 8) {

        document.getElementById("requesterPasswordError").textContent =
            "Password must contain at least 8 characters.";

        isValid = false;

    }


    if (confirmPassword === "") {

        document.getElementById("confirmPasswordError").textContent =
            "Please confirm your password.";

        isValid = false;

    } else if (password !== confirmPassword) {

        document.getElementById("confirmPasswordError").textContent =
            "Passwords do not match.";

        isValid = false;

    }


    if (!terms) {

        document.getElementById("termsCheckboxError").textContent =
            "You must agree to the terms and conditions.";

        isValid = false;

    }


    if (!isValid) {

        return false;

    }


   
    showRequesterSummary(
        name,
        email,
        phone,
        requesterType,
        organisationName,
        city,
        address,
        username
    );

    return false;

}



function showRequesterSummary(
    name,
    email,
    phone,
    requesterType,
    organisationName,
    city,
    address,
    username
) {

    const form = document.getElementById("requesterRegisterForm");

    const successMessage = document.getElementById("requesterRegisterMessage");

    const summary = document.getElementById("requesterSummary");

    const summaryDetails = document.getElementById("requesterSummaryDetails");


    
    form.hidden = true;


    successMessage.textContent =
        "Check passed. This demo does not save data yet.";

    successMessage.hidden = false;


    
    summaryDetails.textContent = "";


    
    const details = [
        ["Full Name", name],
        ["Email", email],
        ["Phone", phone],
        ["Requester Type", requesterType],
        ["City", city],
        ["Address", address],
        ["Username", username]
    ];


   
    if (requesterType === "Hospital staff" ||
        requesterType === "Organisation") {

        details.splice(4, 0, ["Organisation Name", organisationName]);

    }


    
    for (let i = 0; i < details.length; i++) {

        const paragraph = document.createElement("p");

        const label = document.createElement("strong");

        label.textContent = details[i][0] + ": ";

        paragraph.appendChild(label);

        paragraph.appendChild(
            document.createTextNode(details[i][1])
        );

        summaryDetails.appendChild(paragraph);

    }


    summary.hidden = false;

}


document.getElementById("requesterRegisterForm").addEventListener("reset", function () {

    clearRequesterErrors();

    document.getElementById("passwordMatchMessage").textContent = "";

    document.getElementById("requesterRegisterMessage").hidden = true;

    document.getElementById("requesterSummary").hidden = true;

    document.getElementById("organisationRow").hidden = true;

});
