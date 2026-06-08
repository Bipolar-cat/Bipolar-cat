import { Storage, saveData } from './storage.js';
import { toggleSettings, saveSettings } from './settings.js';
import { renderLogs } from './logs.js';

// HTMLから直接関数を呼べるようにする
window.toggleSettings = toggleSettings;
window.saveSettings = saveSettings; // 保存ボタン用
window.saveData = saveData;         // 記録ボタン用

// 関数定義を追加
window.renderStep3Buttons = function() {
    const moodBtns = document.getElementById('mood-btns');
    if (moodBtns) {
        moodBtns.innerHTML = `
            <button onclick="setMood(1)">低</button>
            <button onclick="setMood(2)">普通</button>
            <button onclick="setMood(3)">良い</button>
        `;
    }
};

window.onload = () => {
    const logs = Storage.getLogs();
    if (typeof renderLogs === 'function') renderLogs(logs);
    
    // Step3ボタンの呼び出し
    if (typeof window.renderStep3Buttons === 'function') {
        window.renderStep3Buttons();
    }
};

// 追加：ボタンから呼ばれる関数をwindowに登録
window.setMood = function(val) {
    console.log("気分がセットされました:", val);
    // ここに記録用のロジック（または状態保持）を実装していきます
};
