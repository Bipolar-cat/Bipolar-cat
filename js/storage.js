const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

export const Storage = {
    getLogs: () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
    saveLog: (log) => {
        const logs = Storage.getLogs();
        logs.push(log);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    },
    getDiagnosis: () => localStorage.getItem(DIAGNOSIS_KEY) || "未設定"
};

