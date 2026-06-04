// ボックスをタップした時の処理
function openDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    select.style.display = 'block'; // プルダウンを表示
    select.focus(); // フォーカスを当てて開く
    
    // 開いた後はラベルを隠すことも可能
    document.getElementById('display-text').style.display = 'none';
}

// 診断名が選ばれた時の処理
function saveDiagnosis(select) {
    if (select.value === "その他") {
        select.style.display = 'none';
        document.getElementById('other-input').style.display = 'block';
        document.getElementById('other-input').focus();
    } else {
        updateLabel(select.value);
    }
}

// 「その他」入力完了後の処理
function saveOther(input) {
    updateLabel(input.value);
}

// ラベルを更新して表示を戻す
function updateLabel(val) {
    document.getElementById('current-diagnosis').innerText = val;
    localStorage.setItem('diagnosis', val);
    
    // 表示状態をリセット
    document.getElementById('display-text').style.display = 'block';
    document.getElementById('diagnosis-select').style.display = 'none';
    document.getElementById('other-input').style.display = 'none';
}
