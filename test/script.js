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

// --- ページ読み込み時に全て実行 ---
window.onload = () => {
    // 診断名やログリストの復元処理をここに記述
    // ...（既存の診断名復元ロジック）...
    // ...（既存のログリスト描画ロジック）...

    // 最後にグラフを描画
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    renderChart(logs);
};

// --- 関数群（createCircleButtonsなど）をここに配置 ---
