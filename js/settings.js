function toggleSettings() {
    alert("⚙が押されました");

    const panel = document.getElementById("settings-panel");

    if (!panel) {
        alert("settings-panel が見つかりません");
        return;
    }

    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}
