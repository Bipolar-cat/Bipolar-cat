window.onload = () => {

    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');

    loadSettings();

    loadLogs();

    renderChart();

};

function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    // 現在の状態を確認して切り替え
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
}
