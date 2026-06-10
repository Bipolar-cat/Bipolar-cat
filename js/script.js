// state
let state = loadState();

// 初期化
window.addEventListener("DOMContentLoaded", () => {

  initMoodButtons();
  initCondButtons();

  setupSingleSelect("mood-buttons", "mood");
  setupSingleSelect("cond-buttons", "cond");

  applyState();
});

// ボタン生成
function initMoodButtons() { ... }
function initCondButtons() { ... }

// クリック制御
function setupSingleSelect(containerId, key) { ... }

// state反映
function applyState() { ... }
