let myChart = null;

function renderChart() {

    const logs = getLogs();
    const last10 = logs.slice(-10);
    const canvas = document.getElementById("myChart");
    if (!canvas) return;

    if (last10.length === 0) {
        if (myChart) {
            myChart.destroy();
            myChart = null;
        }
        return;
    }

    if (myChart) {
        myChart.destroy();
    }

const chartInner = document.querySelector(".chart-inner");

if (chartInner) {
    chartInner.style.width =
        Math.max(last10.length * 70, window.innerWidth - 40) + "px";
}
    const ctx = canvas.getContext("2d");

    // 年が変わった時だけ西暦を表示
    const labels = last10.map((l, index) => {

        const d = new Date(l.date);

        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();

        const hour = String(d.getHours()).padStart(2, "0");
        const min = String(d.getMinutes()).padStart(2, "0");

        if (index > 0) {
            const prev = new Date(last10[index - 1].date);

            if (prev.getFullYear() !== year) {
                return `${year}/${month}/${day}\n${hour}:${min}`;
            }
        }

        return `${month}/${day}\n${hour}:${min}`;
    });

    myChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: labels,

            datasets: [

                {
                    label: "気分",
                    data: last10.map(l => l.mood),

                    borderColor: "#2196F3",
                    backgroundColor: "#2196F3",

                    pointBackgroundColor: "#2196F3",
                    pointBorderColor: "#ffffff",

                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBorderWidth: 2,
                    pointBorderColor: "#fff",
                    pointHitRadius: 15,

                    borderWidth: 3,
                    tension: 0.55,
                    fill: false,
                },

                {
                    label: "体調",
                    data: last10.map(l => l.cond),

                    borderColor: "#FFA726",
                    backgroundColor: "#FFA726",

                    pointBackgroundColor: "#FFA726",
                    pointBorderColor: "#ffffff",

                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBorderWidth: 2,
                    pointBorderColor: "#fff",
                    pointHitRadius: 15,

                    borderWidth: 3,
                    tension: 0.55,
                    fill: false,
                }

            ]
        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                mode: "index",
                intersect: false
            },

            plugins: {

                legend: {

                    position: "top",

                    labels: {

                        usePointStyle: true,
                        boxWidth: 10,

                        font: {
                            size: 12
                        }

                    }

                },

                tooltip: {

                    titleFont: {
                        size: 11
                    },

                    bodyFont: {
                        size: 11
                    }

                }

            },

           scales: {

    x: {
        grid: {
            display: false
        },
        ticks: {
            maxRotation: 45,
            minRotation: 45,
            autoSkip: false,
            font: {
                size: 10
            }
        }
    },

    y: {
        position: "left",
        min: 1,
        max: 10,

        ticks: {
            stepSize: 1,
            callback: function(value) {
                if (value === 10) return "良い";
                if (value === 5) return "普通";
                if (value === 1) return "低い/悪い";
                return "";
            }
        },

        grid: {
            color: function(context) {
                const v = context.tick.value;

                return (v === 1 || v === 5 || v === 10)
                    ? "#dddddd"
                    : "rgba(0,0,0,0)";
            }
        }
    },

    y2: {
        position: "right",
        min: 1,
        max: 10,

        grid: {
            drawOnChartArea: false
        },

        ticks: {
            stepSize: 1,
            callback: function(value) {
                if (value === 10) return "良い";
                if (value === 5) return "普通";
                if (value === 1) return "低い/悪い";
                return "";
           }
                    }
                }
            }
        }
    });
}
