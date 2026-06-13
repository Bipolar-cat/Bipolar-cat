<script>
        const STORAGE_KEY = 'innernote_3step_logs';
        let selectedMood = 2;
        let selectedCond = 2;

        function setVal(type, val, btn) {
            const parent = btn.parentElement;
            parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (type === 'mood') selectedMood = val;
            else selectedCond = val;
        }

        function saveData() {
            const note = document.getElementById('note').value;
            const now = new Date();
            const dateStr = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            logs.push({ date: dateStr, mood: selectedMood, cond: selectedCond, note: note, ts: now.getTime() });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
            
            alert("記録しました！");
            location.reload();
        }

        function generateSummary() {
            const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            if (logs.length === 0) return alert("まとめを作成するための記録がありません。");

            const lastSummaryTs = parseInt(localStorage.getItem('last_summary_ts_step3') || '0');
            let targets = logs.filter(l => (l.ts || 0) > lastSummaryTs);
            
            if (targets.length === 0) {
                if(confirm("前回作成以降の新しい記録がありません。直近のデータを再集計しますか？")) {
                    targets = logs.slice(-10); 
                } else {
                    return;
                }
            }
            
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
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: last10.map(l => l.date),
                    datasets: [
                        { 
                            label: '気分', data: last10.map(l => l.mood), 
                            borderColor: '#2196F3', backgroundColor: '#2196F3', 
                            borderWidth: 2, tension: 0.3, fill: false, 
                            pointRadius: 4, pointHitRadius: 15 
                        },
                        { 
                            label: '体調', data: last10.map(l => l.cond), 
                            borderColor: '#FFA726', backgroundColor: '#FFA726', 
                            borderWidth: 2, tension: 0.3, fill: false, 
                            pointRadius: 4, pointHitRadius: 15 
                        }
                    ]
                },
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

