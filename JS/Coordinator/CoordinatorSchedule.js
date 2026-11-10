"use strict";
const appointments = [];
const donorSelect = document.getElementById("donor");
demoDonors.forEach(d => donorSelect.add(new Option(`${d.id} - ${d.name} (${d.blood})`, d.id)));
const requestSelect = document.getElementById("request");
demoRequests.forEach(r => requestSelect.add(new Option(`${r.id} - ${r.blood} (${r.city})`, r.id)));
fillCityList("centre");
function updateMatch() {
  const d = demoDonors.find(item => item.id === donorSelect.value);
  const r = demoRequests.find(item => item.id === requestSelect.value);
  showText("matchInfo", d && r ? `Donor blood group: ${d.blood}. Request blood group: ${r.blood}. Medical staff must confirm if donation is suitable.` : "Choose a donor and request to see their blood groups.");
}
donorSelect.addEventListener("change", updateMatch);
requestSelect.addEventListener("change", updateMatch);
function renderAppointments() {
  document.getElementById("appointmentRows").innerHTML = appointments.map((a, i) => `<tr class="${a.cancelled ? "cancelled-row" : ""}"><td>${escapeText(a.donor)}</td><td>${escapeText(a.request)}</td><td>${escapeText(a.centre)}</td><td>${escapeText(a.date)}</td><td>${escapeText(a.time)}</td><td>${a.cancelled ? "Cancelled" : "Planned"}</td><td>${a.cancelled ? "" : `<button type="button" data-cancel="${i}" class="btn secondary">Cancel</button>`}</td></tr>`).join("");
  document.querySelectorAll("[data-cancel]").forEach(button => button.addEventListener("click", () => { appointments[Number(button.dataset.cancel)].cancelled = true; renderAppointments(); }));
}
document.getElementById("scheduleForm").addEventListener("submit", event => {
  event.preventDefault();
  const donor = donorSelect.value;
  const request = requestSelect.value;
  const centre = document.getElementById("centre").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const today = new Date(`${todayString()}T00:00:00`);
  const chosen = date ? new Date(`${date}T00:00:00`) : null;
  const min = new Date(today); min.setDate(min.getDate() + 1);
  const max = new Date(today); max.setDate(max.getDate() + 30);
  const validDate = Boolean(chosen && chosen >= min && chosen <= max);
  showText("donorError", donor ? "" : "Choose a donor.");
  showText("requestError", request ? "" : "Choose a request.");
  showText("centreError", centre ? "" : "Choose a centre.");
  showText("dateError", validDate ? "" : "Choose a date from tomorrow to 30 days from today.");
  showText("timeError", time ? "" : "Choose a time slot.");
  const donorBooked = appointments.some(a => !a.cancelled && a.donorId === donor && a.date === date);
  const slotBooked = appointments.some(a => !a.cancelled && a.centre === centre && a.date === date && a.time === time);
  if (donorBooked || slotBooked) { showText("scheduleMessage", donorBooked ? "This donor already has an appointment on that date." : "This centre and time are already booked for that date."); return; }
  if (donor && request && centre && validDate && time) {
    const donorInfo = demoDonors.find(d => d.id === donor);
    appointments.push({ donorId: donor, donor: `${donor} - ${donorInfo.name}`, request, centre, date, time, cancelled: false });
    renderAppointments(); event.target.reset(); updateMatch();
    showText("scheduleMessage", "Check passed. This demo does not save or book appointments.");
  } else showText("scheduleMessage", "Please fix the fields above.");
});
