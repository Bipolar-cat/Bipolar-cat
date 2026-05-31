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

// saveData 関数をこれに差し替えてください
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

    // リロードせずに画面を更新する
    renderLogList(logs); 
    renderChart(logs);
}

window.onload = () => {
    // 1. ボタンを生成
    createRatingButtons('mood-btns', 'mood');
    createRatingButtons('cond-btns', 'cond');

    // 2. 診断名の復元
    const saved = localStorage.getItem(DIAGNOSIS_KEY);
    if (saved) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `診断名: ${saved}`;
    }

    // 3. グラフと履歴の描画
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    renderLogs(logs);
    renderChart(logs);
};

// --- 関数定義 ---
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

function renderChart(logs) {
    const ctx = document.getElementById('myChart');
    if (!ctx) return;
    new Chart(ctx.getContext('2d'), {
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
