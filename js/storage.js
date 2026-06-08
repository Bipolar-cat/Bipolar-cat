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

// js/storage.js
export const SETTINGS_KEY = 'innernote_settings';

export const getSettings = () => {
    // 初期値として recordMode: 'step3' を設定
    const defaultSettings = { recordMode: 'step3', diagnosis: '未設定', age: '' };
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || defaultSettings;
};

// js/storage.js
export const DIAGNOSIS_KEY = 'diagnosis_data'; // この行が必要です！
export const saveData = () => { ... };
