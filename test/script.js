const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';
let selectedMood = 5, selectedCond = 5;
let myChart; // グラフのインスタンスを保持

// --- グラフの初期化と更新 ---
function initChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const displayData = data.slice(-10); // 最新10件のみ表示

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: displayData.map(l => l.date),
            datasets: [
                { label: '気分', data: displayData.map(l => l.mood), borderColor: '#3b82f6', tension: 0.3 },
                { label: '体調', data: displayData.map(l => l.cond), borderColor: '#f59e0b', tension: 0.3 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 1, max: 10, ticks: { stepSize: 1 } },
                x: { ticks: { maxRotation: 45, minRotation: 45 } }
            }
        }
    });
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

// --- ボタン生成 ---
function createRatingButtons(containerId, groupName) {
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.type = 'button';
        if (i === 5) btn.classList.add('active');
        btn.onclick = function() {
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (groupName === 'mood') selectedMood = i;
            else selectedCond = i;
        };
        container.appendChild(btn);
    }
}

// --- 保存処理 ---
function saveData() {
    const note = document.getElementById('note').value;
    const diagnosisVal = localStorage.getItem(DIAGNOSIS_KEY) || "未設定";
    const now = new Date();
    const dateStr = `${now.getFullYear()}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    let logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    logs.push({ ts: now.getTime(), date: dateStr, diagnosis: diagnosisVal, mood: selectedMood, cond: selectedCond, note: note });
    
    if (logs.length > 50) logs.shift(); // 過去ログ50件制限
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    alert("記録しました！");
    location.reload();
}

// --- 初期化 ---
window.onload = () => {
    createRatingButtons('mood-btns', 'mood');
    createRatingButtons('cond-btns', 'cond');

    // 診断名の復元
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    if (savedDiagnosis) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `診断名: ${savedDiagnosis}`;
    }

    // 履歴とグラフの表示
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const logList = document.getElementById('log-list');

    logs.slice().reverse().forEach(l => {
        const div = document.createElement('div');
        div.className = 'log-item';
        div.innerHTML = `<span class="log-date">${l.date}</span> 気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
        logList.appendChild(div);
    });

    initChart(logs); // グラフ描画
};
