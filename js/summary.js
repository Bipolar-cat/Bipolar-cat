function generateSummaryData() {
    const logs = getAllLogs();

    if (logs.length === 0) {
        return null;
    }

    const total = logs.length;

    const avgMood =
        logs.reduce((sum, l) => sum + l.mood, 0) / total;

    const avgCond =
        logs.reduce((sum, l) => sum + l.cond, 0) / total;

    const diagCounts = {};

    logs.forEach(l => {
        const d = l.diagnosis || '未設定';
        diagCounts[d] = (diagCounts[d] || 0) + 1;
    });

    const topDiagnosis = Object.keys(diagCounts).reduce((a, b) =>
        diagCounts[a] > diagCounts[b] ? a : b
    , '未設定');

    const notes = logs
        .filter(l => l.note && l.note.trim() !== '')
        .map(l => l.note);

    const period = {
        start: logs[0].date,
        end: logs[logs.length - 1].date
    };

    return {
        total,
        avgMood: Number(avgMood.toFixed(1)),
        avgCond: Number(avgCond.toFixed(1)),
        topDiagnosis,
        notes,
        period
    };
}
