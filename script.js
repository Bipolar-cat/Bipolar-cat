// 設定の保存と画面更新を統合
function applySettings() {
    const select = document.getElementById('diagnosis-select');
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const diag = select.value;

    // 保存
    localStorage.setItem('diag', diag);
    localStorage.setItem('mode', mode);
    
    // 表示更新
    document.getElementById('diagnosis-display').innerText = `(${diag})`;
    
    toggleSetting(); // パネルを閉じる
    renderButtons(parseInt(mode)); // ボタン生成
}

// パネルの表示切り替え
function toggleSetting() {
    const panel = document.getElementById('settings-panel');
    panel.style.display = (panel.style.display === 'none' || panel.style.display === '') ? 'block' : 'none';
}

// ページ読み込み時に状態を復元
window.onload = () => {
    // 診断名とモードの読み込み
    const savedDiag = localStorage.getItem('diag') || '未設定';
    const savedMode = localStorage.getItem('mode') || 3;
    
    // 診断名を表示
    document.getElementById('diagnosis-display').innerText = `(${savedDiag})`;
    
    // ラジオボタンの状態を合わせる
    const radio = document.querySelector(`input[name="mode"][value="${savedMode}"]`);
    if (radio) radio.checked = true;
    
    renderButtons(parseInt(savedMode));
};

// ボタン生成ロジック
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
