// --- グラフ描画関数（スクロール対応版） ---
function renderScrollableChart(logs) {
    const canvas = document.getElementById('myChart');
    const container = document.getElementById('chart-wrapper');
    if (!canvas || !container) return;
    
    // データに合わせて幅を動的に変更
    const newWidth = Math.max(window.innerWidth, logs.length * 60);
    container.style.width = newWidth + 'px';

    // 既存のグラフがあれば破棄（ここが重要）
    if (window.myChartInstance) {
        window.myChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    // 新しいグラフを描画
    window.myChartInstance = new Chart(ctx, {
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
            maintainAspectRatio: false
        }
    });
}
