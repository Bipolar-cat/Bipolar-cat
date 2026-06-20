let myChart = null;

function renderChart() {

    const logs = getLogs();
    const last10 = logs.slice(-10);

    if (last10.length === 0) return;

    const ctx = document.getElementById("myChart").getContext("2d");

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: last10.map(l => l.date),
            datasets: [
                {
                    label: "気分",
                    data: last10.map(l => l.mood)
                },
                {
                    label: "体調",
                    data: last10.map(l => l.cond)
                }
            ]
        }
    });
}
