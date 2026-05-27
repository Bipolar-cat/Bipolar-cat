document.addEventListener('DOMContentLoaded', () => {
    createButtons('mood-btns');
    createButtons('cond-btns');
    renderChart();
});

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

// 読み込み完了後にボタンを作成
window.addEventListener('load', () => {
    createButtons('mood-btns');
    createButtons('cond-btns');
});

function renderChart() {
    const ctx = document.getElementById('myChart')?.getContext('2d');
    if (!ctx) return;

    if (myChart) myChart.destroy();

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['5/25', '5/26', '5/27'],
            datasets: [{
                label: '気分',
                data: [5, 8, 6],
                borderColor: '#3b82f6',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                y: { min: 0, max: 10 }
            }
        }
    });
}
