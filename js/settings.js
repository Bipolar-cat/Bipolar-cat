// settings.js

function toggleSettings() {

    const panel =
        document.getElementById("settings-panel");

    if (!panel) return;

    panel.classList.toggle("open");
}

function saveSettings() {

    alert("設定保存（仮）");
}

function loadSettings() {

}

function openSettings() {
  document.getElementById("settings-panel").style.display = "block";
}

function closeSettings() {
  document.getElementById("settings-panel").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".settings").onclick = openSettings;
});
