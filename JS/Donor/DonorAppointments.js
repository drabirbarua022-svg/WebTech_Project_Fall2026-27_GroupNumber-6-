// Donor Appointments script (DonorAppointments.html)

// The same fictional donor as on the other Donor pages
const donor = {
    id: "DN-1001",
    name: "Tasnim",
    bloodGroup: "AB+"
};

// Fictional donation invitations
const appointments = [
    { id: "REQ-4001", centre: "Dhaka Central Blood Centre", date: "22 Nov 2026", time: "10:00 AM", urgency: "Urgent", status: "Pending", reason: "" },
    { id: "REQ-4002", centre: "Mirpur Community Blood Centre", date: "25 Nov 2026", time: "2:00 PM", urgency: "Normal", status: "Accepted", reason: "" },
    { id: "REQ-4003", centre: "Uttara Donation Centre", date: "29 Nov 2026", time: "11:30 AM", urgency: "Normal", status: "Pending", reason: "" },
    { id: "REQ-4004", centre: "Dhaka Central Blood Centre", date: "03 Dec 2026", time: "4:00 PM", urgency: "Emergency", status: "Pending", reason: "" }
];

// The Request ID whose decline form is open. "" means none is open.
let decliningId = "";

// ---------- Small helper functions ----------

// Finds one appointment in the array by its Request ID
function findAppointment(requestId) {
    for (let i = 0; i < appointments.length; i++) {
        if (appointments[i].id === requestId) {
            return appointments[i];
        }
    }
    return null;
}

// Counts the appointments that have a given status
function countByStatus(status) {
    let count = 0;
    for (let i = 0; i < appointments.length; i++) {
        if (appointments[i].status === status) {
            count++;
        }
    }
    return count;
}

// Chooses the badge colour for a status
function badgeClass(status) {
    if (status === "Accepted") {
        return "badge badge-success";
    }
    if (status === "Declined") {
        return "badge badge-danger";
    }
    return "badge badge-warning";
}

// Creates a paragraph such as "Request ID: REQ-4001"
function makeLine(label, value) {
    const line = document.createElement("p");
    line.className = "appointment-line";
    line.textContent = label + ": " + value;
    return line;
}

// Creates a button that calls a function when clicked
function makeButton(text, className, onclickText) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = text;
    button.setAttribute("onclick", onclickText);
    return button;
}

// Shows or hides the message above the cards
function showMessage(text) {
    const message = document.getElementById("AppointmentMessage");

    if (text === "") {
        message.style.display = "none";
    } else {
        message.textContent = text;
        message.style.display = "block";
    }
}

// ---------- Building the page ----------

// Updates the three counters at the top
function showCounters() {
    document.getElementById("CountPending").textContent = countByStatus("Pending");
    document.getElementById("CountAccepted").textContent = countByStatus("Accepted");
    document.getElementById("CountDeclined").textContent = countByStatus("Declined");
}

// Creates the decline form shown inside one card
function makeDeclineForm(requestId) {
    const form = document.createElement("form");
    form.className = "decline-form";
    form.setAttribute("novalidate", "");
    form.setAttribute("onsubmit", "return confirmDecline('" + requestId + "')");

    const group = document.createElement("div");
    group.className = "form-group";

    const label = document.createElement("label");
    label.setAttribute("for", "DeclineReason");
    label.textContent = "Reason for Declining";

    const textarea = document.createElement("textarea");
    textarea.className = "form-input";
    textarea.id = "DeclineReason";
    textarea.rows = 3;
    textarea.placeholder = "Write 10 to 200 characters";

    const error = document.createElement("p");
    error.className = "error";
    error.id = "DeclineReasonError";

    group.appendChild(label);
    group.appendChild(textarea);
    group.appendChild(error);

    const confirmButton = document.createElement("input");
    confirmButton.type = "submit";
    confirmButton.className = "btn btn-inline";
    confirmButton.value = "Confirm Decline";

    const actions = document.createElement("div");
    actions.className = "form-actions";
    actions.appendChild(confirmButton);
    actions.appendChild(makeButton("Cancel", "btn btn-inline btn-secondary", "cancelDecline()"));

    form.appendChild(group);
    form.appendChild(actions);

    return form;
}

