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

window.onload = () => {
    // ボタンを生成する命令がここに必要です
    createRatingButtons('mood-btns', 'mood');
    createRatingButtons('cond-btns', 'cond');
    
    // 既存の履歴描画やグラフ描画の処理...
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    renderChart(logs); 
};

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

    const STORAGE_KEY = 'innernote_vfinal_400_logs';
let myChart; // グラフ用変数

// グラフを初期化・更新する関数
function updateChart() {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const displayData = logs.slice(-10); // 最新10件を取得
    
    const ctx = document.getElementById('myChart').getContext('2d');
    
    // 既にグラフがあれば破棄してから作り直す（再描画のため）
    if (myChart) myChart.destroy();
    
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: displayData.map(l => l.date.split(' ')[1]), // 時刻のみ表示
            datasets: [
                { label: '気分', data: displayData.map(l => l.mood), borderColor: '#3b82f6', tension: 0.3 },
                { label: '体調', data: displayData.map(l => l.cond), borderColor: '#f59e0b', tension: 0.3 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 1, max: 10, ticks: { stepSize: 1 } },
                x: { ticks: { maxRotation: 45, minRotation: 45 } }
            }
        }
    });
}

// 既存の window.onload の最後で呼び出す
window.onload = () => {
    // ...（既存のボタン生成処理などはそのまま）
    createRatingButtons('mood-btns', 'mood');
    createRatingButtons('cond-btns', 'cond');
    // ...（中略）

    // 最後にグラフを表示！
    updateChart();
};

// 既存の saveData 関数の最後にも追記
function saveData() {
    // ...（保存処理の最後）
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    alert("記録しました！");
    
    // グラフ更新して画面リロード
    updateChart();
    location.reload();
}
