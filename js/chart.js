function renderChart() {
    const logs = getLogs();
    const last10 = logs.slice(-10);
    if (last10.length === 0) {
        console.warn("データなし");
        return;
    }

    const canvas = document.getElementById("myChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "line",
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
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
