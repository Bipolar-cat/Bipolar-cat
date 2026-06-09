// =========================
// LocalStorage管理
// =========================

const STORAGE_KEY = "innernote_logs";
const SETTINGS_KEY = "innernote_settings";

// 記録取得
function getLogs() {
    return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );
}

// 記録保存
function saveLogs(logs) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(logs)
    );
}

// 設定取得
function getSettings() {
    return JSON.parse(
        localStorage.getItem(SETTINGS_KEY) || "{}"
    );
}

// 設定保存
function saveSettings(settings) {
    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );
}
