// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('userDiagnosis');
    if (saved) {
        // 保存済みなら固定表示に切り替え
        document.getElementById('diagnosis-text').innerText = "診断名: " + saved;
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-edit').style.display = 'none';
    } else {
        // 未設定ならプルダウンを表示
        document.getElementById('diagnosis-edit').style.display = 'block';
    }
});

// 診断名を設定してロックする関数
function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const val = select.value;
    localStorage.setItem('userDiagnosis', val);
    
    document.getElementById('diagnosis-text').innerText = "診断名: " + val;
    document.getElementById('diagnosis-fixed-container').style.display = 'flex';
    document.getElementById('diagnosis-edit').style.display = 'none';
}

// 変更ボタンでロック解除する関数
function unlockDiagnosis() {
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
    document.getElementById('diagnosis-edit').style.display = 'block';
}

// ボタンを自動生成する関数
function generateRatingButtons(containerId, groupName) {
    const container = document.getElementById(containerId);
    
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.innerText = i;
        btn.className = 'rate-btn';
        
        // ボタンクリック時の処理
        btn.addEventListener('click', function() {
            // 同じグループ内の選択を解除
            container.querySelectorAll('.rate-btn').forEach(b => b.classList.remove('selected'));
            // 選択状態にする
            this.classList.add('selected');
            // ここに選択した値を保持する処理を追加可能
            console.log(groupName + "が" + i + "に設定されました");
        });
        
        container.appendChild(btn);
    }
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
    generateRatingButtons('mood-btns', 'mood');
    generateRatingButtons('cond-btns', 'condition');
});

// ボタンクリック時のJS処理の例
const buttons = document.querySelectorAll('#mood-btns button');
buttons.forEach(btn => {
    btn.addEventListener('click', function() {
        // すべてのボタンからactiveを外す
        buttons.forEach(b => b.classList.remove('active'));
        // 押したボタンにactiveをつける
        this.classList.add('active');
    });
});

function setupButtons(containerId) {
    const container = document.getElementById(containerId);
    container.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            // そのグループ内の他のボタンから active を外す
            container.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            // 押したボタンに active を付ける
            e.target.classList.add('active');
        }
    });
}
