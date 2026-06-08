window.onload = () => {

    function loadSettings() {

    const saved =
        localStorage.getItem(
            SETTINGS_KEY
        );

    if (!saved) return;

    const settings =
        JSON.parse(saved);

    const mode =
        settings.recordMode || "10";

    console.log(
        "mode=",
        mode
    );

    if (mode === "3") {

        document.getElementById(
            "step3-area"
        ).style.display = "block";

        document.getElementById(
            "step10-area"
        ).style.display = "none";

    } else {

        document.getElementById(
            "step3-area"
        ).style.display = "none";

        document.getElementById(
            "step10-area"
        ).style.display = "block";
    }


    loadLogs();

    renderChart();
};
console.log("script.js読込");
