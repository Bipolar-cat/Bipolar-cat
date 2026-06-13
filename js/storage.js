console.log("storage.js loaded");

const STORAGE_KEY = "innernote_3step_logs";

function getLogs() {
    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
        || "[]"
    );
}

function saveLogs(logs) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(logs)
    );
}
