console.log("script.js が読み込まれました");

function createMoodButtons() {
    const moodContainer = document.getElementById('mood-btns');
    if (!moodContainer) {
        console.error("エラー: mood-btns が見つかりません");
        return;
    }

    moodContainer.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.style.width = '35px';
        btn.style.height = '35px';
        btn.style.borderRadius = '50%';
        btn.style.border = '1px solid #007bff';
        btn.style.background = 'white';
        btn.style.color = '#007bff';
        btn.style.cursor = 'pointer';
        
        btn.onclick = () => alert(i + ' が選択されました');
        moodContainer.appendChild(btn);
    }
}

// 診断名の読み込み（もし関数がなければこれだけでもOK）
function loadDiagnosis() {
    const saved = localStorage.getItem('userDiagnosis') || '未設定';
    // 診断名を表示する場所を作った場合、ここにDOM操作を書く
}

function createButtons(containerId, color) {
    const container = document.getElementById(containerId);
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.style.borderColor = color;
        btn.style.color = color;
        container.appendChild(btn);
    }
}

// ページ読み込み時の処理
window.onload = () => {
    const saved = localStorage.getItem('userDiagnosis');
    if (saved) {
        updateDiagnosisDisplay(saved);
    }
};

// 「変更」ボタン押下：編集エリアを表示
function unlockDiagnosis() {
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
    document.getElementById('diagnosis-select-container').style.display = 'block';
}

// プルダウン選択：保存して固定エリアに戻す
function saveAndLock() {
    const select = document.getElementById('diagnosis-select');
    const value = select.value;
    if (value) {
        localStorage.setItem('userDiagnosis', value);
        updateDiagnosisDisplay(value);
    }
}

// 表示の切り替え関数
function updateDiagnosisDisplay(value) {
    document.getElementById('diagnosis-text').innerText = '診断名: ' + value;
    document.getElementById('diagnosis-fixed-container').style.display = 'flex';
    document.getElementById('diagnosis-select-container').style.display = 'none';
}
