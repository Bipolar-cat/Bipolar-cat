function saveData() {
    const note = document.getElementById('note').value;

    const logs = loadLogsData();

    const now = new Date();
    const dateStr = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;

    logs.push({
        ts: now.getTime(),
        date: dateStr,
        mood: selectedMood,
        cond: selectedCond,
        note: note
    });

    saveLogs(logs);
    alert("記録しました！");
    location.reload();
}
