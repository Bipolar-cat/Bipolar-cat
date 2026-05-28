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
    // 1. ボタン生成（確実に実行）
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');

    // 2. データの取得
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    // 3. 診断名の復元処理（これが消えると診断名が表示されません）
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    const selectContainer = document.getElementById('diagnosis-select-container');
    
    if (savedDiagnosis && fixedContainer && selectContainer) {
        fixedContainer.style.display = 'flex';
        selectContainer.style.display = 'none';
        document.getElementById('diagnosis-text').innerText = `主な診断名: ${savedDiagnosis}`;
    }

    // 4. 最近の記録リストの描画（これが消えるとリストが表示されません）
    const logList = document.getElementById('log-list');
    if (logList) {
        logList.innerHTML = ''; // 一度クリア
        logs.slice().reverse().forEach(l => {
            const div = document.createElement('div');
            div.className = 'log-item';
            div.innerHTML = `<span>${l.date}</span> 気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
            logList.appendChild(div);
        });
    }

    // 5. グラフの描画（最後に最新10件だけを表示）
    renderChart(logs.slice(-10));
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
console.log("Mood:", selectedMood, "Cond:", selectedCond);
function saveData() {
    // 1. 診断名の取得
    let diagnosisVal = "";
    const isSelectVisible = document.getElementById('diagnosis-select-container').style.display !== 'none';
    
    if (isSelectVisible) {
        const select = document.getElementById('diagnosis-select');
        const otherInput = document.getElementById('diagnosis-other');
        diagnosisVal = (select.value === 'その他') ? `その他 (${otherInput.value.trim()})` : select.value;
        localStorage.setItem(DIAGNOSIS_KEY, diagnosisVal);
    } else {
        diagnosisVal = localStorage.getItem(DIAGNOSIS_KEY) || "未診断";
    }

    // 2. ★ここを修正：ボタンが押されていない時のデフォルト値（5）を補う
    const finalMood = (typeof selectedMood !== 'undefined') ? selectedMood : 5;
    const finalCond = (typeof selectedCond !== 'undefined') ? selectedCond : 5;

    // 3. ログデータの作成
    const note = document.getElementById('note').value;
    const newLog = {
        ts: Date.now(),
        date: new Date().toLocaleString(),
        diagnosis: diagnosisVal,
        mood: finalMood, // 修正後の値を使用
        cond: finalCond, // 修正後の値を使用
        note: note
    };

    // 4. 保存と更新
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    logs.push(newLog);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));

    alert('記録しました');
    location.reload();
}

function saveData() {
    // 1. 診断名の取得（表示されている方を選択）
    let diagnosisVal = "";
    const isSelectVisible = document.getElementById('diagnosis-select-container').style.display !== 'none';
    
    if (isSelectVisible) {
        const select = document.getElementById('diagnosis-select');
        const otherInput = document.getElementById('diagnosis-other');
        diagnosisVal = (select.value === 'その他') ? `その他 (${otherInput.value.trim()})` : select.value;
        // 診断名を保存
        localStorage.setItem(DIAGNOSIS_KEY, diagnosisVal);
    } else {
        diagnosisVal = localStorage.getItem(DIAGNOSIS_KEY) || "未診断";
    }

    // 2. ログデータの作成
    const note = document.getElementById('note').value;
    const newLog = {
        ts: Date.now(),
        date: new Date().toLocaleString(),
        diagnosis: diagnosisVal,
        mood: selectedMood,
        cond: selectedCond,
        note: note
    };

    // 3. ローカルストレージへの保存
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    logs.push(newLog);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));

    // 4. 反映（ページ更新）
    alert('記録しました');
    location.reload();
}
