const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

/* =========================
   LOGS（記録データ）
========================= */

function loadLogsData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveLogsData(logs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

/* =========================
   DIAGNOSIS（診断・属性）
========================= */

function saveDiagnosis(value) {
    localStorage.setItem(DIAGNOSIS_KEY, value);
}

function loadDiagnosis() {
    return localStorage.getItem(DIAGNOSIS_KEY);
}
