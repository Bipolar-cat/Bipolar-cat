const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';
let selectedMood = 5, selectedCond = 5;
let highlightTimeout = null;

// --- ボタン生成ロジック（統合版） ---
function createRatingButtons(containerId, groupName) {
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.type = 'button';
        if (i === 5) btn.classList.add('active'); // 初期値5
        btn.onclick = function() {
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (groupName === 'mood') selectedMood = i;
            else selectedCond = i;
        };
        container.appendChild(btn);
    }
}

// --- 診断名管理 ---
function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    if (!select.value) return;
    localStorage.setItem(DIAGNOSIS_KEY, select.value);
    document.getElementById('diagnosis-text').innerText = `診断名: ${select.value}`;
    document.getElementById('diagnosis-select-container').style.display = 'none';
    document.getElementById('diagnosis-fixed-container').style.display = 'flex';
}

function unlockDiagnosis() {
    document.getElementById('diagnosis-select-container').style.display = 'block';
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
}

// --- 保存処理 ---
function saveData() {
    const note = document.getElementById('note').value;
    const diagnosisVal = localStorage.getItem(DIAGNOSIS_KEY) || "未設定";
    const now = new Date();
    const dateStr = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    logs.push({ ts: now.getTime(), date: dateStr, diagnosis: diagnosisVal, mood: selectedMood, cond: selectedCond, note: note });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    alert("記録しました！");
    location.reload();
}

// --- 初期化処理 ---
window.onload = () => {
    // ボタン生成
    createRatingButtons('mood-btns', 'mood');
    createRatingButtons('cond-btns', 'cond');

    // 診断名の復元
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    if (savedDiagnosis) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `診断名: ${savedDiagnosis}`;
    }

    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const logList = document.getElementById('log-list');

    // 履歴描画
    logs.slice().reverse().forEach(l => {
        const div = document.createElement('div');
        div.className = 'log-item';
        div.id = `log-${l.ts}`;
        div.innerHTML = `<span class="log-date">${l.date}</span>気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
        logList.appendChild(div);
    });

    // グラフ描画
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: logs.map(l => l.date),
            datasets: [
                { label: '気分', data: logs.map(l => l.mood), borderColor: '#3b82f6', tension: 0.3 },
                { label: '体調', data: logs.map(l => l.cond), borderColor: '#f59e0b', tension: 0.3 }
            ]
        },options: { 
    responsive: true, 
    maintainAspectRatio: false,
    scales: { 
        x: { 
            ticks: { autoSkip: false } 
        },
        y: { 
            min: 1,      // Y軸の最小値を1に固定
            max: 10,     // Y軸の最大値を10に固定
            ticks: { 
                stepSize: 1, // 目盛りを1刻みに設定
                precision: 0 // 小数点以下を表示しない
            }
        }
    }
        }

function renderLogList(logs) {
    const logList = document.getElementById('log-list');
    logList.innerHTML = ''; // クリア

    logs.slice().reverse().forEach(l => {
        const div = document.createElement('div');
        div.className = 'log-item'; // CSSでデザイン適用
        div.innerHTML = `
            <div class="log-date" style="font-size:0.8rem; color:#888;">${l.date}</div>
            <div class="log-summary">気分: ${l.mood} | 体調: ${l.cond}</div>
            ${l.note ? `<div class="log-note">${l.note}</div>` : ''}
        `;
        logList.appendChild(div);
    });
}
