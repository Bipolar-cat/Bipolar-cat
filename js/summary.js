function generateSummary() {

    const logs = getLogs();

    if (logs.length === 0) return;

    const last10 = logs.slice(-10);

    alert(`${last10.length}件を分析`);
}
