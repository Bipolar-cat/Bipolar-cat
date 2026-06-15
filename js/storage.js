const STORAGE_KEY =
    "innernote_3step_logs";

function getLogs() {

    try {

        return JSON.parse(
            localStorage.getItem(
                STORAGE_KEY
            ) || "[]"
        );

    } catch(e) {

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
    } catch(e) {
        console.error("保存失敗:", e);
    }
}
