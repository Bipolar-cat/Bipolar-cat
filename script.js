// 「その他」が選択されたら入力欄を表示
function checkOther(select) {
    const otherInput = document.getElementById('other-diagnosis');
    otherInput.style.display = (select.value === "その他") ? "block" : "none";
}

// 編集の切り替え
function toggleEdit() {
    const displayArea = document.getElementById('display-area');
    const editArea = document.getElementById('edit-area');
    displayArea.style.display = (displayArea.style.display === 'none') ? 'flex' : 'none';
    editArea.style.display = (editArea.style.display === 'none') ? 'flex' : 'none';
}

// 診断名の保存
function saveDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const otherInput = document.getElementById('other-diagnosis');
    const display = document.getElementById('current-diagnosis');
    
    let valueToSave = select.value;
    if (select.value === "その他") {
        valueToSave = otherInput.value || "その他";
    }

    if (valueToSave) {
        display.innerText = valueToSave;
        localStorage.setItem('diagnosis', valueToSave);
    }
    
    toggleEdit(); // 保存後に元の表示に戻す
}
