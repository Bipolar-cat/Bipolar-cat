/*script.js 〇
 * 画面制御+イベント
 * ボタン、フォーム、イベント、画面更新
 */

console.log("script.js loaded");

let selectedMood = 5;
let selectedCond = 5;

function saveData() {
    const logs = getLogs();
    const saveBtn = document.querySelector(".save-btn");
    const statusEl = document.getElementById("status");

    logs.push({
        date: formatDate(new Date()),
        mood: selectedMood,
        cond: selectedCond,
        note: document.getElementById("note").value
    });

    console.log("New log saved:", logs[logs.length - 1]);

    saveLogs(logs);

    // ✅ ボタンにビジュアルフィードバック（縮む効果）
    if (saveBtn) {
        saveBtn.classList.add("saving");
        saveBtn.textContent = "✔️ ログを残す";
        
        // ステータステキストも表示
        if (statusEl) {
            statusEl.textContent = "✔️ ログを記録しました！";
            statusEl.classList.add("show");
            
            // 2秒後にステータスを消す
            setTimeout(() => {
                statusEl.classList.remove("show");
                statusEl.textContent = "";
            }, 2000);
        }

        // 1秒後にボタンを戻す
        setTimeout(() => {
            saveBtn.classList.remove("saving");
            saveBtn.textContent = "記録する";
        }, 1000);
    }

    // UI更新
    renderLogs();
    renderChart();

    // フォームをリセット
    document.getElementById("note").value = "";
}

function setVal(type, val, btn) {
    const parent = btn.parentElement;
    parent.querySelectorAll("button")
        .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (type === "mood") {
        selectedMood = val;
    } else {
        selectedCond = val;
    }

    console.log(
        "selectedMood =", selectedMood,
        "selectedCond =", selectedCond
    );
}

function formatDate(dateObj, showYear = false) {
    const d = new Date(dateObj);

    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();

    const h = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");

    return showYear
        ? `${y}/${m}/${day} ${h}:${min}`
        : `${m}/${day} ${h}:${min}`;
}

function toggleSettings() {
    const panel = document.getElementById("settings-panel");
    if (panel) {
        panel.style.display = 
            panel.style.display === "none" ? "block" : "none";
    }
}

window.onload = function () {
    // グラフとログを初期化
    renderLogs();
    renderChart();

    // ✅ ボタンが 1, 5, 10 なので初期値を 5（普通）に設定
    const moodBtns = document.querySelectorAll("#mood-btns button");
    const condBtns = document.querySelectorAll("#cond-btns button");

    // 中央ボタン（index 1）が「普通」＝ 5
    if (moodBtns[1]) {
        moodBtns[1].classList.add("active");
        selectedMood = 5;
    }

    if (condBtns[1]) {
        condBtns[1].classList.add("active");
        selectedCond = 5;
    }

    console.log("Initialized - selectedMood:", selectedMood, "selectedCond:", selectedCond);
};
