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
    if (select.value === 'その他') {
        otherInput.style.display = 'block';
        otherInput.focus(); // 入力欄にフォーカスを合わせる
    } else {
        otherInput.style.display = 'none';
        otherInput.value = ''; // 値をクリア
    }
}Input.style.display = (select.value === 'その他') ? 'block' : 'none';
}

// 「変更」ボタンが押された時の処理
function enableDiagnosisChange() {
    // 固定表示エリアを隠し、選択エリアを表示する
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
    document.getElementById('diagnosis-select-container').style.display = 'block';
}

// 記録保存時に診断名を処理する (saveData関数に追加)
function getFinalDiagnosis() {
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    const selectContainer = document.getElementById('diagnosis-select-container');
    let finalDiagnosis = '指定なし';

    // もし固定表示されている（既に保存されている）なら、そのテキストを使う
    if (fixedContainer.style.display !== 'none') {
        const fullText = document.getElementById('diagnosis-text').innerText;
        finalDiagnosis = fullText.replace('主な診断名: ', '');
    } 
    // もし選択エリアが表示されているなら、選択された値を採用し、保存する
    else if (selectContainer.style.display !== 'none') {
        const select = document.getElementById('diagnosis-select');
        if (select.value === 'その他') {
            const otherInput = document.getElementById('diagnosis-other');
            finalDiagnosis = otherInput.value.trim() || 'その他 (未入力)';
        } else {
            finalDiagnosis = select.value;
        }
        // 選択された新しい診断名をLocalStorageに保存
        localStorage.setItem(DIAGNOSIS_KEY, finalDiagnosis);
    }

    return finalDiagnosis;
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
    // グラフ描画など、既存の処理
    renderChart();
    // 10段階ボタン生成など、既存の処理
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');

    // --- 診断名表示の初期化 ---
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    const selectContainer = document.getElementById('diagnosis-select-container');
    const diagnosisText = document.getElementById('diagnosis-text');

    if (savedDiagnosis) {
        // 1. 保存されている場合: 固定表示にする
        selectContainer.style.display = 'none';
        fixedContainer.style.display = 'flex'; // ボタンと並べるためにflexにする
        diagnosisText.innerText = `主な診断名: ${savedDiagnosis}`;
    } else {
        // 2. 保存されていない場合: 選択エリアを表示
        selectContainer.style.display = 'block';
        fixedContainer.style.display = 'none';
    }
};

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
