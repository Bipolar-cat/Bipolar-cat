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

// ボタン生成関数
function createButtons(containerId, className) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // クリア
    
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.className = className;
        
        btn.onclick = () => {
            // 他の選択を解除
            container.querySelectorAll('.' + className).forEach(b => b.classList.remove('selected'));
            // 自分を選択
            btn.classList.add('selected');
        };
        container.appendChild(btn);
    }
}

// ページ読み込み時に、保存されている診断名があれば表示する
window.addEventListener('DOMContentLoaded', () => {
    const savedDiagnosis = localStorage.getItem('userDiagnosis');
    if (savedDiagnosis) {
        document.getElementById('diagnosis-text').innerText = '主な診断名: ' + savedDiagnosis;
    }
});

// 「変更」ボタンが押されたとき：編集モードを表示
function unlockDiagnosis() {
    document.getElementById('display-mode').style.display = 'none';
    document.getElementById('edit-mode').style.display = 'block';
}

// プルダウンで診断名を選んだとき：保存して表示モードに戻す
function saveAndLock() {
    const select = document.getElementById('diagnosis-select');
    const selectedValue = select.value;

    if (selectedValue !== "") {
        // ローカルストレージに保存
        localStorage.setItem('userDiagnosis', selectedValue);
        
        // 画面のテキストを更新
        document.getElementById('diagnosis-text').innerText = '主な診断名: ' + selectedValue;
        
        // 表示を切り替え
        document.getElementById('display-mode').style.display = 'flex';
        document.getElementById('edit-mode').style.display = 'none';
    }
}
