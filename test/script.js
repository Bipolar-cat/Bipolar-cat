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

// ページ読み込み時に実行
window.onload = function() {
    // 1. 診断名の読み込み処理を実行
    loadDiagnosis(); 
    
    // 2. ボタン生成処理を実行
    createMoodButtons();
};

// 診断名の読み込み関数
function loadDiagnosis() {
    const savedDiagnosis = localStorage.getItem('userDiagnosis');
    if (savedDiagnosis) {
        document.getElementById('diagnosis-text').innerText = "主な診断名: " + savedDiagnosis;
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-select-container').style.display = 'none';
    }
}

// 気分ボタン生成関数
function createMoodButtons() {
    const moodContainer = document.getElementById('mood-btns');
    if (!moodContainer) return;

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
        btn.style.margin = '2px';
        btn.style.cursor = 'pointer';
        
        btn.onclick = () => alert(i + ' が選択されました');
        moodContainer.appendChild(btn);
    }
}

// あとは既存の lockDiagnosis や unlockDiagnosis をそのまま下に書き足せばOKです！
