// --- グローバル変数 ---
let selectedMood = 5, selectedCond = 5;
let myChartInstance = null;
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

// --- 診断名管理機能 ---
function toggleOtherDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const otherInput = document.getElementById('diagnosis-other');
    if (!select || !otherInput) return;
    otherInput.style.display = (select.value === 'その他') ? 'block' : 'none';
}

function enableDiagnosisChange() {
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
    document.getElementById('diagnosis-select-container').style.display = 'block';
}

// 診断名の取得・保存を統合
function getFinalDiagnosis() {
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    if (fixedContainer && fixedContainer.style.display !== 'none') {
        return document.getElementById('diagnosis-text').innerText.replace('主な診断名: ', '');
    }
    const select = document.getElementById('diagnosis-select');
    const val = (select.value === 'その他') ? document.getElementById('diagnosis-other').value.trim() : select.value;
    localStorage.setItem(DIAGNOSIS_KEY, val);
    return val;
}

// --- UI・グラフ機能 ---
function createCircleButtons(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.className = (i === 5) ? 'active' : '';
        btn.onclick = function() {
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (type === 'mood') selectedMood = i;
            else selectedCond = i;
        };
        container.appendChild(btn);
    }
}

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

// --- データ処理 ---
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
    alert("記録しました！");
    location.reload();
}

// --- ページ初期化 ---
window.onload = () => {
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');

    // 診断名の復元表示
    const saved = localStorage.getItem(DIAGNOSIS_KEY);
    if (saved) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `主な診断名: ${saved}`;
    }

    // 履歴生成
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
