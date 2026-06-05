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

// 設定パネルの表示・非表示を切り替える関数
function toggleSetting() {
    const panel = document.getElementById('settings-panel');
    // 現在の表示状態を反転させる
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
    } else {
        panel.style.display = 'none';
    }
}

// 保存時の処理
function saveSettings() {
    // 診断名の保存
    const select = document.getElementById('diagnosis-select');
    localStorage.setItem('saved_diagnosis', select.value);
    document.getElementById('diagnosis-label').innerText = "診断名: " + select.value;
    
    // モードの保存
    const selectedMode = document.querySelector('input[name="mode"]:checked').value;
    localStorage.setItem('selected_mode', selectedMode);
    
    // パネルを閉じる
    toggleSetting();
    
    // ボタンの再生成
    renderButtons(parseInt(selectedMode));
}

function renderButtons(type) {
    const container = document.getElementById('dynamic-inputs');
    container.innerHTML = '';
    // ここにボタン生成ロジックを書く
    console.log(type + "段階のボタンを生成しました");
}

function applySettings() {
    const select = document.getElementById('diagnosis-select');
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const diag = select.value;

    // 診断名を () にして保存・表示
    const displayStr = `(${diag})`;
    localStorage.setItem('diag', diag);
    localStorage.setItem('mode', mode);
    
    document.getElementById('diagnosis-display').innerText = displayStr;
    
    toggleSetting(); // パネルを閉じる
    renderButtons(parseInt(mode)); // ボタン生成
}

// 2. ボタン生成ロジック
function renderButtons(mode) {
    const container = document.getElementById('dynamic-inputs');
    container.innerHTML = '';
    
    // 気分と体調の各行を作成
    ['気分', '体調'].forEach(label => {
        const row = document.createElement('div');
        row.innerHTML = `<p>${label}</p>`;
        const group = document.createElement('div');
        group.className = 'rating-group';
        
        // 3段階なら角丸四角、10段階なら丸ボタン
        const items = mode === 3 ? ['良い', '普通', '低い'] : [...Array(10).keys()].map(i => i + 1);
        
        items.forEach(val => {
            const btn = document.createElement('button');
            btn.innerText = val;
            btn.className = `rating-btn ${mode === 3 ? 'square' : ''}`;
            btn.onclick = () => {
                group.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            };
            group.appendChild(btn);
        });
        row.appendChild(group);
        container.appendChild(row);
    });
}


// 読み込み時：カッコ付きで表示を復元
window.onload = () => {
    const savedDiag = localStorage.getItem('diag') || '未設定';
    document.getElementById('diagnosis-display').innerText = `(${savedDiag})`;
    
    const savedMode = localStorage.getItem('mode') || 3;
    renderButtons(parseInt(savedMode));
};
