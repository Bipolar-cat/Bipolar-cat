// ページ読み込み時に保存された診断名があれば表示
document.addEventListener('DOMContentLoaded', () => {
    const savedDiagnosis = localStorage.getItem('userDiagnosis');
    if (savedDiagnosis) {
        document.getElementById('diagnosisName').textContent = savedDiagnosis;
    } else {
        // 初回未設定時は編集エリアを表示
        toggleEdit();
    }
});

// 表示と編集エリアの切り替え
function toggleEdit() {
    document.getElementById('displayArea').style.display = 'none';
    document.getElementById('editArea').style.display = 'block';
}

// 診断名を保存して表示を更新
function saveDiagnosis() {
    const select = document.getElementById('diagnosisSelect');
    const selectedValue = select.value;
    
    // localStorageに保存
    localStorage.setItem('userDiagnosis', selectedValue);
    
    // UIの更新
    document.getElementById('diagnosisName').textContent = selectedValue;
    document.getElementById('displayArea').style.display = 'flex';
    document.getElementById('editArea').style.display = 'none';
}
