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

    const ctx = canvas.getContext("2d");

    myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: last10.map(l => l.date),
        datasets: [
            {
                label: "気分",
                data: last10.map(l => l.mood),
                borderColor: "#2196F3",
                backgroundColor: "#2196F3",
                pointBackgroundColor: "#2196F3",
                pointBorderColor: "#2196F3",
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 3,
                tension: 0.3
            },
            {
                label: "体調",
                data: last10.map(l => l.cond),
                borderColor: "#FFA726",
                backgroundColor: "#FFA726",
                pointBackgroundColor: "#FFA726",
                pointBorderColor: "#FFA726",
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 3,
                tension: 0.3
            }
        ]
    },
    options: {
        // ここに options が続く
    }
});
options: {
    responsive: true,
    scales: {
        y: {
            min: 1,
            max: 10,
            ticks: {
                stepSize: 1,
                callback: function(value) {
                    switch (value) {
                        case 1:
                            return "低い";
                        case 5:
                            return "普通";
                        case 10:
                            return "良い";
                        default:
                            return "";
                    }
                }
            },
            grid: {
                color: function(context) {
                    const v = context.tick.value;

                    // 1・5・10だけ横線を表示
                    if (v === 1 || v === 5 || v === 10) {
                        return "#d9d9d9";
                    }

                    // それ以外の横線は非表示
                    return "rgba(0,0,0,0)";
                }
            }
        }
    }
}   // ← options を閉じる

}); // ← new Chart を閉じる

} // ← renderChar
