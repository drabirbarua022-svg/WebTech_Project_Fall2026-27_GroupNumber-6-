// Donor Profile script (DonorProfile.html)

// Fictional donor used for the demonstration
const donor = {
    id: "DN-1001",
    name: "Tasnim",
    bloodGroup: "AB+",
    city: "Dhaka",
    phone: "01700000000",
    email: "tasnim@example.com",
    availability: "Available"
};

// Fictional donation records. Total donations is counted from this array.
const donationHistory = [
    { date: "18 Jul 2026", centre: "Dhaka Central Blood Centre", type: "Whole Blood", status: "Completed" },
    { date: "02 Mar 2026", centre: "Mirpur Community Blood Centre", type: "Whole Blood", status: "Completed" },
    { date: "21 Oct 2025", centre: "Dhaka Central Blood Centre", type: "Platelets", status: "Completed" },
    { date: "09 May 2025", centre: "Uttara Donation Centre", type: "Whole Blood", status: "Completed" }
];

// ---------- Showing the profile ----------

// Fills the welcome line, the statistics cards and the profile card
function showProfile() {
    const totalDonations = donationHistory.length;
    const availabilityBadge = document.getElementById("StatAvailability");

    document.getElementById("WelcomeName").textContent = donor.name;

    // Statistics cards
    document.getElementById("StatBloodGroup").textContent = donor.bloodGroup;
    document.getElementById("StatDonations").textContent = totalDonations;
    availabilityBadge.textContent = donor.availability;

    if (donor.availability === "Available") {
        availabilityBadge.className = "badge badge-success";
    } else {
        availabilityBadge.className = "badge badge-neutral";
    }

    // Profile card
    document.getElementById("ProfileInitial").textContent = donor.name[0];
    document.getElementById("ProfileName").textContent = donor.name;
    document.getElementById("ProfileID").textContent = donor.id;
    document.getElementById("ProfileBloodGroup").textContent = donor.bloodGroup;
    document.getElementById("ProfileCity").textContent = donor.city;
    document.getElementById("ProfilePhone").textContent = donor.phone;
    document.getElementById("ProfileEmail").textContent = donor.email;
    document.getElementById("ProfileDonations").textContent = totalDonations;
}

// Creates one table cell holding plain text
function makeCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
}

// Builds one table row for every record in the history array
function showHistory() {
    const tableBody = document.getElementById("HistoryBody");

    // When there are no records, show one row with a message
    if (donationHistory.length === 0) {
        const emptyRow = document.createElement("tr");
        const emptyCell = makeCell("No donation history is available.");
        emptyCell.colSpan = 4;
        emptyRow.appendChild(emptyCell);
        tableBody.appendChild(emptyRow);
        return;
    }

    for (let i = 0; i < donationHistory.length; i++) {
        const record = donationHistory[i];
        const row = document.createElement("tr");

        row.appendChild(makeCell(record.date));
        row.appendChild(makeCell(record.centre));
        row.appendChild(makeCell(record.type));

        // The status is shown as a small badge
        const statusCell = document.createElement("td");
        const badge = document.createElement("span");
        badge.className = "badge badge-success";
        badge.textContent = record.status;
        statusCell.appendChild(badge);
        row.appendChild(statusCell);

        tableBody.appendChild(row);
    }
}

// ---------- Helper checks for the edit form ----------

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

// Empties the error paragraphs of the edit form
function clearEditErrors() {
    document.getElementById("EditEmailError").textContent = "";
    document.getElementById("EditPhoneError").textContent = "";
    document.getElementById("EditCityError").textContent = "";
    document.getElementById("EditChangeError").textContent = "";
}

// ---------- Edit Profile ----------

// Runs when Edit Profile is clicked
function showEditForm() {
    // Put the current values into the form
    document.getElementById("EditEmail").value = donor.email;
    document.getElementById("EditPhone").value = donor.phone;
    document.getElementById("EditCity").value = donor.city;

    clearEditErrors();

    document.getElementById("ProfileMessage").style.display = "none";
    document.getElementById("EditButton").style.display = "none";
    document.getElementById("EditForm").style.display = "block";
}

// Runs when Cancel is clicked, and after a successful save
function hideEditForm() {
    document.getElementById("EditForm").style.display = "none";
    document.getElementById("EditButton").style.display = "inline-block";
}

// Runs when Save Changes is clicked
function validateEdit() {
    const email = document.getElementById("EditEmail").value;
    const phone = document.getElementById("EditPhone").value;
    const city = document.getElementById("EditCity").value;

    let isValid = true;

    clearEditErrors();

    if (email === "") {
        document.getElementById("EditEmailError").textContent = "Email is required.";
        isValid = false;
    } else if (isValidEmail(email) === false) {
        document.getElementById("EditEmailError").textContent = "Please enter a valid email, such as name@example.com.";
        isValid = false;
    }

    if (phone === "") {
        document.getElementById("EditPhoneError").textContent = "Phone number is required.";
        isValid = false;
    } else if (isValidPhone(phone) === false) {
        document.getElementById("EditPhoneError").textContent = "Phone number must be 11 digits and start with 01.";
        isValid = false;
    }

    if (city === "") {
        document.getElementById("EditCityError").textContent = "Please select a city.";
        isValid = false;
    }

    // At least one value must be different from the current profile
    if (email === donor.email && phone === donor.phone && city === donor.city) {
        document.getElementById("EditChangeError").textContent = "Please change at least one field before saving.";
        isValid = false;
    }

    if (isValid) {
        // Update the object, then redraw the profile from it
        donor.email = email;
        donor.phone = phone;
        donor.city = city;

        showProfile();
        hideEditForm();
        document.getElementById("ProfileMessage").style.display = "block";
    }

    // Always false: there is no server to send the form to
    return false;
}

// Run both when the page opens
showProfile();
showHistory();