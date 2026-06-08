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

// js/settings.js
export function saveSettings() {
    const mode = document.querySelector('input[name="recordMode"]:checked').value;
    const settings = {
        recordMode: mode,
        diagnosis: document.getElementById('diagnosis-select').value
        // 他の属性・環境項目もここに追加
    };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    location.reload(); // 設定を反映
}
