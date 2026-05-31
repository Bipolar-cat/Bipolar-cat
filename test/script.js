const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';
let selectedMood = 5, selectedCond = 5;
let myChartInstance = null;

// --- ページ読み込み時 ---
window.onload = () => {
    createRatingButtons('mood-btns', 'mood');
    createRatingButtons('cond-btns', 'cond');

    const saved = localStorage.getItem(DIAGNOSIS_KEY);
    if (saved) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `診断名: ${saved}`;
    }
    updateUI(); 
};

// --- UI更新関数（履歴とグラフを同時に更新） ---
function updateUI() {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    // 1. 履歴リストの更新
    const logList = document.getElementById('log-list');
    logList.innerHTML = '';
    logs.slice().reverse().forEach(l => {
        const div = document.createElement('div');
        div.className = 'log-item';
        div.innerHTML = `<span class="log-date">${l.date}</span>気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
        logList.appendChild(div);
    });

    // 2. グラフの更新
    renderChart(logs);
}

// --- 記録保存処理 ---
function saveData() {
    const note = document.getElementById('note').value;
    const diagnosisVal = localStorage.getItem(DIAGNOSIS_KEY) || "未設定";
    
    const now = new Date();
    const dateStr = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    logs.push({ 
        ts: now.getTime(), 
        date: dateStr, 
        diagnosis: diagnosisVal,
        mood: selectedMood, 
        cond: selectedCond, 
        note: note 
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    
    alert("記録しました！");
    document.getElementById('note').value = '';
    
    // UIを更新
    updateUI();
}

function renderChart(logs) {
    const canvas = document.getElementById('myChart');
    if (!canvas) return; // 念のため、キャンバスが存在するか確認
    
    const ctx = canvas.getContext('2d');
    const wrapper = document.getElementById('chart-wrapper');
    
    // 幅を確実に設定
    const dynamicWidth = Math.max(window.innerWidth - 40, logs.length * 50);
    wrapper.style.width = dynamicWidth + 'px';
    wrapper.style.display = 'block'; // 念のため表示をブロックに
    canvas.style.display = 'block';   // キャンバスも明示的に表示

    if (myChartInstance) myChartInstance.destroy();
    
    myChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: logs.map(l => l.date.split(' ')[0]),
            datasets: [
                { label: '気分', data: logs.map(l => l.mood), borderColor: '#3b82f6', tension: 0.3 },
                { label: '体調', data: logs.map(l => l.cond), borderColor: '#f59e0b', tension: 0.3 }
            ]
        },
     options: { 
    responsive: true, 
    maintainAspectRatio: false,
    scales: { 
        x: { 
            ticks: { autoSkip: false } 
        },
        y: { 
            beginAtZero: false, // 0から開始しない
            min: 1,             // 確実に1から表示
            max: 10,            // 確実に10まで表示
            ticks: { 
                stepSize: 1     // メモリを1ずつ表示
            }
        }
    }
     }

// --- ボタン生成関数 ---
function createRatingButtons(containerId, groupName) {
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.type = 'button';
        if (i === 5) btn.classList.add('active');
        btn.onclick = function() {
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (groupName === 'mood') selectedMood = i;
            else selectedCond = i;
        };
        container.appendChild(btn);
    }
}

// グラフ描画を少し遅らせる（HTMLの描画完了を待つ）
function safeRenderChart(logs) {
    setTimeout(() => {
        renderChart(logs);
    }, 500); // 0.5秒待ってから描画
}

// renderChart 関数内の options を以下に書き換えます
options: { 
    responsive: true, 
    maintainAspectRatio: false,
    scales: { 
        x: { 
            ticks: { autoSkip: false } 
        },
        y: { 
            min: 1,    // 最小値を1に固定
            max: 10,   // 最大値を10に固定
            ticks: { 
                stepSize: 1 // 1刻みで表示
            }
        }
    }
}
