// ========================
// Settings
// ========================

const SETTINGS_KEY = "innernote_settings";

function toggleSettings() {
    const panel = document.getElementById("settings-panel");

    if (!panel) return;

    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}

function saveSettings(data) {
    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(data)
    );
}

function loadSettings() {
    return JSON.parse(
        localStorage.getItem(SETTINGS_KEY) || "{}"
    );
}
