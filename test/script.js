document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('userDiagnosis');
    if (saved) {
        document.getElementById('diagnosisName').textContent = saved;
    }
});

function toggleEdit() {
    document.getElementById('displayArea').style.display = 'none';
    document.getElementById('editArea').style.display = 'flex';
}

function saveDiagnosis() {
    const select = document.getElementById('diagnosisSelect');
    const val = select.value;
    localStorage.setItem('userDiagnosis', val);
    document.getElementById('diagnosisName').textContent = val;
    document.getElementById('displayArea').style.display = 'flex';
    document.getElementById('editArea').style.display = 'none';
}
