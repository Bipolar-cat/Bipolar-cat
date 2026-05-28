// --- グローバル変数 ---
let selectedMood = 5, selectedCond = 5;
let myChartInstance = null;
let highlightTimeout = null;
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis'; // 診断名保存用
// --- 各種関数 ---
function toggleOtherDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const otherInput = document.getElementById('diagnosis-other');
    if (!select || !otherInput) return;
    otherInput.style.display = (select.value === 'その他') ? 'block' : 'none';
}

function unlockDiagnosis() {
    const fixed = document.getElementById('diagnosis-fixed-container');
    const select = document.getElementById('diagnosis-select-container');
    if (fixed) fixed.style.display = 'none';
    if (select) select.style.display = 'block';
}

function createCircleButtons(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.type = "button";
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

// 【改善】Y軸を1〜10に固定したグラフ描画関数
function renderScrollableChart(logs) {
    const canvas = document.getElementById('myChart');
    const container = document.getElementById('chart-wrapper');
    if (!canvas || !container) return;
    
    const newWidth = Math.max(window.innerWidth, logs.length * 60);
    container.style.width = newWidth + 'px';

    if (myChartInstance) myChartInstance.destroy();

    const ctx = canvas.getContext('2d');
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
    maintainAspectRatio: false,
    scales: {
        y: {
            min: 1,      // 最小値を1に固定
            max: 10,     // 最大値を10に固定
            ticks: {
                stepSize: 1 // 1刻みで表示
            }
        },
        x: {
            ticks: { maxRotation: 45 }
        }
    }
        }
    });
}

function saveData() {
    const note = document.getElementById('note').value;
    let diagnosisVal = localStorage.getItem(DIAGNOSIS_KEY) || "双極症";
    const selectContainer = document.getElementById('diagnosis-select-container');
    
    if (selectContainer && selectContainer.style.display !== 'none') {
        const select = document.getElementById('diagnosis-select');
        diagnosisVal = select.value === 'その他' ? `その他 (${document.getElementById('diagnosis-other').value.trim()})` : select.value;
        localStorage.setItem(DIAGNOSIS_KEY, diagnosisVal);
    }

    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    logs.push({ ts: Date.now(), date: new Date().toLocaleString(), diagnosis: diagnosisVal, mood: selectedMood, cond: selectedCond, note: note });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    alert("記録しました！");
    location.reload();
}

// --- ページ初期化 ---
window.onload = () => {
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');

    // --- 診断名デザインの復元処理 ---
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    const selectContainer = document.getElementById('diagnosis-select-container');
    const diagnosisText = document.getElementById('diagnosis-text');

    // 保存された診断名があれば、「選択」ではなく「表示（固定）」状態にする
    if (savedDiagnosis && fixedContainer && selectContainer) {
        selectContainer.style.display = 'none'; // 選択肢を隠す
        fixedContainer.style.display = 'flex';  // 固定表示を表示
        if (diagnosisText) {
            diagnosisText.innerText = `主な診断名: ${savedDiagnosis}`;
        }
    } else {
        // 保存がない場合は初期状態（選択肢を表示）
        if (selectContainer) selectContainer.style.display = 'block';
        if (fixedContainer) fixedContainer.style.display = 'none';
    }

    // --- 履歴表示とグラフ描画 ---
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const logList = document.getElementById('log-list');
    
    if (logList) {
        logList.innerHTML = '';
        logs.slice().reverse().forEach(l => {
            const div = document.createElement('div');
            div.className = 'log-item';
            div.innerHTML = `<span class="log-date">${l.date}</span>気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
            logList.appendChild(div);
        });
    }

    renderScrollableChart(logs);
};
    renderScrollableChart(logs);
};
