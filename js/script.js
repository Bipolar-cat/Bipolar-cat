import { Storage } from './storage.js';
import { renderLogs } from './logs.js';
import { initChart } from './chart.js';

window.onload = () => {
    const logs = Storage.getLogs();
    renderLogs(logs);
    initChart(logs, (evt, elements) => { /* グラフのクリックイベント */ });
};

import { getSettings } from './storage.js';

window.onload = () => {
    const settings = getSettings();
    
    // settings.recordMode が 'step3' の場合にStep3用ボタンを表示
    if (settings.recordMode === 'step3') {
        renderStep3Buttons();
    } else {
        renderStep10Buttons();
    }
};

function renderStep3Buttons() {
    const moodBtns = document.getElementById('mood-btns');
    moodBtns.innerHTML = `
        <button onclick="setMood(1)">低</button>
        <button onclick="setMood(2)">普通</button>
        <button onclick="setMood(3)">良い</button>
    `;
    // 体調ボタンも同様に生成
}


// 各JSファイルで定義した関数をHTMLから呼べるようにする
window.saveData = saveData;
window.toggleSettings = toggleSettings;
window.saveSettings = saveSettings;
