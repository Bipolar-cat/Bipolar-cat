function renderAnalysisDashboard() {
    const trend = analyzeTrend();
    const byDiag = analyzeByDiagnosis();
    const stability = calculateStability();

    const container = document.getElementById("analysis-dashboard");

    // 診断名ランキング化
    const diagList = Object.entries(byDiag)
        .sort((a, b) => b[1].avgMood - a[1].avgMood);

    container.innerHTML = `
        <div style="padding:15px; text-align:left;">

            <h3>📊 全体傾向</h3>
            <div>平均気分：${trend.avgMood}</div>
            <div>平均体調：${trend.avgCond}</div>
            <div>安定度：${stability}</div>

            <hr>

            <h3>🧠 診断名別ランキング（気分）</h3>
            ${diagList.map(d => `
                <div style="margin-bottom:6px;">
                    ${d[0]}：
                    気分 ${d[1].avgMood} /
                    体調 ${d[1].avgCond}
                    （${d[1].count}件）
                </div>
            `).join("")}

        </div>
    `;
}
