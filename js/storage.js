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

function formatDateTime(date) {

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}
