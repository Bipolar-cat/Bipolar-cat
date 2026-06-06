function getEvaluationLabel(val) {

    if (val >= 7.5) return '良好';
    if (val >= 4.5) return '普通';

    return '低下気味';
}

function generateSummary() {

    const logs =
        JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        );

    if (!logs.length) {
        alert("まとめを作成するための記録がありません。");
        return;
    }

    const lastSummaryTs =
        parseInt(
            localStorage.getItem(
                'last_summary_ts_final'
            ) || '0'
        );

    let targets =
        logs.filter(
            l =>
                (l.ts || new Date(l.date).getTime())
                > lastSummaryTs
        );

    if (!targets.length) {

        if (confirm(
            "前回作成以降の新しい記録がありません。直近のデータを再集計しますか？"
        )) {

            targets = logs.slice(-10);

        } else {
            return;
        }
    }

    const avgMood =
        (
            targets.reduce(
                (a,c)=>a+c.mood,
                0
            ) / targets.length
        ).toFixed(1);

    const avgCond =
        (
            targets.reduce(
                (a,c)=>a+c.cond,
                0
            ) / targets.length
        ).toFixed(1);

    const diagCounts = {};

    targets.forEach(t => {

        const d =
            t.diagnosis || '指定なし';

        diagCounts[d] =
            (diagCounts[d] || 0) + 1;
    });

    const topDiagnosis =
        Object.keys(diagCounts)
        .reduce(
            (a,b)=>
                diagCounts[a] > diagCounts[b]
                    ? a
                    : b,
            '指定なし'
        );

    const notesList =
        targets
            .filter(
                l =>
                    l.note &&
                    l.note.trim() !== ''
            )
            .map(
                l => `・ ${l.note}`
            )
            .join('<br>');

    const periodStr =
        `${targets[0].date.split(' ')[0]} ～ `
        + `${targets[targets.length-1].date.split(' ')[0]}`;

    document.getElementById(
        'summary-card'
    ).style.display = 'block';

    document.getElementById(
        'summary-content'
    ).innerHTML = `
        <div class="report-item">
        <span class="report-label">対象期間:</span>
        ${periodStr}
        </div>

        <div class="report-item">
        <span class="report-label">主な診断名:</span>
        ${topDiagnosis}
        </div>

        <div class="report-item">
        <span class="report-label">平均気分:</span>
        ${avgMood}
        </div>

        <div class="report-item">
        <span class="report-label">平均体調:</span>
        ${avgCond}
        </div>

        <div class="report-notes">
        ${notesList || '（メモなし）'}
        </div>
    `;
}
