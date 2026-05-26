// エラー回避用
window.onerror = function(msg, url, line) {
    console.log("エラー発生: " + msg + " (行: " + line + ")");
};

let selectedMood = 5, selectedCond = 5;
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

// ページ読み込み時に一度だけ実行する処理
document.addEventListener('DOMContentLoaded', () => {
    // 1. 診断名の復元
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    if (savedDiagnosis) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `主な診断名: ${savedDiagnosis}`;
    }

    // 2. ボタン生成（ここで確実に実行）
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');
    
    // 3. ログの表示とグラフ描画
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    renderLogList(logs);
    if (logs.length > 0) {
        renderChart(logs.slice(-10)); // 最新10件を表示
    }
});

function createCircleButtons(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error("IDが見つかりません: " + containerId); // ここにエラーが出たらHTMLのIDが間違っています
        return;
    }
    // ...
}
    
    // 重複防止：既にボタンがある場合はクリア
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

// グラフ描画関数
function renderChart(allLogs) {
    const canvas = document.getElementById('myChart');
    if (!canvas) return;
    if (window.myChartInstance) window.myChartInstance.destroy();

    const ctx = canvas.getContext('2d');
    window.myChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: allLogs.map(l => {
                const parts = l.date.split(' ');
                return parts[0].split('/').slice(1).join('/') + '\n' + parts[1];
            }),
            datasets: [
                { label: '気分', data: allLogs.map(l => l.mood), borderColor: '#3b82f6', tension: 0.3 },
                { label: '体調', data: allLogs.map(l => l.cond), borderColor: '#f59e0b', tension: 0.3 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { title: { display: true, text: '今の気分・体調の推移' } },
            scales: {
                x: { ticks: { font: { size: 9 }, maxRotation: 45, minRotation: 45 } },
                y: { min: 0, max: 10, ticks: { stepSize: 1 } }
            }
        }
    });
}

// （その他、renderLogList関数やsaveData関数はそのまま残してください）
// ページ読み込み時にボタンとグラフを初期化
document.addEventListener('DOMContentLoaded', () => {
    // ボタンがない場合のみ生成する安全策
    if (document.getElementById('mood-btns').children.length === 0) {
        createCircleButtons('mood-btns', 'mood');
        createCircleButtons('cond-btns', 'cond');
    }
    
    // ログとグラフの読み込み
    const logs = JSON.parse(localStorage.getItem('innernote_vfinal_400_logs') || '[]');
    if (logs.length > 0) {
        renderChart(logs.slice(-10));
    }
});

// ボタン生成の修正：確実に既存の中身をクリアしてから追加
function createCircleButtons(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ''; // 一旦空にする
    
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.type = "button";
        btn.onclick = function() {
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (type === 'mood') selectedMood = i;
            else selectedCond = i;
        };
        container.appendChild(btn);
    }
}
