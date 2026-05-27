document.addEventListener('DOMContentLoaded', () => {
    createButtons('mood-btns');
    createButtons('cond-btns');
});

function lockDiagnosis() {
    const sel = document.getElementById('diagnosis-select');
    document.getElementById('diagnosis-text').innerText = '診断名: ' + sel.value;
    document.getElementById('select-area').style.display = 'none';
    document.getElementById('fixed-area').style.display = 'flex';
}

function unlockDiagnosis() {
    document.getElementById('select-area').style.display = 'block';
    document.getElementById('fixed-area').style.display = 'none';
}

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

function createButtons(id) {
    const cont = document.getElementById(id);
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
