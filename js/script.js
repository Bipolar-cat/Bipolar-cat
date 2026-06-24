/*script.js 〇
* 画面制御+イベント
*ボタン
*フォーム
*イベント
*画面更新
*const text = generateSummary(logs);

alert(text);/*

        console.log("script.js loaded");

let selectedMood = 5;
let selectedCond = 5;

function saveData() {

    const logs = getLogs();

    logs.push({
        date: formatDate(new Date()),
        mood: selectedMood,
        cond: selectedCond,
        note: document.getElementById("note").value
    });

    
    console.log(logs);   // ←追加

    saveLogs(logs);

    renderLogs();
    renderChart();
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

function formatDate(dateStr, showYear = false) {

    const d = new Date(dateStr);

    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();

    const h = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");

    return showYear
        ? `${y}/${m}/${day} ${h}:${min}`
        : `${m}/${day} ${h}:${min}`;
}

window.onload = function () {
    renderLogs();
    renderChart();

    document
        .querySelector("#mood-btns button:nth-child(2)")
        .classList.add("active");

    document
        .querySelector("#cond-btns button:nth-child(2)")
        .classList.add("active");

    selectedMood = 2;
    selectedCond = 2;
};
