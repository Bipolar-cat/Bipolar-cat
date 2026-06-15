function renderChart() {

    const logs = getLogs();
    const last10 = logs.slice(-10);

    const canvas = document.getElementById("myChart");

    if (!canvas) {
        console.error("myChartが見つからない");
        return;
    }

    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "line",

        data: {
            labels: last10.map(l => l.date),

            datasets: [
                {yMood: {
    position: "left",
    min: 1,
    max: 3,
    ticks: {
        callback: v => {
            if (v === 3) return "良い";
            if (v === 2) return "普通";
            if (v === 1) return "低い";
        }
    }
},
                 yCond: {
    position: "right",
    min: 1,
    max: 3,
    grid: {
        drawOnChartArea: false
    },
    ticks: {
        callback: v => {
            if (v === 3) return "良い";
            if (v === 2) return "普通";
            if (v === 1) return "悪い";
        }
    }
                }

        options: {
            responsive: true,
            maintainAspectRatio: false,

            scales: {
                yMood: {
                    position: "left",
                    min: 1,
                    max: 3
                },
                yCond: {
                    position: "right",
                    min: 1,
                    max: 3,
                    grid: {
                        drawOnChartArea: false
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });
}
