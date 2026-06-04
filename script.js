window.onerror = function(message, source, lineno, colno, error) {
    alert("エラー発生: " + message + "\nファイル: " + source + "\n行: " + lineno);
};

// --- 状態管理 ---
let mood = null;
let cond = null;
let currentMode = parseInt(localStorage.getItem('innernote_mode')) || 10;

// 初期化
window.onload = () => {
    renderButtons(currentMode);
    loadDiagnosis();
    updateChart();
    renderRecords();
};

function toggleEdit() {
    // 要素を取得
    const displayArea = document.getElementById('display-area');
    const editArea = document.getElementById('edit-area');

    // 表示を切り替え
    displayArea.style.display = 'none';
    editArea.style.display = 'flex'; // 編集エリアを表示
}

function saveDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const display = document.getElementById('current-diagnosis');
    const displayArea = document.getElementById('display-area');
    const editArea = document.getElementById('edit-area');

    // 選択された値を反映
    if (select.value) {
        display.innerText = select.value;
        localStorage.setItem('diagnosis', select.value);
    }

    // 元に戻す
    displayArea.style.display = 'flex';
    editArea.style.display = 'none';
}

function loadDiagnosis() {
    const saved = localStorage.getItem('myDiagnosis');
    if (saved) document.getElementById('current-diagnosis').innerText = saved;
}

// ボタン切り替え機能
function setMode(level) {
    currentMode = level;
    localStorage.setItem('innernote_mode', level);
    renderButtons(level);
}

// 初期値の設定
let currentMode = parseInt(localStorage.getItem('innernote_mode')) || 3;
let mood = (currentMode === 3) ? 2 : 5; // 3段階なら普通(2)、10段階なら5
let cond = (currentMode === 3) ? 2 : 5;

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
    btn.onclick = () => {
        if(type === 'mood') mood = val; else cond = val;
        const parent = btn.parentElement;
        parent.querySelectorAll('.btn-circle').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    };
    return btn;
}

// 記録保存
function saveRecord() {
    if (!mood || !cond) return alert("気分と体調を選択してください");
    const data = JSON.parse(localStorage.getItem('innernote_data') || '[]');
    data.push({ mood, cond, memo: document.getElementById('memo').value, timestamp: new Date().toISOString() });
    localStorage.setItem('innernote_data', JSON.stringify(data));
    renderRecords();
    updateChart();
}

// 記録一覧表示
function renderRecords() {
    const data = JSON.parse(localStorage.getItem('innernote_data') || '[]');
    const list = document.getElementById('recent-records');
    list.innerHTML = data.slice().reverse().map(item => `
        <div style="border-bottom:1px solid #eee; padding:10px;">
            <small>${new Date(item.timestamp).toLocaleString()}</small>
            <p>気分: ${item.mood} / 体調: ${item.cond}</p>
            <p>${item.memo}</p>
        </div>
    `).join('');
}

// グラフ描画
let chart = null;
function updateChart() {
    const data = JSON.parse(localStorage.getItem('innernote_data') || '[]');
    const ctx = document.getElementById('myChart').getContext('2d');
    
    if(chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => new Date(d.timestamp).toLocaleDateString()),
            datasets: [
                { label: '気分', data: data.map(d => d.mood), borderColor: '#3b82f6' },
                { label: '体調', data: data.map(d => d.cond), borderColor: '#f59e0b' }
            ]
        }
    });
}

// テスト用コード
function toggleEdit() {
    alert("ボタンが押されました！"); // ボタンが押されたら画面に通知が出るはず
    const displayArea = document.getElementById('display-area');
    const editArea = document.getElementById('edit-area');
    displayArea.style.display = 'none';
    editArea.style.display = 'flex';
}
