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

function saveSettings() {
    // 設定モーダルを閉じる
    document.getElementById('settings-modal').style.display = 'none';

    // 選択された記録方式を取得（例: ラジオボタンや選択肢から）
    const mode = document.querySelector('input[name="record-mode"]:checked').value;

    // 記録方式ボタンを表示するエリアを取得
    const step3Btn = document.getElementById('step-3-btn');
    const step10Btn = document.getElementById('step-10-btn');

    // モードに応じてボタンを表示/非表示
    if (mode === '3') {
        step3Btn.style.display = 'inline-block';
        step10Btn.style.display = 'none';
    } else {
        step3Btn.style.display = 'none';
        step10Btn.style.display = 'inline-block';
    }
}
