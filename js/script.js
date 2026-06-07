window.onload = () => {

    // ① 初期UI生成
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');

    // ② データ読み込み
    const logs = loadLogsData();

    // ③ UI復元
    loadDiagnosisUI();

    // ④ 表示系
    renderChart();
    renderLogList();

    // ⑤ イベント準備（必要ならここに集約）
};
