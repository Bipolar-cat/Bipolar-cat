import { DIAGNOSIS_KEY } from './storage.js';

export function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    if (!select.value) return;
    localStorage.setItem(DIAGNOSIS_KEY, select.value);
    // UI反映処理をここに追加
}
