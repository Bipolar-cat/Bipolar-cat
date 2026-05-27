document.addEventListener('DOMContentLoaded', () => {
    // 診断名の初期表示
    const diagnosisText = document.getElementById('diagnosis-text');
    if (diagnosisText) {
        diagnosisText.innerText = "診断名: 双極症";
    }

    // ボタンの生成（引数にIDを渡す）
    createButtons('mood-btns');
    createButtons('cond-btns');
});

// 診断名の確定
function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const selectContainer = document.getElementById('diagnosis-select-container');
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    const diagnosisText = document.getElementById('diagnosis-text');

    if (select.value) {
        diagnosisText.innerText = '診断名: ' + select.value;
        // classListで制御
        selectContainer.classList.add('hidden');
        fixedContainer.classList.remove('hidden');
        fixedContainer.style.display = 'flex'; // CSSのflexを維持
    } else {
        alert('診断名を選択してください');
    }
}

// 「変更」ボタンを押したとき：固定枠を隠し、選択肢を表示
function showSelect() {
    document.getElementById('diagnosis-fixed-container').classList.add('hidden');
    document.getElementById('diagnosis-select-container').classList.remove('hidden');
}

// 「決定」ボタンを押したとき：選択した内容を固定枠に反映して表示
function saveSelection() {
    const select = document.getElementById('diagnosis-select');
    const text = document.getElementById('diagnosis-text');
    
    text.innerText = '診断名: ' + select.value;
    
    document.getElementById('diagnosis-fixed-container').classList.remove('hidden');
    document.getElementById('diagnosis-select-container').classList.add('hidden');
}

// ボタン生成ロジック
function createButtons(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        
        // 初期値として「5」をアクティブにする
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
    const diagnosis = document.getElementById('diagnosis-text').innerText;

    if (!moodBtn || !condBtn) {
        alert('気分と調子を選択してください');
        return;
    }

    const data = {
        diagnosis: diagnosis,
        mood: moodBtn.innerText,
        cond: condBtn.innerText,
        note: note,
        date: new Date().toLocaleString()
    };

    console.log('保存データ:', data);
    alert('記録しました！');
}
