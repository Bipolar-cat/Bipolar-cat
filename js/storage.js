// キーの定義は1箇所にまとめる
const STORAGE_KEY = 'innernote_vfinal_400_logs';
export const DIAGNOSIS_KEY = 'innernote_saved_diagnosis'; // 統一しました
export const SETTINGS_KEY = 'innernote_settings';

// ストレージ操作をまとめたオブジェクト
export const Storage = {
    getLogs: () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
    saveLog: (log) => {
        const logs = Storage.getLogs();
        logs.push(log);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    },
    getDiagnosis: () => localStorage.getItem(DIAGNOSIS_KEY) || "未設定",
    getSettings: () => {
        const defaultSettings = { recordMode: 'step3', diagnosis: '未設定', age: '' };
        return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || defaultSettings;
    }
};

// 記録保存用関数（必要な処理をここに書く）
export const saveData = () => {
    // 実際に保存するロジックをここに書きます
    console.log("データを保存しました");
};
