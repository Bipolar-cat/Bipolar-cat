// 【重要】インポートは一度だけ書く
import { Storage, saveData as importedSaveData, getSettings } from './storage.js';
import { renderLogs } from './logs.js';
import { initChart } from './chart.js';
import { toggleSettings, lockDiagnosis, unlockDiagnosis } from './settings.js';

// 名前を一度だけwindowに登録（重複させない）
window.toggleSettings = toggleSettings;
window.saveData = importedSaveData; // インポートした関数を登録
window.lockDiagnosis = lockDiagnosis;
window.unlockDiagnosis = unlockDiagnosis;

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
