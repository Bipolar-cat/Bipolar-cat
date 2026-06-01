const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';
let selectedMood = 5, selectedCond = 5;
let highlightTimeout = null;
let logs = []; 
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, { ... }); // 変数名 myChart をつけておく

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

   const ctx = document.getElementById('myChart').getContext('2d');

// サンプルデータ: 過去50件の中から最新10件を想定
const allData = [ /* ここに過去50件のデータが入る想定 */ ];
const displayData = allData.slice(-10); // 最新10件を取得

new Chart(ctx, {
    type: 'line',
    data: {
        labels: displayData.map(item => item.timestamp), // 西暦日時
        datasets: [
            {
                label: '気分',
                data: displayData.map(item => item.mood),
                borderColor: '#3b82f6',
                tension: 0.3
            },
            {
                label: '体調',
                data: displayData.map(item => item.condition),
                borderColor: '#f59e0b',
                tension: 0.3
            }
        ]
    },

    // 2. その直後に記録用の関数を定義
function addRecord(moodVal, conditionVal) {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    logs.push({
        timestamp: formattedDate,
        mood: moodVal,
        condition: conditionVal
    });
    
    // 50件制限
    if (logs.length > 50) logs.shift();

    // グラフ更新
    const latest10 = logs.slice(-10);
    myChart.data.labels = latest10.map(item => item.timestamp);
    myChart.data.datasets[0].data = latest10.map(item => item.mood);
    myChart.data.datasets[1].data = latest10.map(item => item.condition);
    myChart.update();
}
    
    options: {
        responsive: true,
        maintainAspectRatio: false, // 縦横比を固定せずコンテナに従う
        scales: {
            y: {
                min: 1,
                max: 10,
                ticks: { stepSize: 1 }
            },
            x: {
                ticks: {
                    maxRotation: 45, // 日時を斜めにする設定
                    minRotation: 45
                }
            }
        }
    }
});
};
