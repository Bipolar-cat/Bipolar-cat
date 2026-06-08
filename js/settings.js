import { DIAGNOSIS_KEY } from './storage.js';

export function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    if (!select.value) return;
    localStorage.setItem(DIAGNOSIS_KEY, select.value);
    
    // UIへの反映処理（要素がある場合のみ実行）
    const diagText = document.getElementById('diagnosis-text');
    if (diagText) diagText.innerText = "診断名: " + select.value;
}

export function unlockDiagnosis() {
    localStorage.removeItem(DIAGNOSIS_KEY);
    location.reload();
}

export function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    // モーダルの表示・非表示をトグル
    modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
}

export function saveSettings() {
    // 画面上の全設定値を取得
    const settings = {
        diagnosis: document.getElementById('diagnosis-select').value,
        age: document.getElementById('age-select').value,
        recordMode: document.querySelector('input[name="recordMode"]:checked')?.value || 'step3',
        status: Array.from(document.querySelectorAll('input[name="status"]:checked')).map(el => el.value),
        family: Array.from(document.querySelectorAll('input[name="family"]:checked')).map(el => el.value)
    };
    
    localStorage.setItem('innernote_settings', JSON.stringify(settings));
    
    alert("保存しました！");
    toggleSettings();
    location.reload(); // 設定を反映させるためにリロード
}
