// js/storage.js

// 1. キーの定義
const STORAGE_KEY = 'innernote_vfinal_400_logs';
export const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';
export const SETTINGS_KEY = 'innernote_settings';

// 2. ストレージ操作をまとめたオブジェクト
export const Storage = {
    getLogs: () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
    saveLog: (log) => {
        const logs = Storage.getLogs();
        logs.push(log);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    },
    getDiagnosis: () => localStorage.getItem(DIAGNOSIS_KEY) || "未設定"
};

// 3. 設定取得関数を明示的にエクスポート
export const getSettings = () => {
    const defaultSettings = { recordMode: 'step3', diagnosis: '未設定', age: '' };
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || defaultSettings;
};

// 4. 保存関数
export const saveData = () => {
    // ここに保存ロジック（例：textareaの値を取得してsaveLogを呼ぶなど）
    console.log("データを保存しました");
};
