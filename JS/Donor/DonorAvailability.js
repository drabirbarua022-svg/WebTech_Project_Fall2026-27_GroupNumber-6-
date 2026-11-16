// Donor Availability script (DonorAvailability.html)

// The same fictional donor as on the Profile page
const donor = {
    id: "DN-1001",
    name: "Tasnim",
    availability: "Available"
};

// Entries saved during this page session. They disappear on reload.
let entries = [];

const dayNames = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// ---------- Small helper functions ----------

// Turns 5 into "05" so dates can be compared as text
function twoDigits(number) {
    if (number < 10) {
        return "0" + number;
    }
    return "" + number;
}

// A date as text, some days after today: 0 means today, 60 means 60 days ahead
function getDateText(daysAhead) {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.getFullYear() + "-" + twoDigits(date.getMonth() + 1) + "-" + twoDigits(date.getDate());
}

// Returns the chosen status, or "" when none is chosen
function getStatus() {
    if (document.getElementById("StatusAvailable").checked) {
        return "Available";
    }
    if (document.getElementById("StatusNotAvailable").checked) {
        return "Not Available";
    }
    return "";
}

// Returns an array of the ticked days
function getSelectedDays() {
    let days = [];

    for (let i = 0; i < dayNames.length; i++) {
        if (document.getElementById("Day" + dayNames[i]).checked) {
            days.push(dayNames[i]);
        }
    }

    return days;
}

// Describes one entry as a sentence. Also used to find duplicates.
function entryText(entry) {
    if (entry.status === "Available") {
        return "Available: " + entry.days.join(", ") + ". " + entry.time + " at " + entry.centre + ", from " + entry.from + ".";
    }
    return "Not Available: " + entry.reason + ", until " + entry.until + ".";
}

// True when the same entry is already in the array
function isDuplicate(newEntry) {
    for (let i = 0; i < entries.length; i++) {
        if (entryText(entries[i]) === entryText(newEntry)) {
            return true;
        }
    }
    return false;
}

// Empties every error paragraph
function clearErrors() {
    const errorIds = [
        "StatusError", "DaysError", "TimeSlotError", "CentreError",
        "AvailableFromError", "ReasonError", "UnavailableUntilError", "DuplicateError"
    ];

    for (let i = 0; i < errorIds.length; i++) {
        document.getElementById(errorIds[i]).textContent = "";
    }
}

// ---------- Updating the page ----------

// Shows the status badge in green or grey
function showBadge(status) {
    const badge = document.getElementById("StatusBadge");
    badge.textContent = status;

    if (status === "Available") {
        badge.className = "badge badge-large badge-success";
    } else {
        badge.className = "badge badge-large badge-neutral";
    }
}

// The badge follows the newest entry. With no entries, it shows the donor's starting status.
function updateBadge() {
    if (entries.length === 0) {
        showBadge(donor.availability);
    } else {
        showBadge(entries[entries.length - 1].status);
    }
}

// Rebuilds the list of entries and the counter
function showEntries() {
    const list = document.getElementById("EntryList");
    const emptyText = document.getElementById("EmptyEntries");
    const removeButton = document.getElementById("RemoveButton");

    // Remove the old list items before drawing again
    list.textContent = "";

    for (let i = 0; i < entries.length; i++) {
        const item = document.createElement("li");
        item.textContent = entryText(entries[i]);
        list.appendChild(item);
    }

    document.getElementById("EntryCount").textContent = entries.length;

    if (entries.length === 0) {
        emptyText.style.display = "block";
        removeButton.disabled = true;
    } else {
        emptyText.style.display = "none";
        removeButton.disabled = false;
    }
}

// ---------- Events ----------

// Runs when a status radio button changes
function showSection() {
    const status = getStatus();
    const availableSection = document.getElementById("AvailableSection");
    const unavailableSection = document.getElementById("UnavailableSection");

    if (status === "Available") {
        availableSection.style.display = "block";
        unavailableSection.style.display = "none";
    } else {
        availableSection.style.display = "none";
        unavailableSection.style.display = "block";
    }

    clearErrors();
    document.getElementById("AvailabilityMessage").style.display = "none";
}

// Runs when Save Availability is clicked
function validateAvailability() {
    const status = getStatus();
    const today = getDateText(0);
    const lastAllowedDay = getDateText(60);

    let isValid = true;
    let newEntry = {};

    clearErrors();
    document.getElementById("AvailabilityMessage").style.display = "none";

    if (status === "") {
        document.getElementById("StatusError").textContent = "Please select Available or Not Available.";
        isValid = false;
    }

    if (status === "Available") {
        const days = getSelectedDays();
        const time = document.getElementById("TimeSlot").value;
        const centre = document.getElementById("Centre").value;
        const from = document.getElementById("AvailableFrom").value;

        if (days.length === 0) {
            document.getElementById("DaysError").textContent = "Please select at least one day.";
            isValid = false;
        }

        if (time === "") {
            document.getElementById("TimeSlotError").textContent = "Please select a time slot.";
            isValid = false;
        }

        if (centre === "") {
            document.getElementById("CentreError").textContent = "Please select a donation centre.";
            isValid = false;
        }

        if (from === "") {
            document.getElementById("AvailableFromError").textContent = "Available-from date is required.";
            isValid = false;
        } else if (from < today || from > lastAllowedDay) {
            document.getElementById("AvailableFromError").textContent = "The date must be between today and 60 days from now.";
            isValid = false;
        }

        newEntry = { status: status, days: days, time: time, centre: centre, from: from };
    }

    if (status === "Not Available") {
        const reason = document.getElementById("Reason").value;
        const until = document.getElementById("UnavailableUntil").value;

        if (reason === "") {
            document.getElementById("ReasonError").textContent = "Please select a reason.";
            isValid = false;
        }

        if (until === "") {
            document.getElementById("UnavailableUntilError").textContent = "Unavailable-until date is required.";
            isValid = false;
        } else if (until <= today) {
            document.getElementById("UnavailableUntilError").textContent = "The date must be in the future.";
            isValid = false;
        }

        newEntry = { status: status, reason: reason, until: until };
    }

    // The same entry cannot be added twice
    if (isValid && isDuplicate(newEntry)) {
        document.getElementById("DuplicateError").textContent = "This entry has already been added.";
        isValid = false;
    }

    if (isValid) {
        entries.push(newEntry);
        showEntries();
        updateBadge();
        document.getElementById("AvailabilityMessage").style.display = "block";
    }

    // Always false: there is no server to send the form to
    return false;
}

// Runs when Remove Last Entry is clicked
function removeLastEntry() {
    entries.pop();
    showEntries();
    updateBadge();
    document.getElementById("AvailabilityMessage").style.display = "none";
}

// Set up the page when it opens
updateBadge();
showEntries();