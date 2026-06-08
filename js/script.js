import { Storage, saveData } from './storage.js';
import { toggleSettings, saveSettings } from './settings.js';
import { renderLogs } from './logs.js';

// 1. グローバル関数としてwindowに登録（これでHTMLから呼べるようになります）
window.toggleSettings = toggleSettings;
window.saveSettings = saveSettings;
window.saveData = saveData;

// ボタン選択用関数
window.selectMood = (el, val) => {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    window.currentMood = val;
};
window.selectCond = (el, val) => {
    document.querySelectorAll('.cond-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    window.currentCond = val;
};

// 2. ボタン描画処理
window.renderStep3Buttons = function() {
    const moodBtns = document.getElementById('mood-btns');
    const condBtns = document.getElementById('cond-btns');
    if (moodBtns) {
        moodBtns.innerHTML = `
            <div class="btn-group">
                <button class="mood-btn" onclick="selectMood(this, 1)">低い</button>
                <button class="mood-btn" onclick="selectMood(this, 2)">普通</button>
                <button class="mood-btn" onclick="selectMood(this, 3)">良い</button>
            </div>
        `;
    }
    if (condBtns) {
        condBtns.innerHTML = `
            <div class="btn-group">
                <button class="cond-btn" onclick="selectCond(this, 1)">悪い</button>
                <button class="cond-btn" onclick="selectCond(this, 2)">普通</button>
                <button class="cond-btn" onclick="selectCond(this, 3)">良い</button>
            </div>
        `;
    }
};

// 3. 初期化処理
window.onload = () => {
    const logs = Storage.getLogs();
    if (typeof renderLogs === 'function') renderLogs(logs);
    window.renderStep3Buttons(); // ボタンを描画
};
