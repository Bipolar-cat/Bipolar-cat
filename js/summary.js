function generateSummary() {
    const logs = loadLogsData();
    if (!logs.length) return alert("データなし");

    const avgMood = logs.reduce((a,b)=>a+b.mood,0)/logs.length;
    const avgCond = logs.reduce((a,b)=>a+b.cond,0)/logs.length;

    document.getElementById('summary-card').style.display = 'block';

    document.getElementById('summary-content').innerHTML = `
        <div>平均気分: ${avgMood.toFixed(1)}</div>
        <div>平均体調: ${avgCond.toFixed(1)}</div>
    `;
}
