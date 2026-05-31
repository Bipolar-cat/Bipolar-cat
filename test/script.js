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

// 「決定」を押した時：診断名を固定し、ボックスを切り替え
function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const display = document.getElementById('diagnosis-text');
    
    display.innerText = "診断名: " + select.value;
    localStorage.setItem('userDiagnosis', select.value);
    
    document.getElementById('diagnosis-fixed-container').style.display = 'flex';
    document.getElementById('diagnosis-edit').style.display = 'none';
}

// 「変更」を押した時：プルダウンを再表示
function unlockDiagnosis() {
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
    document.getElementById('diagnosis-edit').style.display = 'flex';
}

// 読み込み時：すでに保存されていれば固定表示にする
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('userDiagnosis');
    if (saved) {
        document.getElementById('diagnosis-text').innerText = "診断名: " + saved;
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-edit').style.display = 'none';
    } else {
        document.getElementById('diagnosis-edit').style.display = 'flex';
    }
});
