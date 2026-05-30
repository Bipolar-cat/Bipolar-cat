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

window.addEventListener('DOMContentLoaded', () => {
    // 1. 診断名の復元
    const saved = localStorage.getItem('userDiagnosis');
    if (saved) {
        document.getElementById('diagnosis-text').innerText = '主な診断名: ' + saved;
    }

    // 2. ボタンの自動生成（ここが抜けているとボタンが表示されません）
    // 下記のように、HTMLのidを引数に渡して呼び出してください
    if (document.getElementById('mood-btns')) {
        createButtons('mood-btns', '#007bff');
    }
});

function unlockDiagnosis() {
    document.getElementById('display-mode').style.display = 'none';
    document.getElementById('edit-mode').style.display = 'block';
}

function saveAndLock() {
    const select = document.getElementById('diagnosis-select');
    const value = select.value;
    if (value) {
        localStorage.setItem('userDiagnosis', value);
        document.getElementById('diagnosis-text').innerText = '主な診断名: ' + value;
        document.getElementById('display-mode').style.display = 'flex';
        document.getElementById('edit-mode').style.display = 'none';
    }
}
