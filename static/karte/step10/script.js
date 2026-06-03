function renderScrollableChart(logs) {
    const canvas = document.getElementById('myChart');
    // ...ここにChartを描画する処理...
}
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';
let selectedMood = 5, selectedCond = 5;
let highlightTimeout = null;

// --- ボタン生成ロジック（統合版） ---
function createRatingButtons(containerId, groupName) {
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.type = 'button';
        if (i === 5) btn.classList.add('active'); // 初期値5
        btn.onclick = function() {
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (groupName === 'mood') selectedMood = i;
            else selectedCond = i;
        };
        container.appendChild(btn);
    }
}

// --- 診断名管理 ---
function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    if (!select.value) return;
    localStorage.setItem(DIAGNOSIS_KEY, select.value);
    document.getElementById('diagnosis-text').innerText = `診断名: ${select.value}`;
    document.getElementById('diagnosis-select-container').style.display = 'none';
    document.getElementById('diagnosis-fixed-container').style.display = 'flex';
}

function unlockDiagnosis() {
    document.getElementById('diagnosis-select-container').style.display = 'block';
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
}

// --- 保存処理 ---
function saveData() {
    const note = document.getElementById('note').value;
    const diagnosisVal = localStorage.getItem(DIAGNOSIS_KEY) || "未設定";
    const now = new Date();
    const dateStr = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    logs.push({ ts: now.getTime(), date: dateStr, diagnosis: diagnosisVal, mood: selectedMood, cond: selectedCond, note: note });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    alert("記録しました！");
    location.reload();
}

// --- 初期化処理 ---
window.onload = () => {
    // ボタン生成
    createRatingButtons('mood-btns', 'mood');
    createRatingButtons('cond-btns', 'cond');

    // 診断名の復元
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    if (savedDiagnosis) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `診断名: ${savedDiagnosis}`;
    }

    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const logList = document.getElementById('log-list');

    // 履歴描画
    logs.slice().reverse().forEach(l => {
        const div = document.createElement('div');
        div.className = 'log-item';
        div.id = `log-${l.ts}`;
        div.innerHTML = `<span class="log-date">${l.date}</span>気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
        logList.appendChild(div);
    });

    // グラフ描画
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: logs.map(l => l.date),
            datasets: [
                { label: '気分', data: logs.map(l => l.mood), borderColor: '#3b82f6', tension: 0.3 },
                { label: '体調', data: logs.map(l => l.cond), borderColor: '#f59e0b', tension: 0.3 }
            ]
        },
        
        // 記録を保存する関数
function saveRecord(data) {
    let records = JSON.parse(localStorage.getItem('myInnerNote') || '[]');
    records.push(data);
    localStorage.setItem('myInnerNote', JSON.stringify(records));
}

// 記録を読み込む関数
function loadRecords() {
    return JSON.parse(localStorage.getItem('myInnerNote') || '[]');
}
    
        options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: (evt, elements, chart) => {
                const activePoints = chart.getElementsAtEventForMode(evt, 'index', { intersect: false }, true);
                if (activePoints.length > 0) {
                    const index = activePoints[0].index;
                    const logData = logs[index]; // last10をlogsに修正
                    const target = document.getElementById(`log-${logData.ts}`);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        target.classList.add('highlight');
                        setTimeout(() => target.classList.remove('highlight'), 3000);
                    }
                }
            }
        }
    });
};
