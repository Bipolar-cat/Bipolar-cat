let selectedMood = 5, selectedCond = 5;
let highlightTimeout = null;

// --- script.js の先頭部分 ---
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

// ページ読み込み時に実行する処理をまとめる
function initApp() {
    // 1. 診断名の復元
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    if (savedDiagnosis) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `主な診断名: ${savedDiagnosis}`;
    }

    // 2. ボタン生成（ここに配置！）
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');

    // 3. グラフとログの描画
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    renderChart(logs);
    // ...リスト表示処理...
}

// 最後に1回だけ実行
initApp();

// ボタン生成関数などはそのまま下に記述
function createCircleButtons(containerId, type) { /* ... */ }
// renderChart関数などもそのまま下に記述

function renderChart(allLogs) {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: allLogs.map(l => l.date),
            datasets: [
                { label: '気分', data: allLogs.map(l => l.mood), borderColor: '#3b82f6', tension: 0.3 },
                { label: '体調', data: allLogs.map(l => l.cond), borderColor: '#f59e0b', tension: 0.3 }
            ]
        },
        options: {
            responsive: false, // ★ここを false にすることで崩れを防ぐ
            maintainAspectRatio: false,
            onClick: (evt, elements, chart) => {
                const activePoints = chart.getElementsAtEventForMode(evt, 'index', { intersect: false }, true);
                if (activePoints.length > 0) {
                    const index = activePoints[0].index;
                    const logData = allLogs[index]; // ★last10 を allLogs に修正
                    scrollToLog(logData.ts || new Date(logData.date).getTime());
                }
            }
        }
    });
}

function createCircleButtons(containerId, type) {
    const container = document.getElementById(containerId);
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
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

// ...保存処理やその他の関数はそのまま残してください...
// データの保存処理
function saveData() {
    const note = document.getElementById('note').value;
    
    // 診断名の取得
    let diagnosisVal = localStorage.getItem(DIAGNOSIS_KEY) || "双極症";
    const select = document.getElementById('diagnosis-select');
    if (select && select.value) {
        diagnosisVal = select.value;
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // 既存データの取得
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    // 新しい記録を追加
    logs.push({ 
        ts: now.getTime(), 
        date: dateStr, 
        diagnosis: diagnosisVal,
        mood: selectedMood, 
        cond: selectedCond, 
        note: note 
    });
    
    // 保存してリロード
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    alert("記録しました！");
    location.reload(); // これが実行されることで画面が更新され、グラフとリストに反映されます
}
