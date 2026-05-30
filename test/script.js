console.log("script.js が読み込まれました");

function createMoodButtons() {
    const moodContainer = document.getElementById('mood-btns');
    if (!moodContainer) {
        console.error("エラー: mood-btns が見つかりません");
        return;
    }

    moodContainer.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.style.width = '35px';
        btn.style.height = '35px';
        btn.style.borderRadius = '50%';
        btn.style.border = '1px solid #007bff';
        btn.style.background = 'white';
        btn.style.color = '#007bff';
        btn.style.cursor = 'pointer';
        
        btn.onclick = () => alert(i + ' が選択されました');
        moodContainer.appendChild(btn);
    }
}

// 診断名の読み込み（もし関数がなければこれだけでもOK）
function loadDiagnosis() {
    const saved = localStorage.getItem('userDiagnosis') || '未設定';
    // 診断名を表示する場所を作った場合、ここにDOM操作を書く
}

function createButtons(containerId, color) {
    const container = document.getElementById(containerId);
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.style.borderColor = color;
        btn.style.color = color;
        container.appendChild(btn);
    }
}

// ページ読み込み時に保存された診断名を表示
window.onload = () => {
    const savedDiagnosis = localStorage.getItem('userDiagnosis');
    if (savedDiagnosis) {
        document.getElementById('diagnosis-text').innerText = '主な診断名: ' + savedDiagnosis;
    }
};

// 編集モードへの切り替え
function toggleEdit() {
    document.getElementById('display-area').style.display = 'none';
    document.getElementById('edit-area').style.display = 'block';
}

// 診断名を保存して表示を更新
function saveDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const selectedValue = select.value;
    
    localStorage.setItem('userDiagnosis', selectedValue); // ブラウザに保存
    document.getElementById('diagnosis-text').innerText = '主な診断名: ' + selectedValue;
    
    document.getElementById('display-area').style.display = 'block';
    document.getElementById('edit-area').style.display = 'none';
}

