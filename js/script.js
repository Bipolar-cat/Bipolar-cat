import { Storage, saveData } from './storage.js';
import { toggleSettings, saveSettings } from './settings.js';
import { renderLogs } from './logs.js';

// HTMLから直接関数を呼べるようにする
window.toggleSettings = toggleSettings;
window.saveSettings = saveSettings; // 保存ボタン用
window.saveData = saveData;         // 記録ボタン用

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

window.renderStep3Buttons = function() {
    const moodBtns = document.getElementById('mood-btns');
    const condBtns = document.getElementById('cond-btns');

    // 気分ボタン生成
    moodBtns.innerHTML = `
        <div class="btn-group">
            <button class="mood-btn" onclick="selectMood(this, 1)">低</button>
            <button class="mood-btn" onclick="selectMood(this, 2)">普通</button>
            <button class="mood-btn" onclick="selectMood(this, 3)">良い</button>
        </div>
    `;

    // 体調ボタン生成
    condBtns.innerHTML = `
        <div class="btn-group">
            <button class="cond-btn" onclick="selectCond(this, 1)">悪い</button>
            <button class="cond-btn" onclick="selectCond(this, 2)">普通</button>
            <button class="cond-btn" onclick="selectCond(this, 3)">良い</button>
        </div>
    `;
};

// 選択状態の切り替えロジック
window.selectMood = (el, val) => {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    window.currentMood = val; // 記録用に値を保持
};

window.selectCond = (el, val) => {
    document.querySelectorAll('.cond-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    window.currentCond = val; // 記録用に値を保持
};

export function saveData() {
    const note = document.getElementById('note').value;
    // window.currentMood / window.currentCond に値が入っているか確認
    if (!window.currentMood || !window.currentCond) {
        alert("気分と体調を選択してください");
        return;
    }

    const newLog = { 
        mood: window.currentMood, 
        cond: window.currentCond,
        note: note, 
        timestamp: new Date().toISOString() 
    };
    // Storage.saveLog(newLog); // 既存の保存処理
    console.log("保存データ:", newLog);
    alert("記録しました！");
    location.reload();
}
