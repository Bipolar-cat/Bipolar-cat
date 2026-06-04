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

// 診断名をロック（保存）する
function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    if(!select.value) return;
    localStorage.setItem('innernote_saved_diagnosis', select.value);
    updateDiagnosisUI();
}

// 変更ボタンでロックを解除する
function unlockDiagnosis() {
    document.getElementById('diagnosis-select-container').style.display = 'block';
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
}

// UIの状態を同期させる（初期読み込み時にも呼び出す）
function updateDiagnosisUI() {
    const saved = localStorage.getItem('innernote_saved_diagnosis');
    if(saved) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = "診断名: " + saved;
    }
}

// モード切替関数
function toggleEdit(isEdit) {
    document.getElementById('diagnosis-display').style.display = isEdit ? 'none' : 'flex';
    document.getElementById('diagnosis-edit').style.display = isEdit ? 'block' : 'none';
}

// 診断名を選択した時の保存とUI切り替え
function saveAndLockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    if (select.value) {
        localStorage.setItem('saved_diagnosis', select.value);
        document.getElementById('diagnosis-label').innerText = "主な診断名: " + select.value;
        toggleEdit(false); // 表示モードへ
    }
}

// ページ読み込み時に状態を復元
window.onload = () => {
    const saved = localStorage.getItem('saved_diagnosis');
    if (saved) {
        document.getElementById('diagnosis-label').innerText = "主な診断名: " + saved;
        toggleEdit(false); // 保存済みなら表示モードから開始
    }
};
