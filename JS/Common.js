"use strict";
const demoDonors = [
  { id: "DN-1001", name: "Amina Rahman", blood: "A+", city: "Dhaka", available: true, phone: "01700000001" },
  { id: "DN-1002", name: "Rafi Hasan", blood: "O+", city: "Dhaka", available: true, phone: "01700000002" },
  { id: "DN-1003", name: "Nila Islam", blood: "B+", city: "Sylhet", available: false, phone: "01700000003" },
  { id: "DN-1004", name: "Arif Chowdhury", blood: "AB+", city: "Chattogram", available: true, phone: "01700000004" },
  { id: "DN-1005", name: "Sara Akter", blood: "O-", city: "Rajshahi", available: true, phone: "01700000005" }
];

const demoRequests = [
  { id: "REQ-4001", patient: "Patient A", blood: "A+", units: 2, city: "Dhaka", hospital: "Demo Hospital", date: "2026-11-15", urgency: "Urgent", status: "Pending" },
  { id: "REQ-4002", patient: "Patient B", blood: "O+", units: 1, city: "Sylhet", hospital: "Sample Clinic", date: "2026-11-18", urgency: "Normal", status: "Pending" },
  { id: "REQ-4003", patient: "Patient C", blood: "B+", units: 3, city: "Dhaka", hospital: "City Hospital", date: "2026-11-12", urgency: "Emergency", status: "Under Review" },
  { id: "REQ-4004", patient: "Patient D", blood: "AB+", units: 1, city: "Chattogram", hospital: "Demo Medical Centre", date: "2026-11-20", urgency: "Normal", status: "Pending" }
];

function showText(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}

function escapeText(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
}

function fillCityList(id) {
  const select = document.getElementById(id);
  if (!select) return;
  ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"].forEach(city => {
    select.add(new Option(city, city));
  });
}

function todayString() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}