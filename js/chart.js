function renderChart() {

    const logs = getLogs?.() || [];
    const last10 = logs.slice(-10);

    if (last10.length === 0) {
        console.warn("データなし");
        return;
    }

    const canvas = document.getElementById("myChart");

    if (!canvas) {
        console.error("canvasなし");
        return;
    }

    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
    type: "line",

    data: {
        labels: last10.map(l => l.date),

        data: {
    labels: last10.map(l => l.date),

    datasets: [
        {
            label: "気分",
            data: last10.map(l => l.mood),
            borderColor: "#2196F3"
        },
        {
            label: "体調",
            data: last10.map(l => l.cond),
            borderColor: "#FFA726"
        }
    ]
},

    options: {
        responsive: true
    }
});

            scales: {
                yMood: {
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
