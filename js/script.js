let selectedMood = 2;
let selectedCond = 2;

function saveData() {

    const logs = getLogs();
    const now = Date.now();
    const note = document.getElementById("note").value;

    logs.push({
        ts: now,
        date: formatDate(now),
        mood: selectedMood,
        cond: selectedCond,
        note: note
    });

    saveLogs(logs);
    renderLogs();
    renderChart();
}
