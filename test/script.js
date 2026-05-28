window.onerror = function(message, source, lineno, colno, error) {
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'fixed';
    errorDiv.style.top = '0';
    errorDiv.style.left = '0';
    errorDiv.style.width = '100%';
    errorDiv.style.backgroundColor = 'red';
    errorDiv.style.color = 'white';
    errorDiv.style.padding = '10px';
    errorDiv.style.zIndex = '9999';
    errorDiv.style.fontSize = '12px';
    errorDiv.textContent = `エラー: ${message} (行: ${lineno})`;
    document.body.appendChild(errorDiv);
};

// --- グローバル変数 ---
let selectedMood = 5, selectedCond = 5;
let myChartInstance = null;
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

// --- グラフ描画関数（HTMLタグを含まない純粋な関数） ---
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

// --- ページ読み込み時の処理 ---
window.onload = () => {
    // 診断名表示
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    const selectContainer = document.getElementById('diagnosis-select-container');
    if (fixedContainer && selectContainer) {
        if (savedDiagnosis) {
            fixedContainer.style.display = 'flex';
            selectContainer.style.display = 'none';
            document.getElementById('diagnosis-text').innerText = `主な診断名: ${savedDiagnosis}`;
        } else {
            fixedContainer.style.display = 'none';
            selectContainer.style.display = 'block';
        }
    }

    // ボタン生成
    try {
        createCircleButtons('mood-btns', 'mood');
        createCircleButtons('cond-btns', 'cond');
    } catch (e) {}

    // リスト描画
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

    // グラフ描画
    renderChart(logs.slice(-10));
};
