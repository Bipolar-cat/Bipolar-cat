// 診断名のロック処理
function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const fixedContainer = document.getElementById('diagnosis-fixed-container');
    const selectContainer = document.getElementById('diagnosis-select-container');
    const diagnosisText = document.getElementById('diagnosis-text');

    if (select.value) {
        diagnosisText.innerText = '診断名: ' + select.value;
        selectContainer.style.display = 'none';
        fixedContainer.style.display = 'flex';
    }
}

// 診断名の解除処理
function unlockDiagnosis() {
    document.getElementById('diagnosis-select-container').style.display = 'block';
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
}
