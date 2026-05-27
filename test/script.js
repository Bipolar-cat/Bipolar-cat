document.addEventListener('DOMContentLoaded', () => {
    // ボタン生成を実行
    createButtons('mood-btns');
    createButtons('cond-btns');
});

// --- 診断名に関する機能 ---

// 「変更」ボタン：固定枠を隠し、選択エリアを表示
function showSelect() {
    document.getElementById('fixed-area').style.display = 'none';
    document.getElementById('select-area').style.display = 'block';
}

// 「決定」ボタン：選択内容を反映し、固定枠に戻す
function saveDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const text = document.getElementById('diagnosis-text');
    
    // 入力値のチェック
    if (!select.value) {
        alert('診断名を選択してください');
        return;
    }
    
    text.innerText = '診断名: ' + select.value;
    
    document.getElementById('fixed-area').style.display = 'flex';
    document.getElementById('select-area').style.display = 'none';
}

// --- 気分・体調ボタン機能 ---

function createButtons(id) {
    const cont = document.getElementById(id);
    if (!cont) return;
    
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.onclick = () => {
            cont.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
        cont.appendChild(btn);
    }
}

// --- データ保存機能 ---

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
