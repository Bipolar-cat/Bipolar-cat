// js/script.js
import { Storage, saveData } from './storage.js';
import { toggleSettings, saveSettings } from './settings.js';
import { renderLogs } from './logs.js';

// HTMLの onclick="..." で呼べるようにwindowへ登録
window.toggleSettings = toggleSettings;
window.saveSettings = saveSettings;
window.saveData = saveData;

// グローバル関数として登録
window.setMood = (val) => { 
    window.currentMood = val; 
    console.log("Mood set to:", val); 
};
window.setCond = (val) => { 
    window.currentCond = val; 
    console.log("Cond set to:", val); 
};

window.onload = () => {
    // ログ表示
    const logs = Storage.getLogs();
    if (typeof renderLogs === 'function') renderLogs(logs);

    // ボタンの描画
    renderMoodButtons();
};

function renderMoodButtons() {
    const moodBtns = document.getElementById('mood-btns');
    const condBtns = document.getElementById('cond-btns');
    if (moodBtns) {
        moodBtns.innerHTML = `
            <button onclick="setMood(1)">低</button>
            <button onclick="setMood(2)">普通</button>
            <button onclick="setMood(3)">良い</button>
        `;
    }
    if (condBtns) {
        condBtns.innerHTML = `
            <button onclick="setCond(1)">悪い</button>
            <button onclick="setCond(2)">普通</button>
            <button onclick="setCond(3)">良い</button>
        `;
    }
}
