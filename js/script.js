function toggleSettings() {
  const panel = document.getElementById("settings-panel");

  if (!panel) return;

  panel.classList.toggle("open");
}
