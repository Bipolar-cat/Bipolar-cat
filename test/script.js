function renderScrollableChart(logs) {
    const canvas = document.getElementById('myChart');
    const container = document.getElementById('chart-wrapper');
    
    // データ数に合わせて幅を計算
    const newWidth = Math.max(window.innerWidth, logs.length * 50);
    container.style.width = newWidth + 'px';

    if (window.myChartInstance) window.myChartInstance.destroy();

    const ctx = canvas.getContext('2d');
    window.myChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: logs.map(l => l.date),
            datasets: [
                { label: '気分', data: logs.map(l => l.mood), borderColor: '#3b82f6' },
                { label: '体調', data: logs.map(l => l.cond), borderColor: '#f59e0b' }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });
}

// 3. 実行（ページ読み込み時に実行する）
window.onload = () => {
    const logs = JSON.parse(localStorage.getItem('innernote_vfinal_400_logs') || '[]');
    renderScrollableChart(logs);
};



// --- グローバル変数 ---
let selectedMood = 5, selectedCond = 5;
let myChartInstance = null;
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

// --- ボタン生成関数 ---
function createCircleButtons(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
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

// --- グラフ描画関数 ---
function renderChart(logs) {
    const canvas = document.getElementById('myChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
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
            scales: { x: { ticks: { maxRotation: 45, minRotation: 45 } } }
        }
    });
}

// --- ページ初期化 ---
window.onload = () => {
    // ボタン生成
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');
    
    // ログリスト表示
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const logList = document.getElementById('log-list');
    if (logList) {
        logList.innerHTML = '';
        logs.slice().reverse().forEach(l => {
            const div = document.createElement('div');
            div.className = 'log-item';
            div.innerHTML = `<span>${l.date}</span> 気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
            logList.appendChild(div);
        });
    }
    
    // グラフ描画（最新10件）
    renderChart(logs.slice(-10));
};
