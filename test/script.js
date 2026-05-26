// エラー回避用
window.onerror = function(msg, url, line) {
    console.log("エラー発生: " + msg + " (行: " + line + ")");
};

let selectedMood = 5, selectedCond = 5;
const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

// ボタン生成の実行を確実にする
function setupButtons() {
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');
}

document.addEventListener('DOMContentLoaded', () => {
    // ボタンの生成（ここが一番大事）
    setupButtons();

    // 診断名の復元
    const savedDiagnosis = localStorage.getItem(DIAGNOSIS_KEY);
    if (savedDiagnosis) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = `主な診断名: ${savedDiagnosis}`;
    }

    // グラフの描画
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (logs.length > 0) renderChart(logs.slice(-10));
});

function createCircleButtons(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ''; // 一旦空にする
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.type = "button";
        btn.style.margin = "0 5px"; // ボタン同士の隙間を強制設定
        btn.style.padding = "10px";
        
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
// ...以降、renderChartやsaveDataなどの関数はそのまま残す
function saveData() {
    // ...（データ取得と保存の処理）...
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    alert("記録しました！");

    // リロードの前に念のため少しだけ時間を置く（ブラウザの同期ズレ対策）
    setTimeout(() => {
        location.reload();
    }, 100);
}
