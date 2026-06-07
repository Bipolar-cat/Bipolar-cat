window.onload = () => {

    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');

    const logs = loadLogsData();

    loadDiagnosisUI();

    renderChart();
    renderLogList();
};
