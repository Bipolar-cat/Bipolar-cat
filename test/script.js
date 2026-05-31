document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('userDiagnosis');
    if (saved) {
        // 保存済みなら診断名を表示し、変更ボタンを出す
        document.getElementById('diagnosisName').textContent = saved;
        document.getElementById('editBtn').style.display = 'block';
    }
});

function toggleMenu() {
    const menu = document.getElementById('menuArea');
    menu.style.display = (menu.style.display === 'none') ? 'block' : 'none';
}

function selectDiagnosis(name) {
    document.getElementById('diagnosisName').textContent = name;
    document.getElementById('editBtn').style.display = 'block'; // 選択後に変更ボタン表示
    localStorage.setItem('userDiagnosis', name);
    toggleMenu(); // メニューを閉じる
}
