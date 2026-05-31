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

// ページ読み込み時に初期値を表示
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('userDiagnosis');
    if (saved) {
        document.getElementById('diagnosis-text').innerText = '主な診断名: ' + saved;
    }
});

// 「変更」ボタンが押されたとき
function unlockDiagnosis() {
    document.getElementById('display-mode').style.display = 'none';
    document.getElementById('edit-mode').style.display = 'block';
}

// プルダウンで選択されたとき
function saveAndLock() {
    const select = document.getElementById('diagnosis-select');
    const value = select.value;
    
    if (value !== "") {
        // 保存
        localStorage.setItem('userDiagnosis', value);
        // 表示更新
        document.getElementById('diagnosis-text').innerText = '主な診断名: ' + value;
        // モード切替（表示モードに戻す）
        document.getElementById('display-mode').style.display = 'flex';
        document.getElementById('edit-mode').style.display = 'none';
    }
}
