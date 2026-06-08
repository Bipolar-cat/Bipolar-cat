import { Storage, saveData, getSettings } from './storage.js';
import { toggleSettings } from './settings.js';
import { renderLogs } from './logs.js'; // これが必要！
// 必要であれば initChart などもここへ

window.toggleSettings = toggleSettings;
window.saveData = saveData;
window.setMood = (val) => { console.log("Mood set to:", val); }; // 例：setMoodの仮定義

window.onload = () => {
    // ログの描画
    const logs = Storage.getLogs();
    if (typeof renderLogs === 'function') {
        renderLogs(logs);
    }
    
    // 設定による画面生成
    const settings = getSettings(); // Storage.getSettings() または単体インポートした関数を使用
    if (settings.recordMode === 'step3') {
        renderStep3Buttons();
    } else {
        renderStep10Buttons();
    }
};

function renderStep10Buttons() {
    const moodBtns = document.getElementById('mood-btns');
    if (moodBtns) moodBtns.innerHTML = "10段階ボタンをここに生成";
}
