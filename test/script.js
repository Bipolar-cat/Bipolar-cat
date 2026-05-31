// ページ読み込み時に保存された診断名を表示
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('myDiagnosis');
    if (saved) document.getElementById('diagnosisName').innerText = saved;
});

// 編集画面の切り替え
function toggleEdit() {
    document.getElementById('diagnosisDisplay').style.display = 'none';
    document.getElementById('diagnosisEdit').style.display = 'block';
}

// 保存して画面更新
function saveDiagnosis() {
    const selected = document.getElementById('diagnosisSelect').value;
    localStorage.setItem('myDiagnosis', selected);
    document.getElementById('diagnosisName').innerText = selected;
    
    document.getElementById('diagnosisDisplay').style.display = 'flex';
    document.getElementById('diagnosisEdit').style.display = 'none';
}
