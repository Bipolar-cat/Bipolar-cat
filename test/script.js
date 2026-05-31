document.addEventListener('DOMContentLoaded', () => {
    console.log("HTMLとJSが正しく連結されました！");
    
    // ここに診断名の処理などを書いていきます
});
    const saved = localStorage.getItem('userDiagnosis');
    if (saved) {
        document.getElementById('diagnosisName').textContent = saved;
        document.getElementById('editBtn').style.display = 'block'; // 記録があれば「変更」を表示
    }
});

// メニューの開閉
function toggleMenu() {
    const menu = document.getElementById('menuArea');
    menu.style.display = (menu.style.display === 'none') ? 'block' : 'none';
}

// 診断名の選択と保存
function selectDiagnosis(name) {
    document.getElementById('diagnosisName').textContent = name;
    localStorage.setItem('userDiagnosis', name);
    
    document.getElementById('editBtn').style.display = 'block'; // 決定後に「変更」を表示
    toggleMenu();
}
