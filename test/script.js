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
let highlightTimeout = null;
let myChartInstance = null; // グラフを管理する変数
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

function renderChart(logs) {
    const canvas = document.getElementById('myChart');
    if (!canvas) return; // キャンバスがなければ何もしない
    const ctx = canvas.getContext('2d');
    
    // 既存のグラフがあれば破棄
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
            scales: {
                x: { ticks: { maxRotation: 45, minRotation: 45 } }
            }
        }
    });
}
