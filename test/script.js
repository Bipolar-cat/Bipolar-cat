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

window.onload = () => {
    // 1. ボタンを確実に生成
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');

    // 2. ログデータの取得
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    // 3. 診断名の復元（以前のロジック）
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    if (savedDiagnosis) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `主な診断名: ${savedDiagnosis}`;
        const select = document.getElementById('diagnosis-select');
        select.value = savedDiagnosis.startsWith("その他 (") ? "その他" : savedDiagnosis;
    } else {
        document.getElementById('diagnosis-fixed-container').style.display = 'none';
        document.getElementById('diagnosis-select-container').style.display = 'block';
    }

    // 4. ログリストの描画（以前のロジック）
    const logList = document.getElementById('log-list');
    if (logList) {
        logs.slice().reverse().forEach(l => {
            const div = document.createElement('div');
            div.className = 'log-item';
            const itemTs = l.ts || new Date(l.date).getTime();
            div.id = `log-${itemTs}`;
            const diagBadge = l.diagnosis && l.diagnosis !== '未診断（健常者）' ? `<span class="log-diagnosis">${l.diagnosis}</span>` : '';
            div.innerHTML = `<span class="log-date">${l.date}${diagBadge}</span>気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
            logList.appendChild(div);
        });
    }

    // 5. グラフの描画（一番最後）
    renderChart(logs);
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
// 診断名を変更するための関数
function enableDiagnosisChange() {
    // 診断名表示エリアを隠す
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    if (fixedContainer) {
        fixedContainer.style.display = 'none';
    }
    
    // プルダウンエリアを表示する
    const selectContainer = document.getElementById('diagnosis-select-container');
    if (selectContainer) {
        selectContainer.style.display = 'block';
    }
}
