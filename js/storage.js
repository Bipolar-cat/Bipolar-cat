<<<<<<< HEAD
=======
/*storage.js ◎
 * localStorage専用
 *保存・読み込み
 * UI処理を書かない
 * getLogs()
 * saveLogs()
 */

>>>>>>> 2571b7275aec63c51187926138b64065b9618389
const STORAGE_KEY = "innernote3step_logs";

// ----------------------------
// localStorage
// ----------------------------
function getLogs() {
<<<<<<< HEAD
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
=======

    try {
        return JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );
    } catch (e) {
        console.error(e);
        return [];
    }

}

function saveLogs(logs) {

    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(logs)
        );
    } catch (e) {
        console.error("保存失敗:", e);
    }

>>>>>>> 2571b7275aec63c51187926138b64065b9618389
}
