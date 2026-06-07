function renderAnalysisDashboard() {
    const trend = analyzeTrend();
    const byDiag = analyzeByDiagnosis();
    const stability = calculateStability();

    const container = document.getElementById("analysis-dashboard");

    container.innerHTML = `
        <div>平均気分：${trend.avgMood}</div>
        <div>平均体調：${trend.avgCond}</div>
        <div>安定度：${stability}</div>
    `;
}
