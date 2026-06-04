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
    const display = document.getElementById('display-area');
    const edit = document.getElementById('edit-area');
    
    // 表示状態を反転させる
    if (edit.style.display === 'none') {
        display.style.display = 'none';
        edit.style.display = 'flex'; // blockではなくflexにするとCSSが適用されやすい
    } else {
        display.style.display = 'block';
        edit.style.display = 'none';
    }
}

function saveDiagnosis() {
    const val = document.getElementById('diagnosis-select').value;
    if (!val) return alert("診断名を選択してください");
    localStorage.setItem('myDiagnosis', val);
    document.getElementById('current-diagnosis').innerText = val;
    toggleEdit();
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
