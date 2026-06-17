    console.log("script.js loaded");

let selectedMood = 2;
let selectedCond = 2;

function saveData() {
    console.log("保存ボタン押下");
    const logs = getLogs();
    const log = {
        date: formatDate(new Date()),
        mood: selectedMood,
        cond: selectedCond,
        note: document.getElementById("note").value
    };

    logs.push(log);
    
    saveLogs(logs);

    // メモをクリア
    document.getElementById("note").value = "";

    // 画面を更新
    if (typeof renderLogs === "function") {
        renderLogs();
    }

    if (typeof updateChart === "function") {
        updateChart();
    }
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
}

function formatDate(date) {

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}
