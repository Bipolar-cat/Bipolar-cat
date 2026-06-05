// --- 初期化処理は一つにまとめる ---
window.onload = () => {
    // 1. 診断名の復元
    const savedDiagnosis = localStorage.getItem('saved_diagnosis');
    if (savedDiagnosis) {
        document.getElementById('diagnosis-label').innerText = "診断名: " + savedDiagnosis;
    }

    // 2. モードの復元
    const savedMode = localStorage.getItem('selected_mode') || 3;
    document.querySelector(`input[name="mode"][value="${savedMode}"]`).checked = true;
    renderButtons(parseInt(savedMode));
};

// --- 設定保存処理（統合版） ---
function saveSettings() {
    // 1. 診断名の保存
    const select = document.getElementById('diagnosis-select');
    if(select.value) {
        localStorage.setItem('saved_diagnosis', select.value);
        document.getElementById('diagnosis-label').innerText = "診断名: " + select.value;
    }
    
    // 2. モードの保存
    const selectedMode = document.querySelector('input[name="mode"]:checked').value;
    localStorage.setItem('selected_mode', selectedMode);
    
    // 3. 処理完了
    toggleSetting(); // パネルを閉じる
    renderButtons(parseInt(selectedMode));
}

// --- 以下、補助的な関数 ---
function toggleSetting() {
    const panel = document.getElementById('settings-panel');
    panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
}

function renderButtons(type) {
    const container = document.getElementById('dynamic-inputs');
    container.innerHTML = '';
    // ここにボタン生成ロジックを書く
    console.log(type + "段階のボタンを生成しました");
}
