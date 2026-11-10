"use strict";
let openRequestId = "";
function renderRequests() {
  document.getElementById("requestRows").innerHTML = demoRequests.map(r => `<tr><td>${escapeText(r.id)}</td><td>${escapeText(r.blood)}</td><td>${escapeText(r.city)}</td><td>${escapeText(r.urgency)}</td><td><span class="badge">${escapeText(r.status)}</span></td><td><button type="button" data-review="${escapeText(r.id)}">Review</button></td></tr>`).join("");
  document.querySelectorAll("[data-review]").forEach(button => button.addEventListener("click", () => {
    openRequestId = button.dataset.review;
    const r = demoRequests.find(item => item.id === openRequestId);
    showText("requestDetails", `${r.id}: ${r.patient}, ${r.blood}, ${r.units} unit(s), ${r.hospital}, ${r.city}. Needed by ${r.date}. Urgency: ${r.urgency}. Current status: ${r.status}.`);
    document.getElementById("newStatus").value = "";
    showText("reviewMessage", "");
  }));
  document.getElementById("countPending").textContent = demoRequests.filter(r => r.status === "Pending").length;
  document.getElementById("countReview").textContent = demoRequests.filter(r => r.status === "Under Review").length;
  document.getElementById("countClosed").textContent = demoRequests.filter(r => r.status === "Closed").length;
}
document.getElementById("reviewForm").addEventListener("submit", event => {
  event.preventDefault();
  const status = document.getElementById("newStatus").value;
  const remarks = document.getElementById("remarks").value.trim();
  const request = demoRequests.find(r => r.id === openRequestId);
  const validStatus = Boolean(request && status && status !== request.status);
  const needsRemarks = ["Needs More Information", "Closed"].includes(status);
  const validRemarks = !needsRemarks || remarks.length >= 10;
  showText("newStatusError", validStatus ? "" : "Open a request and choose a different status.");
  showText("remarksError", validRemarks ? "" : "Write at least 10 characters for this status.");
  if (validStatus && validRemarks) {
    request.status = status;
    renderRequests();
    showText("reviewMessage", "Check passed. This demo does not save updates.");
  } else showText("reviewMessage", "Please fix the fields above.");
});
renderRequests();
