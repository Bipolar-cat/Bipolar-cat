// ボックスをタップした時の処理
function openDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    select.style.display = 'block'; // プルダウンを表示
    select.focus(); // フォーカスを当てて開く
    
    // 開いた後はラベルを隠すことも可能
    document.getElementById('display-text').style.display = 'none';
}

// 診断名が選ばれた時の処理
function saveDiagnosis(select) {
    if (select.value === "その他") {
        select.style.display = 'none';
        document.getElementById('other-input').style.display = 'block';
        document.getElementById('other-input').focus();
    } else {
        updateLabel(select.value);
    }
}

// 「その他」入力完了後の処理
function saveOther(input) {
    updateLabel(input.value);
}

// ラベルを更新して表示を戻す
function updateLabel(val) {
    document.getElementById('current-diagnosis').innerText = val;
    localStorage.setItem('diagnosis', val);
    
    // 表示状態をリセット
    document.getElementById('display-text').style.display = 'block';
    document.getElementById('diagnosis-select').style.display = 'none';
    document.getElementById('other-input').style.display = 'none';
}

// 診断名をロック（保存）する
function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    if(!select.value) return;
    localStorage.setItem('innernote_saved_diagnosis', select.value);
    updateDiagnosisUI();
}

// 変更ボタンでロックを解除する
function unlockDiagnosis() {
    document.getElementById('diagnosis-select-container').style.display = 'block';
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
}

// UIの状態を同期させる（初期読み込み時にも呼び出す）
function updateDiagnosisUI() {
    const saved = localStorage.getItem('innernote_saved_diagnosis');
    if(saved) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = "診断名: " + saved;
    }
}

// ページ読み込み時に状態を復元
window.onload = () => {
    const saved = localStorage.getItem('saved_diagnosis');
    if (saved) {
        document.getElementById('diagnosis-label').innerText = "主な診断名: " + saved;
        toggleEdit(false); // 保存済みなら表示モードへ
    } else {
        toggleEdit(true); // 未設定なら編集モードへ
    }
};

// モード切替関数
function toggleEdit(isEdit) {
    document.getElementById('diagnosis-display').style.display = isEdit ? 'none' : 'flex';
    document.getElementById('diagnosis-edit').style.display = isEdit ? 'block' : 'none';
}

// 診断名を選択した時の保存とUI切り替え
function saveAndLockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    if (select.value) {
        localStorage.setItem('saved_diagnosis', select.value);
        document.getElementById('diagnosis-label').innerText = "主な診断名: " + select.value;
        toggleEdit(false); // 表示モードへ切り替え
    } else {
        alert("診断名を選択してください");
    }
}

function setMode(type) {
    const container = document.getElementById('dynamic-inputs');
    container.innerHTML = ''; // 一度クリア

    const moodLabels = type === 3 ? ['良い', '普通', '低い'] : [...Array(10).keys()].map(i => i + 1);
    
    // 気分と体調の2グループ生成
    ['気分', '体調'].forEach(label => {
        const group = document.createElement('div');
        group.innerHTML = `<p>${label}</p>`;
        const btnRow = document.createElement('div');
        btnRow.className = 'rating-group';
        
        moodLabels.forEach(val => {
            const btn = document.createElement('button');
            btn.innerText = val;
            btn.className = 'rating-btn';
            btn.onclick = () => {
                btnRow.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            };
            btnRow.appendChild(btn);
        });
        group.appendChild(btnRow);
        container.appendChild(group);
    });
}
