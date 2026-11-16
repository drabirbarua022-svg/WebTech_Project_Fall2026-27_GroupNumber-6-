
let requestNumber = 5001;

function changeUrgency() {
    const urgency = document.getElementById("urgency").value;
    const banner = document.getElementById("urgencyBanner");

    if (urgency === "Normal") {
        banner.textContent = "Normal: Your request will be processed normally.";
        banner.className = "message";
    } else if (urgency === "Urgent") {
        banner.textContent = "Urgent: Your request needs attention soon.";
        banner.className = "message warning";
    } else if (urgency === "Emergency") {
        banner.textContent = "Emergency: Your request needs immediate attention.";
        banner.className = "message error";
    } else {
        banner.textContent = "Please select the urgency of your request.";
        banner.className = "message";
    }
}

function updateNotesCounter() {
    const notes = document.getElementById("requestNotes").value;
    const counter = document.getElementById("notesCounter");

    counter.textContent = notes.length + "/200 characters";

    if (notes.length >= 180) {
        counter.className = "error";
    } else {
        counter.className = "";
    }
}

function validateBloodRequest() {
    const patientName = document.getElementById("patientName").value.trim();
    const bloodGroup = document.getElementById("bloodGroup").value;
    const units = document.getElementById("units").value;
    const hospitalName = document.getElementById("hospitalName").value.trim();
    const city = document.getElementById("requestCity").value;
    const dateNeeded = document.getElementById("dateNeeded").value;
    const urgency = document.getElementById("urgency").value;
    const contactPhone = document.getElementById("contactPhone").value.trim();
    const consent = document.getElementById("requestConsent").checked;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = dateNeeded ? new Date(dateNeeded + "T00:00:00") : null;

    const maximumDate = new Date(today);
    maximumDate.setDate(maximumDate.getDate() + 30);

    const errorIds = [
        "patientNameError",
        "bloodGroupError",
        "unitsError",
        "hospitalNameError",
        "requestCityError",
        "dateNeededError",
        "urgencyError",
        "contactPhoneError",
        "requestConsentError"
    ];

    for (let i = 0; i < errorIds.length; i++) {
        document.getElementById(errorIds[i]).textContent = "";
    }

    document.getElementById("requestMessage").textContent = "";

    let isValid = true;

    if (patientName === "") {
        document.getElementById("patientNameError").textContent =
            "Please enter the patient reference name.";
        isValid = false;
    }

    if (bloodGroup === "") {
        document.getElementById("bloodGroupError").textContent =
            "Please select a blood group.";
        isValid = false;
    }

    if (units === "" || Number(units) < 1 || Number(units) > 6 ||
        !Number.isInteger(Number(units))) {
        document.getElementById("unitsError").textContent =
            "Units must be between 1 and 6.";
        isValid = false;
    }

    if (hospitalName === "") {
        document.getElementById("hospitalNameError").textContent =
            "Please enter the hospital name.";
        isValid = false;
    }

    if (city === "") {
        document.getElementById("requestCityError").textContent =
            "Please select a city.";
        isValid = false;
    }

    if (dateNeeded === "") {
        document.getElementById("dateNeededError").textContent =
            "Please select the date needed.";
        isValid = false;
    } else if (selectedDate < today || selectedDate > maximumDate) {
        document.getElementById("dateNeededError").textContent =
            "Date must be between today and the next 30 days.";
        isValid = false;
    }

    if (urgency === "") {
        document.getElementById("urgencyError").textContent =
            "Please select the urgency.";
        isValid = false;
    }

    const phonePattern = /^[0-9]{11}$/;

    if (!phonePattern.test(contactPhone)) {
        document.getElementById("contactPhoneError").textContent =
            "Please enter a valid 11-digit phone number.";
        isValid = false;
    }

    if (!consent) {
        document.getElementById("requestConsentError").textContent =
            "You must confirm the information before submitting.";
        isValid = false;
    }

    if (isValid) {
        addRequestToTable(
            patientName,
            bloodGroup,
            units,
            hospitalName,
            urgency
        );

        document.getElementById("requestMessage").textContent =
            "Check passed. This demo does not save data yet.";

        document.getElementById("bloodRequestForm").reset();

        document.getElementById("urgencyBanner").textContent =
            "Please select the urgency of your request.";

        document.getElementById("urgencyBanner").className = "message";

        updateNotesCounter();
    }

    return false;
}

function addRequestToTable(patientName, bloodGroup, units, hospital, urgency) {
    const tableBody = document.getElementById("requestTableBody");
    const row = document.createElement("tr");

    const requestId = "REQ-" + requestNumber;

    const values = [
        requestId,
        bloodGroup,
        units,
        hospital,
        urgency,
        "Pending"
    ];

    for (let i = 0; i < values.length; i++) {
        const cell = document.createElement("td");
        cell.textContent = values[i];
        row.appendChild(cell);
    }

    tableBody.appendChild(row);

    requestNumber++;
}
