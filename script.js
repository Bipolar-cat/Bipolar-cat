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

// 設定パネルの表示・非表示
function toggleSetting() {
    const panel = document.getElementById('settings-panel');
    panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
}

function saveSettings() {
    // 1. 診断名の保存
    const select = document.getElementById('diagnosis-select');
    localStorage.setItem('saved_diagnosis', select.value);
    document.getElementById('diagnosis-label').innerText = "診断名: " + select.value;
    
    // 2. モードの保存
    const selectedMode = document.querySelector('input[name="mode"]:checked').value;
    localStorage.setItem('selected_mode', selectedMode);
    
    // 3. UIの更新とパネルを閉じる
    toggleSetting();
    renderButtons(parseInt(selectedMode));
}

// 読み込み時にも適用
window.onload = () => {
    const savedMode = localStorage.getItem('selected_mode') || 3;
    renderButtons(parseInt(savedMode));
    
    // ラジオボタンの初期状態も合わせる
    document.querySelector(`input[name="mode"][value="${savedMode}"]`).checked = true;
};

// ページ読み込み時に状態を復元
window.onload = () => {
    const saved = localStorage.getItem('saved_diagnosis');
    if (saved) {
        document.getElementById('diagnosis-label').innerText = "主な診断名: " + saved;
        toggleEdit(false); // 保存済みなら表示モードへ
    } else {
        toggleEdit(true); // 未設定なら編集モードへ
    }
};

// モード切替のUI切り替え
function toggleModeEdit() {
    document.getElementById('mode-display').style.display = 'none';
    document.getElementById('mode-edit').style.display = 'block';
}

// モードを設定して保存・描画
function setMode(type) {
    localStorage.setItem('selected_mode', type); // 保存
    
    // ラベル更新とUIを元に戻す
    document.getElementById('current-mode-label').innerText = type + "段階";
    document.getElementById('mode-display').style.display = 'block';
    document.getElementById('mode-edit').style.display = 'none';
    
    renderButtons(type); // ボタンを再描画
}

// ボタン描画処理（既存の処理を関数化）
function renderButtons(type) {
    const container = document.getElementById('dynamic-inputs');
    container.innerHTML = ''; 
    // ここに「3段階」または「10段階」のボタンを生成するロジックを記述
    // ...
}

// ページ読み込み時に自動反映
window.onload = () => {
    // ...診断名の復元...
    
    const savedMode = localStorage.getItem('selected_mode') || 3; // デフォルトは3
    setMode(parseInt(savedMode));
};
