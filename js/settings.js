function toggleSettings() {
    alert("押された");

    const panel = document.getElementById("settings-panel");

    if (!panel) {
        alert("settings-panelが見つかりません");
        return;
    }

    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}
