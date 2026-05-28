// --- グローバル変数 ---
let selectedMood = 5, selectedCond = 5;
let myChartInstance = null; // グラフインスタンス管理用
let highlightTimeout = null;
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

// --- 診断・UI処理 ---
function toggleOtherDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const otherInput = document.getElementById('diagnosis-other');
    otherInput.style.display = (select.value === 'その他') ? 'block' : 'none';
}

function unlockDiagnosis() {
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
    document.getElementById('diagnosis-select-container').style.display = 'block';
}

function createCircleButtons(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ''; // 重複生成を防ぐためリセット
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.type = "button";
        if (i === 5) btn.className = 'active';
        btn.onclick = function() {
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (type === 'mood') selectedMood = i;
            else selectedCond = i;
        };
        container.appendChild(btn);
    }
}

// --- グラフ描画（横スクロール対応） ---
function renderScrollableChart(logs) {
    const canvas = document.getElementById('myChart');
    const container = document.getElementById('chart-wrapper');
    if (!canvas || !container) return;
    
    // 幅の計算
    const newWidth = Math.max(window.innerWidth, logs.length * 60);
    container.style.width = newWidth + 'px';

    // インスタンス破棄
    if (myChartInstance) myChartInstance.destroy();

    const ctx = canvas.getContext('2d');
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
            responsive: false,
            maintainAspectRatio: false,
            scales: { y: { min: 1, max: 10, ticks: { stepSize: 1 } } } // 1〜10固定
        }
    });
}

// --- スクロール・保存 ---
function scrollToLog(timestamp) {
    const targetElement = document.getElementById(`log-${timestamp}`);
    if (highlightTimeout) clearTimeout(highlightTimeout);
    document.querySelectorAll('.log-item').forEach(item => item.classList.remove('highlight'));
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.classList.add('highlight');
        highlightTimeout = setTimeout(() => { targetElement.classList.remove('highlight'); }, 3000);
    }
}

function saveData() {
    const note = document.getElementById('note').value;
    let diagnosisVal = localStorage.getItem(DIAGNOSIS_KEY) || "双極症";
    if (document.getElementById('diagnosis-select-container').style.display !== 'none') {
        const select = document.getElementById('diagnosis-select');
        diagnosisVal = select.value === 'その他' ? `その他 (${document.getElementById('diagnosis-other').value.trim()})` : select.value;
        localStorage.setItem(DIAGNOSIS_KEY, diagnosisVal);
    }

    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    logs.push({ ts: Date.now(), date: new Date().toLocaleString(), diagnosis: diagnosisVal, mood: selectedMood, cond: selectedCond, note: note });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    alert("記録しました！");
    location.reload();
}

// --- ページ初期化（ここを1つに統合） ---
window.onload = () => {
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');

    // 診断名復元
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    if (savedDiagnosis) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `主な診断名: ${savedDiagnosis}`;
    }

    // 履歴生成
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const logList = document.getElementById('log-list');
    if (logList) {
        logList.innerHTML = '';
        logs.slice().reverse().forEach(l => {
            const div = document.createElement('div');
            div.className = 'log-item';
            div.id = `log-${l.ts}`;
            div.innerHTML = `<span class="log-date">${l.date}</span>気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
            logList.appendChild(div);
        });
    }

    // グラフ描画実行
    renderScrollableChart(logs);
};
