const completedRequests = [
    "REQ-4004",
    "REQ-4006",
    "REQ-4008"
];

let feedbacks = [];

function loadCompletedRequests() {
    const dropdown = document.getElementById("completedRequest");

    for (let i = 0; i < completedRequests.length; i++) {
        const option = document.createElement("option");

        option.value = completedRequests[i];
        option.textContent = completedRequests[i];

        dropdown.appendChild(option);
    }
}

function showRating() {
    const rating = Number(document.getElementById("rating").value);
    const ratingWords = document.getElementById("ratingWords");

    const ratingMessages = {
        1: "Poor",
        2: "Fair",
        3: "Average",
        4: "Good",
        5: "Excellent"
    };

    if (rating >= 1 && rating <= 5) {
        ratingWords.textContent =
            "★".repeat(rating) + " - " + ratingMessages[rating];
    } else {
        ratingWords.textContent = "";
    }
}

function updateFeedbackCounter() {
    const comment = document.getElementById("feedbackComment").value;
    const counter = document.getElementById("feedbackCounter");

    counter.textContent = comment.length + "/300 characters";

    if (comment.length > 270) {
        counter.className = "error";
    } else {
        counter.className = "";
    }
}

function validateFeedback() {
    const requestId = document.getElementById("completedRequest").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("feedbackComment").value.trim();

    const selectedTopics = document.querySelectorAll(
        'input[name="topic"]:checked'
    );

    const recommend = document.querySelector(
        'input[name="recommend"]:checked'
    );

    const errors = [
        "completedRequestError",
        "ratingError",
        "topicError",
        "feedbackCommentError",
        "recommendError"
    ];

    for (let i = 0; i < errors.length; i++) {
        document.getElementById(errors[i]).textContent = "";
    }

    document.getElementById("feedbackMessage").textContent = "";

    let isValid = true;

    if (requestId === "") {
        document.getElementById("completedRequestError").textContent =
            "Please select a completed request.";
        isValid = false;
    }

    if (rating === "") {
        document.getElementById("ratingError").textContent =
            "Please select a rating.";
        isValid = false;
    }

    if (selectedTopics.length === 0) {
        document.getElementById("topicError").textContent =
            "Please select at least one feedback topic.";
        isValid = false;
    }

    if (comment.length < 20 || comment.length > 300) {
        document.getElementById("feedbackCommentError").textContent =
            "Comment must contain between 20 and 300 characters.";
        isValid = false;
    }

    if (recommend === null) {
        document.getElementById("recommendError").textContent =
            "Please select Yes or No.";
        isValid = false;
    }

    if (isValid) {
        const topics = [];

        for (let i = 0; i < selectedTopics.length; i++) {
            topics.push(selectedTopics[i].value);
        }

        const feedback = {
            requestId: requestId,
            rating: Number(rating),
            topics: topics,
            comment: comment,
            recommend: recommend.value
        };

        feedbacks.push(feedback);

        displayFeedbacks();

        document.getElementById("feedbackMessage").textContent =
            "Check passed. This demo does not save data yet.";

        document.getElementById("feedbackForm").reset();

        document.getElementById("ratingWords").textContent = "";

        updateFeedbackCounter();
    }

    return false;
}

function displayFeedbacks() {
    const feedbackList = document.getElementById("feedbackList");

    feedbackList.innerHTML = "";

    let totalRating = 0;

    for (let i = 0; i < feedbacks.length; i++) {
        const feedback = feedbacks[i];

        totalRating += feedback.rating;

        const card = document.createElement("div");
        card.className = "card";

        const heading = document.createElement("h3");
        heading.textContent = feedback.requestId;

        const rating = document.createElement("p");
        rating.textContent =
            "Rating: " + "★".repeat(feedback.rating);

        const topics = document.createElement("p");
        topics.textContent =
            "Topics: " + feedback.topics.join(", ");

        const comment = document.createElement("p");
        comment.textContent = "Comment: " + feedback.comment;

        const recommendation = document.createElement("p");
        recommendation.textContent =
            "Would recommend: " + feedback.recommend;

        card.appendChild(heading);
        card.appendChild(rating);
        card.appendChild(topics);
        card.appendChild(comment);
        card.appendChild(recommendation);

        feedbackList.appendChild(card);
    }

    let average = 0;

    if (feedbacks.length > 0) {
        average = (totalRating / feedbacks.length).toFixed(1);
    }

    document.getElementById("averageRating").textContent = average;
}

loadCompletedRequests();
displayFeedbacks();
updateFeedbackCounter();
