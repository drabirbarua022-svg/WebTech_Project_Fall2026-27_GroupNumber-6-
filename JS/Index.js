// Homepage script (index.html)

// Shows a message when a role section is not available yet
function showUnavailable(roleName) {
    const message = document.getElementById("RoleMessage");
    message.textContent = "The " + roleName + " section is not available yet.";
}