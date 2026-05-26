// エラー回避用
window.onerror = function(msg, url, line) {
    console.log("エラー発生: " + msg + " (行: " + line + ")");
};

let selectedMood = 5, selectedCond = 5;
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

document.addEventListener('DOMContentLoaded', () => {
    // 1. 診断名の復元
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    if (savedDiagnosis) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `主な診断名: ${savedDiagnosis}`;
    }

    // 2. ボタン生成
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');
    
    // 3. データ取得と描画
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    renderLogList(logs); // 記録リスト表示
    if (logs.length > 0) {
        renderChart(logs.slice(-10)); // グラフ表示
    }
});

function createCircleButtons(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.type = "button";
        if (i === 5) btn.classList.add('active');
        btn.onclick = function() {
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (type === 'mood') selectedMood = i;
            else selectedCond = i;
        };
        container.appendChild(btn);
    }
}

function renderLogList(logs) {
    const logList = document.getElementById('log-list');
    if (!logList) return;
    logList.innerHTML = '';
    logs.slice().reverse().forEach(l => {
        const div = document.createElement('div');
        div.className = 'log-item';
        div.innerHTML = `<strong>${l.date}</strong><br>気分:${l.mood} / 体調:${l.cond}<br>${l.note || ''}<hr>`;
        logList.appendChild(div);
    });
}

function renderChart(allLogs) {
    const canvas = document.getElementById('myChart');
    if (!canvas) return;
    if (window.myChartInstance) window.myChartInstance.destroy();

    const ctx = canvas.getContext('2d');
    window.myChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: allLogs.map(l => l.date.split(' ')[0].substring(5)),
            datasets: [
                { label: '気分', data: allLogs.map(l => l.mood), borderColor: '#3b82f6', tension: 0.3 },
                { label: '体調', data: allLogs.map(l => l.cond), borderColor: '#f59e0b', tension: 0.3 }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function saveData() {
    const note = document.getElementById('note').value;
    const diagnosisVal = localStorage.getItem(DIAGNOSIS_KEY) || "双極症";
    const now = new Date();
    const dateStr = `${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    logs.push({ date: dateStr, mood: selectedMood, cond: selectedCond, note: note });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    alert("記録しました！");
    location.reload();
}
// 診断名を変更するために一度ロックを解除する
function unlockDiagnosis() {
    // 1. 固定表示エリアを隠す
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
    // 2. セレクトボックスを表示する
    document.getElementById('diagnosis-select-container').style.display = 'block';
    // 3. 保存された診断名を削除（必要に応じて）
    localStorage.removeItem(DIAGNOSIS_KEY);
}

// 診断名を選択したときに固定する
function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const value = select.value;
    if (!value) return;

    // 1. ローカルストレージに保存
    localStorage.setItem(DIAGNOSIS_KEY, value);
    
    // 2. 表示を切り替える
    document.getElementById('diagnosis-select-container').style.display = 'none';
    const fixed = document.getElementById('diagnosis-fixed-container');
    fixed.style.display = 'flex';
    document.getElementById('diagnosis-text').innerText = `主な診断名: ${value}`;
}
