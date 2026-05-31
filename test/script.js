// ページ読み込み時に保存された値をセット
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('userDiagnosis');
    const select = document.getElementById('diagnosisSelect');
    if (saved) {
        select.value = saved;
    }
});

// 選択した瞬間に保存
function saveDiagnosis(value) {
    localStorage.setItem('userDiagnosis', value);
    console.log("診断名が保存されました: " + value);
}
