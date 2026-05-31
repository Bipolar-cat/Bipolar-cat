function createScale(containerId, activeClass) {
    const container = document.getElementById(containerId);
    for (let i = 1; i <= 10; i++) {
        const div = document.createElement('div');
        div.className = 'circle';
        div.innerText = i;
        div.onclick = () => {
            container.querySelectorAll('.circle').forEach(c => c.className = 'circle');
            div.className = `circle ${activeClass}`;
        };
        container.appendChild(div);
    }
}

createScale('mood-scale', 'selected-mood');
createScale('physical-scale', 'selected-physical');

// ページ読み込み時に保存された診断名を表示
window.onload = () => {
    const saved = localStorage.getItem('userDiagnosis');
    if (saved) {
        document.getElementById('selected-diagnosis').innerText = saved;
    }
};

// 変更モードの切り替え
function toggleEdit() {
    document.getElementById('diagnosis-display').style.display = 'none';
    document.getElementById('diagnosis-edit').style.display = 'block';
}

// 診断名の保存
function saveDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const value = select.value;
    
    localStorage.setItem('userDiagnosis', value);
    document.getElementById('selected-diagnosis').innerText = value;
    
    // 表示を元に戻す
    document.getElementById('diagnosis-display').style.display = 'block';
    document.getElementById('diagnosis-edit').style.display = 'none';
}
