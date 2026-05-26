window.onerror = function(msg, url, line) {
    console.log("エラー発生: " + msg + " (行: " + line + ")");
};

let selectedMood = 5, selectedCond = 5;
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

document.addEventListener('DOMContentLoaded', () => {
    // 1. 診断名の復元
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    if (savedDiagnosis) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `主な診断名: ${savedDiagnosis}`;
    }

    // 2. ボタン生成
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');
    
    // 3. ログの描画
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    renderLogList(logs);
    
    // 4. グラフ描画
    if (logs.length > 0) {
const latestLogs = allLogs.slice(-10);
renderChart(latestLogs);
});

function renderLogList(logs) {
    const logList = document.getElementById('log-list');
    if (!logList) return;
    logList.innerHTML = ''; // クリア
    logs.slice().reverse().forEach(l => {
        const div = document.createElement('div');
        div.className = 'log-item';
        div.innerHTML = `<span class="log-date">${l.date}</span>気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
        logList.appendChild(div);
    });
}

function renderChart(allLogs) {
    const canvas = document.getElementById('myChart');
    if (!canvas) return;

    // 既のグラフを破棄
    // renderChart関数内を以下のように書き換えます
window.myChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
        // 日本形式（MM/DD HH:mm）で表示し、改行して時間を表示
        labels: allLogs.map(l => {
            const dateParts = l.date.split(' '); // "2026/5/26" と "09:12" に分ける
            const dayPart = dateParts[0].split('/').slice(1).join('/'); // 月/日 に加工
            return dayPart + '\n' + dateParts[1];
        }),
        datasets: [
            { label: '気分', data: allLogs.map(l => l.mood), borderColor: '#3b82f6', tension: 0.3 },
            { label: '体調', data: allLogs.map(l => l.cond), borderColor: '#f59e0b', tension: 0.3 }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: { display: true, text: '今の気分・体調の推移', font: { size: 16 } },
            legend: { position: 'top' }
        },
        scales: {
            x: { 
                ticks: { 
                    font: { size: 9 }, 
                    maxRotation: 45, // ★ここを 45 にすると斜めになります
                    minRotation: 45 
                }
            },
            y: { min: 0, max: 10, ticks: { stepSize: 1 } }
        }
    }
});
}

function createCircleButtons(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.type = "button";
        if (i === 5) btn.classList.add('active');
        btn.onclick = function() {
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (type === 'mood') selectedMood = i;
            else selectedCond = i;
        };
        container.appendChild(btn);
    }
}

function saveData() {
    const note = document.getElementById('note').value;
    let diagnosisVal = localStorage.getItem(DIAGNOSIS_KEY) || "双極症";
    const select = document.getElementById('diagnosis-select');
    if (select && select.value) diagnosisVal = select.value;

    const now = new Date();
    const dateStr = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    logs.push({ 
        ts: now.getTime(), date: dateStr, diagnosis: diagnosisVal,
        mood: selectedMood, cond: selectedCond, note: note 
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    alert("記録しました！");
    location.reload();
}
