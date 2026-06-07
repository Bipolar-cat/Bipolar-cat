function addLog(entry) {
    const logs = getAllLogs();
    logs.push(entry);
    saveLogsData(logs);
}

function getAllLogs() {
    return loadLogsData();
}

function getRecentLogs(n) {
    const logs = getAllLogs();
    return logs.slice(-n);
}

function formatLog(log) {
    const diagBadge =
        log.diagnosis && log.diagnosis !== '未診断（健常者）'
        ? `【${log.diagnosis}】`
        : '';

    return {
        ...log,
        displayText: `${log.date} ${diagBadge} 気分:${log.mood} 体調:${log.cond}`
    };
}
