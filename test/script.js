<script>
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
</script>
