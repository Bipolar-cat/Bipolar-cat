function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const selectContainer = document.getElementById('diagnosis-select-container');
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    const diagnosisText = document.getElementById('diagnosis-text');

    if (select.value) {
        diagnosisText.innerText = '診断名: ' + select.value;
        // クラスを付け替えて表示を制御
        selectContainer.classList.add('hidden');
        fixedContainer.classList.remove('hidden');
        fixedContainer.classList.add('visible');
    }
}

function unlockDiagnosis() {
    const selectContainer = document.getElementById('diagnosis-select-container');
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    
    selectContainer.classList.remove('hidden');
    fixedContainer.classList.add('hidden');
    fixedContainer.classList.remove('visible');
}
// ボタン生成処理
function createButtons(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; // コンテナがなければ終了
    
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.onclick = function() {
            // 他のボタンのactiveを解除
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            // 押したボタンにactiveを付与
            btn.classList.add('active');
        };
        container.appendChild(btn);
    }
}

// ページ読み込み時に実行
window.onload = () => {
    createButtons('mood-btns');
    createButtons('cond-btns');
};
});
function saveData() {
    // 選択されたボタンの値を取得
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
    // この後、リスト表示やグラフ更新の処理を繋げていきます
}
// script.js 内の onclick 処理
btn.onclick = function() {
    // 1. 同じグループのボタンから 'active' を全て外す
    container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    
    // 2. 押したボタンに 'active' を付ける
    btn.classList.add('active');
};
