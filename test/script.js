// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('userDiagnosis');
    if (saved) {
        // 保存済みなら固定表示に切り替え
        document.getElementById('diagnosis-text').innerText = "診断名: " + saved;
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-edit').style.display = 'none';
    } else {
        // 未設定ならプルダウンを表示
        document.getElementById('diagnosis-edit').style.display = 'block';
    }
});

// 診断名を設定してロックする関数
function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const val = select.value;
    localStorage.setItem('userDiagnosis', val);
    
    document.getElementById('diagnosis-text').innerText = "診断名: " + val;
    document.getElementById('diagnosis-fixed-container').style.display = 'flex';
    document.getElementById('diagnosis-edit').style.display = 'none';
}

// 変更ボタンでロック解除する関数
function unlockDiagnosis() {
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
    document.getElementById('diagnosis-edit').style.display = 'block';
}
