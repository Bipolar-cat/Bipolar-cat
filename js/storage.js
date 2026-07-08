/* =========================
   storage.js
   localStorage・設定管理
========================= */

// ----------------------------
// 保存キー
// ----------------------------
const STORAGE_KEY = "innernote_logs";
const MODE_KEY = "innernote_mode";

// ----------------------------
// ログ取得
// ----------------------------
function getLogs() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("ログ読み込み失敗", e);
    return [];
  }
}

// ----------------------------
// ログ保存
// ----------------------------
function saveLogs(logs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (e) {
    console.error("ログ保存失敗", e);
  }
}

// ----------------------------
// モード取得
// step3 / step10
// ----------------------------
function getMode() {
  return localStorage.getItem(MODE_KEY) || "step3";
}

// ----------------------------
// モード保存
// ----------------------------
function saveMode(mode) {
  localStorage.setItem(MODE_KEY, mode);
}

// ----------------------------
// 日付フォーマット
// ----------------------------
function formatDate(dateObj, showYear = true) {
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
