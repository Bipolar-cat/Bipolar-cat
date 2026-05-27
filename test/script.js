// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
    createButtons('mood-btns');
    createButtons('cond-btns');
});

// 診断名の固定機能
function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const selectContainer = document.getElementById('diagnosis-select-container');
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    const diagnosisText = document.getElementById('diagnosis-text');

    if (select.value) {
        diagnosisText.innerText = '診断名: ' + select.value;
        selectContainer.classList.add('hidden');
        fixedContainer.classList.remove('hidden');
        fixedContainer.classList.add('visible');
    }
}

// 診断名の変更機能
function unlockDiagnosis() {
    const selectContainer = document.getElementById('diagnosis-select-container');
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    
    selectContainer.classList.remove('hidden');
    fixedContainer.classList.add('hidden');
    fixedContainer.classList.remove('visible');
}

function createButtons(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        
        // 【ここを追加】初期値として「5」をアクティブにする
        if (i === 5) {
            btn.classList.add('active');
        }

        btn.onclick = function() {
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
        container.appendChild(btn);
    }
}

// データ保存機能
function saveData() {
    const moodBtn = document.querySelector('#mood-btns button.active');
    const condBtn = document.querySelector('#cond-btns button.active');
    const note = document.getElementById('note').value;

    if (!moodBtn || !condBtn) {
        alert('気分と調子を選択してください');
        return;
    }

    const data = {
        mood: moodBtn.innerText,
        cond: condBtn.innerText,
        note: note,
        date: new Date().toLocaleString()
    };

    console.log('保存データ:', data);
    alert('記録しました！');
}
