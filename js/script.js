document.addEventListener(
    "DOMContentLoaded",
    () => {

        const last10 = logs.slice(-10);

        if(typeof renderChart === "function"){
            renderChart();
        }

        if(typeof renderLogs === "function"){
            renderLogs();
        }
    }
);
