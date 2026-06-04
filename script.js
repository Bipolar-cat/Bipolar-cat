// --- 初期設定とエラーハンドリング ---
window.onerror = function(message, source, lineno, colno, error) {
    console.error("エラー発生: " + message + " (行: " + lineno + ")");
    return true; 
};

// 診断名切り替え
function toggleEdit() {
    const displayArea = document.getElementById('display-area');
    const editArea = document.getElementById('edit-area');
    
    // 表示中なら編集へ、編集中なら表示へ
    if (displayArea.style.display !== 'none') {
        displayArea.style.display = 'none';
        editArea.style.display = 'flex';
    } else {
        displayArea.style.display = 'flex';
        editArea.style.display = 'none';
    }
}

// 診断名保存
function saveDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const display = document.getElementById('current-diagnosis');
    
    if (select.value) {
        display.innerText = select.value;
        localStorage.setItem('diagnosis', select.value);
    }
    
    document.getElementById('display-area').style.display = 'flex';
    document.getElementById('edit-area').style.display = 'none';
}

// エラー回避用：グラフがないページでも動くようにする
function updateChart() {
    const ctx = document.getElementById('myChart');
    if (!ctx) return; // グラフがなければ処理を終了
    // ...グラフ描画処理
}

function renderRecords() {
    console.log("記録一覧を表示します");
}

function loadDiagnosis() {
    const saved = localStorage.getItem('diagnosis');
    if (saved) {
        document.getElementById('current-diagnosis').innerText = saved;
    }
}

// --- ページ読み込み時に実行 ---
window.onload = () => {
    // 関数がすべて定義された後に呼び出す
    if (typeof renderButtons === 'function') renderButtons(10);
    loadDiagnosis();
    updateChart();
    renderRecords();
};
