const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

function saveLogs(logs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

function loadLogsData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveDiagnosis(value) {
    localStorage.setItem(DIAGNOSIS_KEY, value);
}

function loadDiagnosis() {
    return localStorage.getItem(DIAGNOSIS_KEY);
}
