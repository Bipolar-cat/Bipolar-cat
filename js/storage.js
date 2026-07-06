const STORAGE_KEY = "innernote3step_logs";

// ----------------------------
// localStorage
// ----------------------------
function getLogs() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveLogs(logs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

// ----------------------------
// 日付フォーマット
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
// 表示モード設定
// ----------------------------
const MODE_KEY = "innernote_mode";

function getMode() {
  return localStorage.getItem(MODE_KEY) || "step3";
}

function saveMode(mode) {
  localStorage.setItem(MODE_KEY, mode);
}
