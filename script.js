// 診断名の表示切り替え
function toggleEdit() {
    document.getElementById('display-area').style.display = 'none';
    document.getElementById('edit-area').style.display = 'block';
}

// その他選択時の挙動
function checkOther(select) {
    document.getElementById('other-diagnosis').style.display = 
        (select.value === "その他") ? "block" : "none";
}

// 診断名の保存
function saveDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const input = document.getElementById('other-diagnosis');
    const display = document.getElementById('current-diagnosis');
    const editBtn = document.getElementById('edit-btn');
    
    let val = (select.value === "その他") ? input.value : select.value;
    
    if (val) {
        display.innerText = val;
        localStorage.setItem('diagnosis', val);
        editBtn.style.display = 'inline-block'; // 変更ボタンを表示
    }
    
    document.getElementById('display-area').style.display = 'block';
    document.getElementById('edit-area').style.display = 'none';
}

// 記録ボタン押下後の処理
function saveRecord() {
    // 既存の記録処理（メモや気分をlocalStorageへ保存）の後に...
    
    // 記録が完了したら「変更」ボタンを表示（まだ出ていない場合）
    document.getElementById('edit-btn').style.display = 'inline-block';
    
    // 記録完了のアラートなど
    alert("記録しました");
}

// ページ読み込み時
window.onload = () => {
    const saved = localStorage.getItem('diagnosis');
    if (saved) {
        document.getElementById('current-diagnosis').innerText = saved;
        document.getElementById('edit-btn').style.display = 'inline-block';
    }
};
