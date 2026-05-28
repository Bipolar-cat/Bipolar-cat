// --- グローバル変数 ---
let selectedMood = 5, selectedCond = 5;
let highlightTimeout = null;
let myChartInstance = null; // グラフを管理する変数
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

// --- グラフ描画関数 ---
function renderChart(logs) {
    const canvas = document.getElementById('myChart');
    if (!canvas) return; // canvasタグがない場合は処理を抜ける
    const ctx = canvas.getContext('2d');
    
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
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// --- ページ読み込み時に実行 ---
window.onload = () => {
    // 診断名やログの復元（既存の処理）
    // ...

    // グラフ描画（既存の処理）
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    renderChart(logs);

    // ★ボタンをここで確実に生成！
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');
};

// --- ボタン生成関数 ---
function createCircleButtons(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // ボタン生成前に中身を空にする（重複防止）
    container.innerHTML = '';
    
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        // 5番をデフォルトでアクティブにする
        if (i === 5) btn.className = 'active';
        
        btn.onclick = function() {
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (type === 'mood') selectedMood = i; 
            else selectedCond = i;
        };
        container.appendChild(btn);
    }
}
