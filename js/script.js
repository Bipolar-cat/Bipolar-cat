document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "DOMContentLoaded"
        );

        if(typeof renderChart === "function"){
            renderChart();
        }

        if(typeof renderLogs === "function"){
            renderLogs();
        }
    }
);
