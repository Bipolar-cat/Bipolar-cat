window.onload = () => {

    createCircleButtons(
        'mood-btns',
        'mood'
    );

    createCircleButtons(
        'cond-btns',
        'cond'
    );

    loadSettings();

    loadLogs();

    renderChart();
};
