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
                    tension: 0.3
                },
                {
                    label: "体調",
                    data: last10.map(l => l.cond),
                    borderColor: "#FF9800",
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
               y: {
    min: 1,
    max: 10,
    ticks: {
        stepSize: 1,
        callback: function(value) {
            if (value === 1) return "低い/悪い";
            if (value === 5) return "普通";
            if (value === 10) return "良い";
            return "";
        }
    }
}
