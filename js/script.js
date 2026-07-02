/* script.js
 * Ver.0.2
 * 画面制御・イベント管理
 */

console.log("script.js loaded");

// ----------------------------
// 現在の選択値（Step3）
// ----------------------------
let selectedMood = 5;
let selectedCond = 5;

// ----------------------------
// ボタン選択
// ----------------------------
function setVal(type, value, button) {
  // active解除
  const group = button.parentElement;

  group.querySelectorAll("button").forEach((btn) => {
    btn.classList.remove("active");
  });

  // 選択ボタン
  button.classList.add("active");

  // 値保存
  if (type === "mood") {
    selectedMood = value;
  } else {
    selectedCond = value;
  }

  console.log("Mood:", selectedMood, "Cond:", selectedCond);
}

// ----------------------------
// 保存
// ----------------------------
function saveData() {
  const logs = getLogs();

  logs.push({
    date: formatDate(new Date(), true),

    mood: selectedMood,

    cond: selectedCond,

    note: document.getElementById("note").value,
  });

  saveLogs(logs);

  renderChart();

  renderLogs();

  // 入力欄クリア
  document.getElementById("note").value = "";

  // ステータス表示
  const status = document.getElementById("status");

  if (status) {
    status.textContent = "✔️ 記録しました";

    status.classList.add("show");

    setTimeout(() => {
      status.classList.remove("show");

      status.textContent = "";
    }, 2000);
  }

  console.log("保存完了");
}

// ----------------------------
// 日付表示
// ----------------------------
function formatDate(dateObj, showYear = false) {
  const d = new Date(dateObj);

  const y = d.getFullYear();

  const m = d.getMonth() + 1;

  const day = d.getDate();

  const h = String(d.getHours()).padStart(2, "0");

  const min = String(d.getMinutes()).padStart(2, "0");

  if (showYear) {
    return `${y}/${m}/${day} ${h}:${min}`;
  }

  return `${m}/${day} ${h}:${min}`;
}

// ----------------------------
// 設定画面
// ----------------------------
function toggleSettings() {
  const panel = document.getElementById("settings-panel");

  if (panel) {
    panel.classList.toggle("open");
  }
}

// ----------------------------
// 初期化
// ----------------------------
window.addEventListener("DOMContentLoaded", () => {
  // 初期ボタン（普通）
  const moodBtns = document.querySelectorAll("#mood-btns button");

  const condBtns = document.querySelectorAll("#cond-btns button");

  if (moodBtns[1]) {
    moodBtns[1].classList.add("active");
  }

  if (condBtns[1]) {
    condBtns[1].classList.add("active");
  }

  selectedMood = 5;
  selectedCond = 5;

  // 初期描画
  renderChart();

  renderLogs();

  console.log("InnerNote Ver0.2 Ready");
});
