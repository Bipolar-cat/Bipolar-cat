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
3段階
10段階
診断名
年代
