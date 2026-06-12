const logs = getLogs();

logs.push({
    date: dateStr,
    mood: selectedMood,
    cond: selectedCond,
    note: note,
    ts: now.getTime()
});

saveLogs(logs);
