/*==================================================
InnerNote v2.0
settings.js

役割
・設定画面の表示
・Step3 / Step10 の切替
・表示設定の保存

設定は localStorage に保存する。
==================================================*/

// ----------------------------
// 設定画面の開閉
// ----------------------------
function toggleSettings() {
  const panel = document.getElementById("settings-panel");

  if (!panel) return;

  panel.classList.toggle("open");
}

// ----------------------------
// 現在の設定を画面へ反映
// ----------------------------
function loadSettings() {
  const mode = getMode();

  const radio = document.querySelector(`input[name="mode"][value="${mode}"]`);

  if (radio) {
    radio.checked = true;
  }
}

// ----------------------------
// Step変更
// ----------------------------
function changeMode(mode) {
  saveMode(mode);

  createButtons("mood");
  createButtons("cond");

  renderChart();

  renderLogs();
}

// ----------------------------
// 初期設定
// ----------------------------
window.addEventListener("DOMContentLoaded", () => {
  loadSettings();

  document.querySelectorAll('input[name="mode"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      changeMode(radio.value);
    });
  });
});
