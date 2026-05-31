document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('userDiagnosis');
    if (saved) {
        document.getElementById('diagnosisName').textContent = saved;
        document.getElementById('editBtn').style.display = 'inline';
    }
});

// メニューの開閉
function toggleMenu() {
    const menu = document.getElementById('menuArea');
    menu.style.display = (menu.style.display === 'none') ? 'block' : 'none';
}

// 選択した診断名を保存して表示を更新
function selectDiagnosis(name) {
    document.getElementById('diagnosisName').textContent = name;
    localStorage.setItem('userDiagnosis', name);
    document.getElementById('editBtn').style.display = 'inline';
    toggleMenu(); // メニューを閉じる
}
