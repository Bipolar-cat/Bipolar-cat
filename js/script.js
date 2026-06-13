function debug(msg){
    const panel =
        document.getElementById(
            "debug-panel"
        );

    if(panel){
        panel.innerHTML +=
            "<div>" + msg + "</div>";

        panel.scrollTop =
            panel.scrollHeight;
    }
}

function toggleDebug(){
    const panel =
        document.getElementById(
            "debug-panel"
        );

    if(panel.style.display==="block"){
        panel.style.display="none";

    }else{
        panel.style.display="block";
    }
}

window.onerror = function(
    message,
    source,
    line
){

    debug(
        "❌ " +
        message +
        " (line " +
        line +
        ")"
    );

    return true;
};

console.log("script.js loaded");
     function generateSummary() {
            
            const avgMood = (targets.reduce((acc, curr) => acc + curr.mood, 0) / targets.length).toFixed(1);
            const avgCond = (targets.reduce((acc, curr) => acc + curr.cond, 0) / targets.length).toFixed(1);
            
            const notesList = targets.filter(l => l.note && l.note.trim() !== '').map(l => `・ ${l.note}`).join('<br>');
            const periodStr = `${targets[0].date.split(' ')[0]} ～ ${targets[targets.length-1].date.split(' ')[0]}`;

            document.getElementById('summary-card').style.display = 'block';
            document.getElementById('summary-content').innerHTML = `
                <div class="report-item"><span class="report-label">対象期間:</span> ${periodStr} (${targets.length}件の記録)</div>
                <div class="report-item"><span class="report-label">平均気分:</span> ${avgMood} / 3.0</div>
                <div class="report-item"><span class="report-label">平均体調:</span> ${avgCond} / 3.0</div>
                <div class="report-item" style="margin-top: 8px;"><span class="report-label">期間中のメモ:</span></div>
                <div class="report-notes">${notesList || '（この期間のメモはありません）'}</div>
            `;

            const now = new Date();
            const nowStr = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            localStorage.setItem('last_summary_ts_step3', now.getTime());
            localStorage.setItem('last_summary_str_step3', nowStr);
            document.getElementById('summary-ts').innerText = `前回まとめ作成：${nowStr}`;
        }

        window.onload = () => {
            const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            const last10 = logs.slice(-10);
            
            const savedStr = localStorage.getItem('last_summary_str_step3');
            if (savedStr) document.getElementById('summary-ts').innerText = `前回まとめ作成：${savedStr}`;

            const ctx = document.getElementById('myChart').getContext('2d');
                
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: { padding: { left: 10, right: 10, bottom: 5 } },
                    interaction: { mode: 'index', intersect: false },
                    onClick: (evt, elements, chart) => {
                        const points = chart.getElementsAtEventForMode(evt, 'index', { intersect: false }, true);
                        if (points.length > 0) {
                            scrollToLog(last10[points[0].index].date);
                        }
                    },
                    scales: {
                        x: { 
                            ticks: { 

　// 【修正】ラベルをスキップせず、45度に傾けて1行ですべて表示する
                                autoSkip: false,
                                maxRotation: 45, 
                                minRotation: 45, 
                                font: { size: 9 },
                                color: '#666'
                            },
                            grid: { display: false }
                        },
                        y: { 
                            min: 0.8, max: 3.2,
                            ticks: { 
                                stepSize: 1, 
                                callback: v => v==3?'良い':v==2?'普通':v==1?'低/悪':'',
                                font: { size: 10 }, color: '#aaa'
                            },
                            grid: { color: '#f0f0f0' }
                        }
                    },
                    plugins: { 
                        legend: { position: 'top', labels: { boxWidth: 10, font: { size: 12 } } }
                    }
                }
            });

            function scrollToLog(dateStr) {
                const logItems = document.querySelectorAll('.log-item');
                logItems.forEach(item => {
                    item.classList.remove('highlight');
                    if (item.querySelector('.log-date').innerText === dateStr) {
                        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        item.classList.add('highlight');
                    }
                });
            }

            const logList = document.getElementById('log-list');
            logs.slice().reverse().forEach(l => {
                const div = document.createElement('div');
                div.className = 'log-item';
                div.innerHTML = `<span class="log-date">${l.date}</span>気分: ${l.mood==3?'良い':l.mood==2?'普通':'低'} / 体調: ${l.cond==3?'良い':l.cond==2?'普通':'悪い'}<br>${l.note}`;
                logList.appendChild(div);
            });
        };

window.onload = () => {

    console.log("window.onload");

    try {

        renderChart();
        console.log("renderChart OK");

    } catch(e) {

        console.error(
            "renderChart ERROR",
            e
        );

    }

    try {

        renderLogList();
        console.log("renderLogList OK");

    } catch(e) {

        console.error(
            "renderLogList ERROR",
            e
        );

    }

};
