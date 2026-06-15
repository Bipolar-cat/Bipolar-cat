document.addEventListener("DOMContentLoaded", () => {

    if (typeof renderChart === "function") {
        renderChart();
    }

    if (typeof renderLogs === "function") {
        renderLogs();
    }
});
