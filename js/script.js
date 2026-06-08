// 1. すべてのインポートを一番上にまとめる
import { Storage, saveData, getSettings } from './storage.js'; // getSettingsも追加
import { renderLogs } from './logs.js';
import { initChart } from './chart.js';
import { toggleSettings, lockDiagnosis, unlockDiagnosis } from './settings.js';

// 2. HTMLのonclickから呼べるようにwindowに登録
window.toggleSettings = toggleSettings;
window.saveData = saveData;
window.lockDiagnosis = lockDiagnosis;
window.unlockDiagnosis = unlockDiagnosis;

// 3. 全ての初期化処理を1つの onload にまとめる
window.onload = () => {
    // ログとグラフの初期化
    const logs = Storage.getLogs();
    renderLogs(logs);
    initChart(logs, (evt, elements) => { /* グラフのクリックイベント */ });

    // モード切り替えの処理
    const settings = Storage.getSettings();
    console.log("現在のモード:", settings.recordMode);
    
    if (settings.recordMode === 'step3') {
        renderStep3Buttons();
    } else {
        renderStep10Buttons();
    }
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
