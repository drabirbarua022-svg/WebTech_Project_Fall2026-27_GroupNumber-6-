"use strict";
const taskItems = [];
document.getElementById("totalDonors").textContent = demoDonors.length;
document.getElementById("availableDonors").textContent = demoDonors.filter(d => d.available).length;
document.getElementById("pendingRequests").textContent = demoRequests.filter(r => r.status === "Pending").length;
document.getElementById("emergencyRequests").textContent = demoRequests.filter(r => r.urgency === "Emergency").length;
document.getElementById("recentRows").innerHTML = demoRequests.map(r => `<tr class="${r.urgency === "Emergency" ? "urgent" : ""}"><td>${escapeText(r.id)}</td><td>${escapeText(r.blood)}</td><td>${escapeText(r.city)}</td><td>${escapeText(r.urgency)}</td><td>${escapeText(r.status)}</td></tr>`).join("");
function renderTasks() {
  document.getElementById("taskList").innerHTML = taskItems.map((t, i) => `<li><label><input type="checkbox" data-done="${i}"> <span>${escapeText(t.text)} (${escapeText(t.priority)})</span></label> <button type="button" data-remove="${i}" class="btn secondary">Remove</button></li>`).join("");
  document.querySelectorAll("[data-done]").forEach(box => box.addEventListener("change", () => { box.nextElementSibling.style.textDecoration = box.checked ? "line-through" : "none"; }));
  document.querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => { taskItems.splice(Number(button.dataset.remove), 1); renderTasks(); }));
}
document.getElementById("taskForm").addEventListener("submit", event => {
  event.preventDefault();
  const text = document.getElementById("taskText").value.trim();
  const priority = document.getElementById("priority").value;
  const validText = text.length >= 5 && text.length <= 80;
  showText("taskTextError", validText ? "" : "Enter 5 to 80 characters.");
  showText("priorityError", priority ? "" : "Choose a priority.");
  const duplicate = taskItems.some(t => t.text.toLowerCase() === text.toLowerCase());
  if (validText && priority && !duplicate) { taskItems.push({ text, priority }); renderTasks(); event.target.reset(); showText("taskMessage", "Task added to this page."); }
  else showText("taskMessage", duplicate ? "That task is already on the list." : "Please fix the fields above.");
});
