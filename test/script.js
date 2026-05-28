// --- 1. グローバル変数 ---
let selectedMood = 5, selectedCond = 5;
let highlightTimeout = null;
let myChartInstance = null;
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

// --- 2. グラフ描画関数 ---
function renderChart(logs) {
    const canvas = document.getElementById('myChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // 既存のグラフを破棄
    if (myChartInstance) myChartInstance.destroy();

    myChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: logs.map(l => l.date),
            datasets: [
                { label: '気分', data: logs.map(l => l.mood), borderColor: '#3b82f6', tension: 0.3 },
                { label: '体調', data: logs.map(l => l.cond), borderColor: '#f59e0b', tension: 0.3 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: (evt, elements, chart) => {
                const activePoints = chart.getElementsAtEventForMode(evt, 'index', { intersect: false }, true);
                if (activePoints.length > 0) {
                    const index = activePoints[0].index;
                    const logData = logs[index];
                    scrollToLog(logData.ts || new Date(logData.date).getTime());
                }
            }
        }
    });
}

// --- 3. ページ読み込み時の初期化 ---
window.onload = () => {
    // 診断名の復元
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    if (savedDiagnosis) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `主な診断名: ${savedDiagnosis}`;
        const select = document.getElementById('diagnosis-select');
        select.value = savedDiagnosis.startsWith("その他 (") ? "その他" : savedDiagnosis;
    } else {
        document.getElementById('diagnosis-fixed-container').style.display = 'none';
        document.getElementById('diagnosis-select-container').style.display = 'block';
    }

    // ログリストの描画
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const logList = document.getElementById('log-list');
    logs.slice().reverse().forEach(l => {
        const div = document.createElement('div');
        div.className = 'log-item';
        const itemTs = l.ts || new Date(l.date).getTime();
        div.id = `log-${itemTs}`;
        const diagBadge = l.diagnosis && l.diagnosis !== '未診断（健常者）' ? `<span class="log-diagnosis">${l.diagnosis}</span>` : '';
        div.innerHTML = `<span class="log-date">${l.date}${diagBadge}</span>気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
        logList.appendChild(div);
    });

    // グラフ描画の呼び出し
    renderChart(logs);
};

// --- 4. その他の関数 ---
function createCircleButtons(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        if (i === 5) btn.className = 'active';
        btn.onclick = function() {
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (type === 'mood') selectedMood = i; else selectedCond = i;
        };
        container.appendChild(btn);
    }
}
createCircleButtons('mood-btns', 'mood');
createCircleButtons('cond-btns', 'cond');

function toggleOtherDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const otherInput = document.getElementById('diagnosis-other');
    if (select && otherInput) otherInput.style.display = (select.value === 'その他') ? 'block' : 'none';
}

function enableDiagnosisChange() {
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
    document.getElementById('diagnosis-select-container').style.display = 'block';
}

function saveData() {
    const note = document.getElementById('note').value;
    let diagnosisVal = "";
    const isSelectVisible = document.getElementById('diagnosis-select-container').style.display !== 'none';
    
    if (isSelectVisible) {
        const select = document.getElementById('diagnosis-select');
        diagnosisVal = (select.value === 'その他') ? `その他 (${document.getElementById('diagnosis-other').value.trim()})` : select.value;
        localStorage.setItem(DIAGNOSIS_KEY, diagnosisVal);
    } else {
        diagnosisVal = localStorage.getItem(DIAGNOSIS_KEY);
    }

    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    logs.push({ ts: Date.now(), date: new Date().toLocaleString(), diagnosis: diagnosisVal, mood: selectedMood, cond: selectedCond, note: note });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    location.reload();
}

function scrollToLog(timestamp) {
    const target = document.getElementById(`log-${timestamp}`);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.remove('highlight');
        void target.offsetWidth;
        target.classList.add('highlight');
        clearTimeout(highlightTimeout);
        highlightTimeout = setTimeout(() => target.classList.remove('highlight'), 3000);
    }
}
