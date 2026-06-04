window.onerror = function(message, source, lineno, colno, error) {
    alert("【エラー内容】\n" + message + "\n行番号: " + lineno);
    return true; // ブラウザのデフォルトのエラーを抑制
};

// --- 状態管理 ---
let currentMode = parseInt(localStorage.getItem('innernote_mode')) || 10;
let mood = (currentMode === 3) ? 2 : 5;
let cond = (currentMode === 3) ? 2 : 5;

// --- ページ読み込み時の処理 ---
window.onload = () => {
    renderButtons(currentMode);
    loadDiagnosis();
    updateChart();
    renderRecords();
};

// 編集エリアの表示切り替え
function toggleEdit() {
    const displayArea = document.getElementById('display-area');
    const editArea = document.getElementById('edit-area');
    
    // 表示中なら編集へ切り替え（あるいはその逆）
    if (editArea.style.display === 'none') {
        displayArea.style.display = 'none';
        editArea.style.display = 'flex';
    }
}

// 診断名の保存処理
function saveDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const display = document.getElementById('current-diagnosis');
    const displayArea = document.getElementById('display-area');
    const editArea = document.getElementById('edit-area');

    if (select.value) {
        display.innerText = select.value;
        localStorage.setItem('diagnosis', select.value);
    }

    // 表示を戻す
    displayArea.style.display = 'block';
    editArea.style.display = 'none';
}

function loadDiagnosis() {
    const saved = localStorage.getItem('diagnosis');
    if (saved) {
        document.getElementById('current-diagnosis').innerText = saved;
        const editBtn = document.getElementById('edit-btn');
        if(editBtn) editBtn.style.display = 'inline-block';
    }
}

// --- 以下の関数は既存のものをそのまま利用してください ---
function setMode(level) {
    currentMode = level;
    localStorage.setItem('innernote_mode', level);
    renderButtons(level);
}

function renderButtons(level) {
    const area = document.getElementById('input-area');
    const moodLabels = level === 3 ? ["低い", "普通", "良い"] : Array.from({length: 10}, (_, i) => i + 1);
    const condLabels = level === 3 ? ["悪い", "普通", "良い"] : Array.from({length: 10}, (_, i) => i + 1);

    area.innerHTML = `
        <h3>今の気分は？</h3><div class="scroll-wrapper"><div class="btn-group-circle" id="mood-btns"></div></div>
        <h3>体の調子は？</h3><div class="scroll-wrapper"><div class="btn-group-circle" id="cond-btns"></div></div>
    `;

    const moodBtns = document.getElementById('mood-btns');
    const condBtns = document.getElementById('cond-btns');

    for (let i = 1; i <= level; i++) {
        moodBtns.appendChild(createBtn(i, 'mood', moodLabels[i-1], mood === i));
        condBtns.appendChild(createBtn(i, 'cond', condLabels[i-1], cond === i));
    }
}

function createBtn(val, type, label, isActive) {
    const btn = document.createElement('button');
    btn.className = `btn-circle ${type} ${isActive ? 'active' : ''}`;
    btn.innerText = label;
    btn.onclick = (e) => {
        e.stopPropagation();
        if(type === 'mood') mood = val; else cond = val;
        const parent = btn.parentElement;
        parent.querySelectorAll('.btn-circle').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    };
    return btn;
}

// 他の saveRecord, renderRecords, updateChart 等はそのまま残してください
