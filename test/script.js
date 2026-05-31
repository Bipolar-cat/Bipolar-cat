// ページ読み込み時に保存されたデータを復元
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('userDiagnosis');
    if (saved) {
        document.getElementById('selected-diagnosis').innerText = saved;
    }
});

// 編集モードへの切り替え
function toggleEdit() {
    document.getElementById('diagnosis-display').style.display = 'none';
    document.getElementById('diagnosis-edit').style.display = 'block';
}

// 選択内容を保存して表示を更新
function saveDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const value = select.value;
    
    localStorage.setItem('userDiagnosis', value); // 保存
    document.getElementById('selected-diagnosis').innerText = value;
    
    // 表示の切り替え
    document.getElementById('diagnosis-display').style.display = 'block';
    document.getElementById('diagnosis-edit').style.display = 'none';
}
