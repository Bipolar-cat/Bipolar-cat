let myChart;

function renderChart() {

    const ctx = document.getElementById("myChart");

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: last10.map(l => l.date),
            datasets: [...]
        },
        options: {
    responsive: true,
    maintainAspectRatio: false
        }
