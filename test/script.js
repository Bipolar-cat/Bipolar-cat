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
function createButtons(containerId, activeClass) {
    const container = document.getElementById(containerId);
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

// 読み込み時に実行
window.onload = () => {
    createButtons('mood-btns', 'active');
    createButtons('cond-btns', 'active');
    // ...（既存の初期化処理があればここに続ける）
};