// Creates one white card for one appointment
function makeCard(appointment) {
    const card = document.createElement("div");
    card.className = "card appointment-card";

    // Heading and status badge
    const top = document.createElement("div");
    top.className = "appointment-top";

    const heading = document.createElement("h3");
    heading.className = "card-heading";
    heading.textContent = "Donation Invitation";

    const badge = document.createElement("span");
    badge.className = badgeClass(appointment.status);
    badge.textContent = appointment.status;

    top.appendChild(heading);
    top.appendChild(badge);
    card.appendChild(top);

    // Details
    card.appendChild(makeLine("Request ID", appointment.id));
    card.appendChild(makeLine("Donation Centre", appointment.centre));
    card.appendChild(makeLine("Blood Group Needed", donor.bloodGroup));
    card.appendChild(makeLine("Appointment Date", appointment.date));
    card.appendChild(makeLine("Appointment Time", appointment.time));
    card.appendChild(makeLine("Urgency", appointment.urgency));

    if (appointment.status === "Declined") {
        card.appendChild(makeLine("Decline Reason", appointment.reason));
    }

    // Only Pending invitations can be answered
    if (appointment.status === "Pending") {
        if (decliningId === appointment.id) {
            card.appendChild(makeDeclineForm(appointment.id));
        } else {
            const actions = document.createElement("div");
            actions.className = "form-actions appointment-actions";
            actions.appendChild(makeButton("Accept", "btn btn-inline", "acceptAppointment('" + appointment.id + "')"));
            actions.appendChild(makeButton("Decline", "btn btn-inline btn-secondary", "startDecline('" + appointment.id + "')"));
            card.appendChild(actions);
        }
    }

    return card;
}

// Rebuilds the cards for the chosen filter
function showAppointments() {
    const filter = document.getElementById("StatusFilter").value;
    const list = document.getElementById("AppointmentList");
    const emptyText = document.getElementById("EmptyAppointments");

    let shown = 0;

    // Remove the old cards before drawing again
    list.textContent = "";

    for (let i = 0; i < appointments.length; i++) {
        if (filter === "All" || appointments[i].status === filter) {
            list.appendChild(makeCard(appointments[i]));
            shown++;
        }
    }

    if (shown === 0) {
        emptyText.style.display = "block";
    } else {
        emptyText.style.display = "none";
    }
}

// ---------- Events ----------

// Runs when the filter dropdown changes
function changeFilter() {
    decliningId = "";
    showMessage("");
    showAppointments();
}

// Runs when Accept is clicked
function acceptAppointment(requestId) {
    const appointment = findAppointment(requestId);

    if (appointment !== null && appointment.status === "Pending") {
        appointment.status = "Accepted";
        decliningId = "";
        showCounters();
        showAppointments();
        showMessage("Invitation " + requestId + " accepted. Demo mode: no coordinator has been notified.");
    }
}

// Runs when Decline is clicked: opens the reason form in that card
function startDecline(requestId) {
    decliningId = requestId;
    showMessage("");
    showAppointments();
}

// Runs when Cancel is clicked inside the decline form
function cancelDecline() {
    decliningId = "";
    showAppointments();
}

// Runs when Confirm Decline is clicked
function confirmDecline(requestId) {
    const appointment = findAppointment(requestId);
    const reason = document.getElementById("DeclineReason").value;
    const error = document.getElementById("DeclineReasonError");

    if (reason.length < 10 || reason.length > 200) {
        error.textContent = "The reason must contain 10 to 200 characters. It has " + reason.length + " now.";
        return false;
    }

    if (appointment !== null && appointment.status === "Pending") {
        appointment.status = "Declined";
        appointment.reason = reason;
        decliningId = "";
        showCounters();
        showAppointments();
        showMessage("Invitation " + requestId + " declined. Demo mode: no coordinator has been notified.");
    }

    // Always false: there is no server to send the form to
    return false;
}

// Set up the page when it opens
showCounters();
showAppointments();