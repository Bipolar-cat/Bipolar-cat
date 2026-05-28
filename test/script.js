window.onerror = function(message, source, lineno, colno, error) {
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'fixed';
    errorDiv.style.top = '0';
    errorDiv.style.left = '0';
    errorDiv.style.width = '100%';
    errorDiv.style.backgroundColor = 'red';
    errorDiv.style.color = 'white';
    errorDiv.style.padding = '10px';
    errorDiv.style.zIndex = '9999';
    errorDiv.style.fontSize = '12px';
    errorDiv.textContent = `エラー: ${message} (行: ${lineno})`;
    document.body.appendChild(errorDiv);
};

// --- グローバル変数 ---
let selectedMood = 5, selectedCond = 5;
let highlightTimeout = null;
let myChartInstance = null; // グラフを管理する変数
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

// --- グラフ描画関数 ---
function renderChart(logs) {
    <div class="scroll-container" style="overflow-x: auto; width: 100%;">
    <div style="min-width: 600px; height: 350px;"> <canvas id="myChart"></canvas>
    </div>
</div>
    
    // 既存のグラフがあれば破棄
    if (myChartInstance) myChartInstance.destroy();

    myChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: logs.map(l => l.date),
            datasets: [
                { label: '気分', data: logs.map(l => l.mood), borderColor: '#3b82f6', tension: 0.3 },
                { label: '体調', data: logs.map(l => l.cond), borderColor: '#f59e0b', tension: 0.3 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // これをfalseにすることで、親のdivのサイズに従うようになります
            scales: {
                x: {
                    ticks: { maxRotation: 45, minRotation: 45 } // 日付が重ならないよう斜めに表示
                }
            }
        }

window.onload = () => {
    // 1. まず診断名の表示処理（最優先）
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    const selectContainer = document.getElementById('diagnosis-select-container');
    
    if (fixedContainer && selectContainer) {
        if (savedDiagnosis) {
            fixedContainer.style.display = 'flex';
            selectContainer.style.display = 'none';
            document.getElementById('diagnosis-text').innerText = `主な診断名: ${savedDiagnosis}`;
        } else {
            fixedContainer.style.display = 'none';
            selectContainer.style.display = 'block';
        }
    }

    // 2. ボタン生成
    try {
        createCircleButtons('mood-btns', 'mood');
        createCircleButtons('cond-btns', 'cond');
    } catch (e) {
        console.error("ボタン生成エラー:", e);
    }

    // 3. データ取得とリスト描画
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const logList = document.getElementById('log-list');
    if (logList) {
        logList.innerHTML = ''; 
        logs.slice().reverse().forEach(l => {
            const div = document.createElement('div');
            div.className = 'log-item';
            div.innerHTML = `<span>${l.date}</span> 気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
            logList.appendChild(div);
        });
    }

    // 4. グラフ描画（最新10件）
    try {
        renderChart(logs.slice(-10));
    } catch (e) {
        console.error("グラフ描画エラー:", e);
    }
};
