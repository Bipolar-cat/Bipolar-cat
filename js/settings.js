// 診断名の表示切替
function loadDiagnosisUI() {
    const saved = loadDiagnosis();

    const selectContainer = document.getElementById('diagnosis-select-container');
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    const text = document.getElementById('diagnosis-text');

    if (saved) {
        selectContainer.style.display = 'none';
        fixedContainer.style.display = 'flex';
        text.innerText = `主な診断名: ${saved}`;
    } else {
        selectContainer.style.display = 'block';
        fixedContainer.style.display = 'none';
    }
}

// 診断変更モードへ戻す
function unlockDiagnosis() {
    document.getElementById('diagnosis-select-container').style.display = 'block';
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
}

// 診断ロック保存
function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const value = select.value;

    if (!value) return;

    saveDiagnosis(value);

    loadDiagnosisUI();
}
