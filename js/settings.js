function loadDiagnosisUI() {
    const saved = loadDiagnosis();

    if (saved) {
        document.getElementById('diagnosis-select-container').style.display = 'none';
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-text').innerText = saved;
    }
}

function lockDiagnosis() {
    const value = document.getElementById('diagnosis-select').value;
    saveDiagnosis(value);
}
