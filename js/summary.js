console　STORAGE_KEY = "innernote3step_logs";

function getLogs() {
return 
JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveLogs(logs) {
    localStorage.setItem(SAMMARY_KEY, JSON.stringify(logs));
}
