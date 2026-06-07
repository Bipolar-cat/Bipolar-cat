window.onload = () => {
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');

    loadDiagnosisUI();
    loadLogs();
    renderChart();
    renderLogList();
};
