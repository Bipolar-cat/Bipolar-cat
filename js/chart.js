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
        tension: 0.35,
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 8
    },
    {
        label: "体調",
        data: last10.map(l => l.cond),
        borderColor: "#FFA726",
        backgroundColor: "#FFA726",
        borderWidth: 3,
        tension: 0.35,
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 8
    
                }
            ]
        }
    });

    console.log("Chart作成完了");
}
options: {
    responsive: true,
    scales: {
        y: {
    min: 1,
    max: 3,

    ticks: {
        stepSize: 1,
        callback: function(value){

            if(value === 3) return "良い";
            if(value === 2) return "普通";
            if(value === 1) return "低い／悪い";

            return "";
        }
    },

    grid: {
        drawBorder: true,
        color: "#dddddd",
        lineWidth: 1.5
    }
    
    display: true,
    color: function(context){

        if(
            context.tick.value === 3 ||
            context.tick.value === 1
        ){
            return "#cfcfcf";
        }

        return "#e8e8e8";
    },

    lineWidth: function(context){

        if(
            context.tick.value === 3 ||
            context.tick.value === 1
        ){
            return 3;
        }

        return 1;
    }
            }
