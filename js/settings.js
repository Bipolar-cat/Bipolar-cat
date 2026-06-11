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
