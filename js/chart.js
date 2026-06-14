function renderChart() {

    console.log("renderChart開始");

    const logs = getLogs();

    console.log("logs", logs);

    const canvas =
        document.getElementById("myChart");

    console.log("canvas", canvas);

    if(!canvas){
        console.error("myChartが見つからない");
        return;
    }

    const ctx = canvas.getContext("2d");

    new Chart(ctx,{
        type:"line",
        data:{
            labels: logs.map(l => l.date),
            datasets: [
    {
        label: "気分",
        data: last10.map(l => l.mood),
        borderColor: "#2196F3",
        backgroundColor: "#2196F3",
        borderWidth: 3,
        tension: 0.4,
        fill: false,
        pointRadius: 4
    },
    {
        label: "体調",
        data: last10.map(l => l.cond),
        borderColor: "#FFA726",
        backgroundColor: "#FFA726",
        borderWidth: 3,
        tension: 0.4,
        fill: false,
        pointRadius: 4
    
                }
            ]
        }
    });

    console.log("Chart作成完了");
}
