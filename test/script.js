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

// ページ読み込み時に実行
window.addEventListener('DOMContentLoaded', () => {
    // 診断名の読み込み...（既存の処理）

    // ボタンの生成
    createButtons('mood-btns', 'mood-btn');
    createButtons('physical-btns', 'mood-btn');
});
