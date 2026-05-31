document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('userDiagnosis');
    if (saved) {
        document.getElementById('diagnosisName').textContent = saved;
    } else {
        // 初回は編集エリアを強制表示
        toggleEdit();
        document.getElementById('editBtn').style.display = 'none'; // 初回は「変更」不要
    }
});

// 「その他」が選ばれたらテキストボックスを表示
function checkOther(select) {
    const otherInput = document.getElementById('otherInput');
    otherInput.style.display = (select.value === 'その他') ? 'inline-block' : 'none';
}

function toggleEdit() {
    document.getElementById('displayArea').style.display = 'none';
    document.getElementById('editArea').style.display = 'flex';
}

function saveDiagnosis() {
    const select = document.getElementById('diagnosisSelect');
    const otherInput = document.getElementById('otherInput');
    
    let val = (select.value === 'その他') ? otherInput.value : select.value;
    
    if (!val) return alert('診断名を選択または入力してください');

    localStorage.setItem('userDiagnosis', val);
    document.getElementById('diagnosisName').textContent = val;
    document.getElementById('displayArea').style.display = 'flex';
    document.getElementById('editArea').style.display = 'none';
    document.getElementById('editBtn').style.display = 'block';
}
