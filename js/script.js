// js/script.js
import { Storage, saveData, getSettings } from './storage.js';
import { toggleSettings } from './settings.js'; // settings.js からインポート

// windowへの登録
window.toggleSettings = toggleSettings;
window.saveData = saveData;

window.onload = () => {
    // 既存の初期化処理
    const logs = Storage.getLogs();
    renderLogs(logs);
    
    // 設定による画面生成
    const settings = Storage.getSettings();
    if (settings.recordMode === 'step3') {
        renderStep3Buttons();
    }
    // ...
};

// 4. 関数定義
function renderStep3Buttons() {
    const moodBtns = document.getElementById('mood-btns');
    if (moodBtns) {
        moodBtns.innerHTML = `
            <button onclick="setMood(1)">低</button>
            <button onclick="setMood(2)">普通</button>
            <button onclick="setMood(3)">良い</button>
        `;
    }
}

function renderStep10Buttons() {
    // 10段階用の処理をここに書く
}
