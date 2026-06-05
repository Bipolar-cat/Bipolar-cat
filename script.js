// --- 設定の適用・保存関数 ---
function applySettings() {
    // 1. 診断名の取得・保存
    const select = document.getElementById('diagnosis-select');
    const diag = select.value;
    localStorage.setItem('diag', diag);
    
    // 画面表示をカッコ付きで更新
    document.getElementById('diagnosis-display').innerText = `(${diag})`;

    // 2. モードの取得・保存
    const mode = document.querySelector('input[name="mode"]:checked').value;
    localStorage.setItem('mode', mode);
    
    // 3. 設定パネルを閉じる
    toggleSetting();
    
    // 4. 評価ボタンの再描画
    renderButtons(parseInt(mode));
}

// --- 設定パネルの開閉 ---
function toggleSetting() {
    const panel = document.getElementById('settings-panel');
    panel.style.display = (panel.style.display === 'none' || panel.style.display === '') ? 'block' : 'none';
}

// --- ボタン生成ロジック ---
function renderButtons(mode) {
    const container = document.getElementById('dynamic-inputs');
    container.innerHTML = '';
    
    ['気分', '体調'].forEach(label => {
        const row = document.createElement('div');
        row.innerHTML = `<p>${label}</p>`;
        const group = document.createElement('div');
        group.className = 'rating-group';
        
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

// --- ページ読み込み時の復元 ---
window.onload = () => {
    // 診断名の復元
    const savedDiag = localStorage.getItem('diag') || '未設定';
    document.getElementById('diagnosis-display').innerText = `(${savedDiag})`;
    
    // モードの復元（ラジオボタンの状態も合わせる）
    const savedMode = localStorage.getItem('mode') || 3;
    const radio = document.querySelector(`input[name="mode"][value="${savedMode}"]`);
    if (radio) radio.checked = true;
    
    renderButtons(parseInt(savedMode));
};
