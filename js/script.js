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
