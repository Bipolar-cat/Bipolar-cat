function toggleMenu() {
    const menu = document.getElementById('menuArea');
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
}

function selectDiagnosis(name) {
    document.getElementById('diagnosisName').textContent = name;
    localStorage.setItem('userDiagnosis', name);
    document.getElementById('editBtn').style.display = 'block';
    toggleMenu();
}
