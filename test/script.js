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

window.onload = function() {
    loadDiagnosis();
    createButtons('mood-btns', '#007bff', 'mood-btn');           // 青色
    createButtons('body-condition-btns', '#f39c12', 'body-btn'); // オレンジ色
};

// 共通のボタン生成関数
function createButtons(containerId, color, className) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.className = className;
        
        // スタイル設定
        btn.style.width = '35px';
        btn.style.height = '35px';
        btn.style.borderRadius = '50%';
        btn.style.border = `1px solid ${color}`;
        btn.style.background = 'white';
        btn.style.color = color;
        btn.style.margin = '2px';
        btn.style.cursor = 'pointer';
        
        btn.onclick = () => alert(i + ' が選択されました');
        container.appendChild(btn);
    }
}
