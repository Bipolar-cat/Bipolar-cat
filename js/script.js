let state = loadState();

window.addEventListener("DOMContentLoaded", () => {

  initMoodButtons();
  initCondButtons();

  setupSingleSelect("mood-buttons", "mood");
  setupSingleSelect("cond-buttons", "cond");

  applyState();
});
