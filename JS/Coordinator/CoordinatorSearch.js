"use strict";
fillCityList("cityFilter");
function renderDonors(list) {
  document.getElementById("donorRows").innerHTML = list.map(d => `<tr><td>${escapeText(d.id)}</td><td>${escapeText(d.name)}</td><td>${escapeText(d.blood)}</td><td>${escapeText(d.city)}</td><td>${d.available ? "Available" : "Not available"}</td><td><button type="button" data-phone="${escapeText(d.id)}">Show contact</button><span class="hidden" data-number="${escapeText(d.id)}"> ${escapeText(d.phone)}</span></td></tr>`).join("");
  document.querySelectorAll("[data-phone]").forEach(button => button.addEventListener("click", () => { document.querySelector(`[data-number="${button.dataset.phone}"]`).classList.remove("hidden"); button.classList.add("hidden"); }));
}
document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("nameFilter").value.trim();
  const blood = document.getElementById("bloodFilter").value;
  const city = document.getElementById("cityFilter").value;
  const onlyAvailable = document.getElementById("availableFilter").checked;
  const hasFilter = Boolean(name || blood || city || onlyAvailable);
  const validName = !name || (/^[A-Za-z ]+$/.test(name) && name.length >= 2);
  showText("nameFilterError", validName ? "" : "Use at least 2 letters for the name.");
  showText("filterError", hasFilter ? "" : "Choose or enter at least one filter.");
  if (!hasFilter || !validName) { showText("resultCount", ""); renderDonors([]); return; }
  const found = demoDonors.filter(d => (!name || d.name.toLowerCase().includes(name.toLowerCase())) && (!blood || d.blood === blood) && (!city || d.city === city) && (!onlyAvailable || d.available));
  showText("resultCount", `${found.length} donor${found.length === 1 ? "" : "s"} found.`);
  renderDonors(found);
});
