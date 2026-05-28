// --- グローバル変数 ---
let selectedMood = 5, selectedCond = 5;
let myChartInstance = null;
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

// --- ボタン生成処理 ---
function createCircleButtons(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 中身を一度空にしてから再生成
    container.innerHTML = ''; 
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.type = "button";
        btn.className = (i === 5) ? 'active' : ''; // 初期値は5
        btn.onclick = function() {
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (type === 'mood') selectedMood = i;
            else selectedCond = i;
        };
        container.appendChild(btn);
    }
}

// --- グラフ描画（1-10固定） ---
function renderScrollableChart(logs) {
    const canvas = document.getElementById('myChart');
    const container = document.getElementById('chart-wrapper');
    if (!canvas || !container) return;
    
    container.style.width = Math.max(window.innerWidth, logs.length * 60) + 'px';
    if (myChartInstance) myChartInstance.destroy();

    myChartInstance = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: logs.map(l => l.date),
            datasets: [
                { label: '気分', data: logs.map(l => l.mood), borderColor: '#3b82f6', tension: 0.3 },
                { label: '体調', data: logs.map(l => l.cond), borderColor: '#f59e0b', tension: 0.3 }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: { y: { min: 1, max: 10, ticks: { stepSize: 1 } } }
        }
    });
}

// --- 診断名管理 ---
function enableDiagnosisChange() {
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
    document.getElementById('diagnosis-select-container').style.display = 'block';
}

function getFinalDiagnosis() {
    const fixed = document.getElementById('diagnosis-fixed-container');
    if (fixed && fixed.style.display !== 'none') {
        return document.getElementById('diagnosis-text').innerText.replace('主な診断名: ', '');
    }
    const select = document.getElementById('diagnosis-select');
    const other = document.getElementById('diagnosis-other');
    const val = (select.value === 'その他') ? other.value : select.value;
    localStorage.setItem(DIAGNOSIS_KEY, val);
    return val;
}

// --- データ保存 ---
function saveData() {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    logs.push({ 
        ts: Date.now(), 
        date: new Date().toLocaleString(), 
        diagnosis: getFinalDiagnosis(), 
        mood: selectedMood, 
        cond: selectedCond, 
        note: document.getElementById('note').value 
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    location.reload();
}

// --- 初期化処理 ---
window.onload = () => {
    // ボタンの再生成
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');

    // 診断名の復元
    const saved = localStorage.getItem(DIAGNOSIS_KEY);
    if (saved) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `主な診断名: ${saved}`;
    }

    // 履歴とグラフ
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const logList = document.getElementById('log-list');
    if (logList) {
        logList.innerHTML = '';
        logs.slice().reverse().forEach(l => {
            const div = document.createElement('div');
            div.className = 'log-item';
            div.innerHTML = `<span class="log-date">${l.date}</span>気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
            logList.appendChild(div);
        });
    }
    renderScrollableChart(logs);
};
