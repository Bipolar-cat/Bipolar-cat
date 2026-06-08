import { DIAGNOSIS_KEY } from './storage.js';

export function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    if (!select.value) return;
    localStorage.setItem(DIAGNOSIS_KEY, select.value);
    // UI反映処理をここに追加
}

export function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.style.display = (modal.style.display === 'none') ? 'block' : 'none';
}
// HTMLのonclickから呼ぶためにwindowへ登録
window.toggleSettings = toggleSettings;

export function saveSettings() {
    // 各値を取得
    const settings = {
        diagnosis: document.getElementById('diagnosis-select').value,
        age: document.getElementById('age-select').value,
        status: Array.from(document.querySelectorAll('input[name="status"]:checked')).map(el => el.value),
        family: Array.from(document.querySelectorAll('input[name="family"]:checked')).map(el => el.value),
        mode: document.querySelector('input[name="recordMode"]:checked').value
    };
    
    // 保存
    localStorage.setItem('user_settings', JSON.stringify(settings));
    
    // 診断名テキストの更新
    document.getElementById('diagnosis-text').innerText = "診断名: " + settings.diagnosis;
    
    // モーダルを閉じる
    toggleSettings();
    location.reload(); // 設定反映のためリロード
}

