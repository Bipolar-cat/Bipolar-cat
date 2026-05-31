const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';
let selectedMood = 5, selectedCond = 5;
let myChartInstance = null; // グラフのインスタンス管理用

// --- ページ読み込み時の処理 ---
window.onload = () => {
    // 1. ボタン生成
    createRatingButtons('mood-btns', 'mood');
    createRatingButtons('cond-btns', 'cond');

    // 2. 診断名の復元
    const saved = localStorage.getItem(DIAGNOSIS_KEY);
    if (saved) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `診断名: ${saved}`;
    }

    // 3. データ取得と描画
    updateUI();
};

// --- 各パーツの描画（この関数を saveData からも呼ぶ） ---
function updateUI() {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    renderLogList(logs);
    renderChart(logs);
}

function saveData() {
    const note = document.getElementById('note').value;
    const diagnosisVal = localStorage.getItem(DIAGNOSIS_KEY) || "未設定";
    
    const now = new Date();
    const dateStr = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // データを保存
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
    
    // リロードせず、UI更新関数を呼ぶ
    document.getElementById('note').value = ''; // メモを空にする
    updateUI(); 
}

function updateUI() {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    // 履歴を描画
    const logList = document.getElementById('log-list');
    logList.innerHTML = '';
    logs.slice().reverse().forEach(l => {
        const div = document.createElement('div');
        div.className = 'log-item';
        div.innerHTML = `<span class="log-date">${l.date}</span>気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
        logList.appendChild(div);
    });

    // グラフを描画（Chartインスタンスの再生成）
    renderChart(logs);
}

// --- 以下、既存関数 ---
function createRatingButtons(containerId, groupName) {
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
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

function renderLogList(logs) {
    const logList = document.getElementById('log-list');
    logList.innerHTML = '';
    logs.slice().reverse().forEach(l => {
        const div = document.createElement('div');
        div.className = 'log-item';
        div.innerHTML = `<span class="log-date">${l.date}</span>気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
        logList.appendChild(div);
    });
}

function renderChart(logs) {
    const ctx = document.getElementById('myChart').getContext('2d');
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
        options: { responsive: true, maintainAspectRatio: false }
    });
}
