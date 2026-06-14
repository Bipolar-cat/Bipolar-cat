new Chart(ctx, {
    type: "line",

    data: {
        labels: last10.map(l => l.date),

        datasets: [
            {
                label: "気分",
                data: last10.map(l => l.mood),
                borderColor: "#2196F3",
                yAxisID: "yMood"
            },
            {
                label: "体調",
                data: last10.map(l => l.cond),
                borderColor: "#FFA726",
                yAxisID: "yCond"
            }
        ]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
            yMood: {
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
        }
    }
});
