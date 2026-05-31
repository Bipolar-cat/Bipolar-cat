document.addEventListener('DOMContentLoaded', () => {
    // ローカルストレージから保存された診断名を取得
    const saved = localStorage.getItem('userDiagnosis');
    
    // データがある場合のみ表示を更新
    if (saved) {
        document.getElementById('diagnosisName').textContent = saved;
        document.getElementById('editBtn').style.display = 'block'; // 「変更」ボタンを表示
    }
});

// メニューの開閉機能
function toggleMenu() {
    const menu = document.getElementById('menuArea');
    // メニューの表示状態を切り替え（noneならblock、それ以外ならnone）
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
}

// 診断名の選択、保存、UI更新
function selectDiagnosis(name) {
    // 診断名テキストを更新
    document.getElementById('diagnosisName').textContent = name;
    
    // ブラウザに保存
    localStorage.setItem('userDiagnosis', name);
    
    // 選択したら「変更」ボタンを表示し、メニューを閉じる
    document.getElementById('editBtn').style.display = 'block';
    toggleMenu();
}
