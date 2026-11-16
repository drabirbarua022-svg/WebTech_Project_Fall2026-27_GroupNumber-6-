
const requests = [
    {
        id: "REQ-4001",
        bloodGroup: "A+",
        units: 2,
        hospital: "Dhaka Medical College Hospital",
        city: "Dhaka",
        status: "Pending"
    },
    {
        id: "REQ-4002",
        bloodGroup: "B+",
        units: 1,
        hospital: "Chattogram Medical College",
        city: "Chattogram",
        status: "Under Review"
    },
    {
        id: "REQ-4003",
        bloodGroup: "O+",
        units: 3,
        hospital: "Sylhet MAG Osmani Medical College",
        city: "Sylhet",
        status: "Donor Matched"
    },
    {
        id: "REQ-4004",
        bloodGroup: "AB+",
        units: 2,
        hospital: "Rajshahi Medical College Hospital",
        city: "Rajshahi",
        status: "Completed"
    },
    {
        id: "REQ-4005",
        bloodGroup: "O-",
        units: 1,
        hospital: "Khulna Medical College Hospital",
        city: "Khulna",
        status: "Pending"
    }
];

function displayRequests(requestList) {
    const container = document.getElementById("requestCards");

    container.innerHTML = "";

    if (requestList.length === 0) {
        container.textContent = "No requests found.";
        return;
    }

    for (let i = 0; i < requestList.length; i++) {
        const request = requestList[i];

        const card = document.createElement("div");
        card.className = "card";

        const heading = document.createElement("h3");
        heading.textContent = request.id;

        const details = document.createElement("p");
        details.textContent =
            "Blood Group: " + request.bloodGroup +
            " | Units: " + request.units +
            " | Hospital: " + request.hospital +
            " | City: " + request.city;

        const status = document.createElement("span");
        status.className = "badge";
        status.textContent = request.status;

        card.appendChild(heading);
        card.appendChild(details);
        card.appendChild(status);

        if (request.status === "Pending") {
            const cancelButton = document.createElement("button");

            cancelButton.type = "button";
            cancelButton.className = "btn";
            cancelButton.textContent = "Cancel Request";

            cancelButton.onclick = function () {
                cancelRequest(request.id);
            };

            card.appendChild(cancelButton);
        }

        container.appendChild(card);
    }
}

function filterRequests() {
    const selectedStatus = document.getElementById("statusFilter").value;

    if (selectedStatus === "All") {
        displayRequests(requests);
    } else {
        const filteredRequests = requests.filter(function (request) {
            return request.status === selectedStatus;
        });

        displayRequests(filteredRequests);
    }
}

function trackRequest() {
    const trackingId = document.getElementById("trackingId").value.trim().toUpperCase();

    const error = document.getElementById("trackingIdError");
    const message = document.getElementById("trackingMessage");
    const result = document.getElementById("trackingResult");

    error.textContent = "";
    message.textContent = "";
    result.hidden = true;

    const idPattern = /^REQ-[0-9]{4,}$/;

    if (trackingId === "") {
        error.textContent = "Please enter your request ID.";
        return false;
    }

    if (!idPattern.test(trackingId)) {
        error.textContent = "Enter a valid request ID. Example: REQ-4001.";
        return false;
    }

    const request = requests.find(function (item) {
        return item.id === trackingId;
    });

    if (!request) {
        error.textContent = "Request ID not found.";
        return false;
    }

    showProgress(request.status);

    result.hidden = false;

    message.textContent = "Request found successfully.";

    return false;
}

function showProgress(status) {
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");

    let progress = 0;

    if (status === "Pending") {
        progress = 25;
    } else if (status === "Under Review") {
        progress = 50;
    } else if (status === "Donor Matched") {
        progress = 75;
    } else if (status === "Completed") {
        progress = 100;
    } else if (status === "Cancelled") {
        progress = 0;
    }

    progressFill.style.width = progress + "%";

    if (status === "Cancelled") {
        progressText.textContent = "Request Cancelled.";
    } else {
        progressText.textContent =
            "Submitted → Under Review → Donor Matched → Completed (" +
            status + ")";
    }
}

function cancelRequest(requestId) {
    const request = requests.find(function (item) {
        return item.id === requestId;
    });

    if (request && request.status === "Pending") {
        request.status = "Cancelled";

        filterRequests();

        const trackingId = document.getElementById("trackingId").value.trim().toUpperCase();

        if (trackingId === requestId) {
            showProgress("Cancelled");
        }
    }
}

displayRequests(requests);
