function renderChart() {
    const logs = getAllLogs();

    const canvas = document.getElementById('myChart');

    if (!canvas) return;

    if (window.myChartInstance) {
        window.myChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');

    window.myChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: logs.map(l => l.date),
            datasets: [
                {
                    label: '気分',
                    data: logs.map(l => l.mood),
                    borderColor: '#3b82f6',
                    tension: 0.3,
                    pointRadius: 4
                },
                {
                    label: '体調',
                    data: logs.map(l => l.cond),
                    borderColor: '#f59e0b',
                    tension: 0.3,
                    pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        font: { size: 10 }
                    }
                },
                y: {
                    min: 1,
                    max: 10
                }
            }
        }
    });
}
