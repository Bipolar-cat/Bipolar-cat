// 画面読み込み時に保存された診断名を表示
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('myDiagnosis');
    if (saved) document.getElementById('diagnosisName').innerText = saved;
});

// 表示・編集の切り替え
function toggleEdit() {
    document.getElementById('diagnosisDisplay').style.display = 'none';
    document.getElementById('diagnosisEdit').style.display = 'flex';
}

// 選択した診断名を保存して表示を戻す
function saveDiagnosis() {
    const selected = document.getElementById('diagnosisSelect').value;
    localStorage.setItem('myDiagnosis', selected); // ブラウザに保存
    document.getElementById('diagnosisName').innerText = selected;
    
    document.getElementById('diagnosisDisplay').style.display = 'flex';
    document.getElementById('diagnosisEdit').style.display = 'none';
}
