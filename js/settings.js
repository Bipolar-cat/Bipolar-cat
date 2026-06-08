import { DIAGNOSIS_KEY } from './storage.js';

export function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    if (!select.value) return;
    localStorage.setItem(DIAGNOSIS_KEY, select.value);
    // UI反映処理をここに追加
}

export function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
}
// HTMLのonclickから呼ぶためにwindowへ登録
window.toggleSettings = toggleSettings;
