    console.log("script.js loaded");

let selectedMood = 2;
let selectedCond = 2;

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

function formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

window.onload = function () {
    renderLogs();
    renderChart();
};
