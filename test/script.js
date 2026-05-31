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

// 「決定」を押した時：診断名を固定し、ボックスを切り替え
function lockDiagnosis() {
    const select = document.getElementById('diagnosis-select');
    const display = document.getElementById('diagnosis-text');
    
    display.innerText = "診断名: " + select.value;
    localStorage.setItem('userDiagnosis', select.value);
    
    document.getElementById('diagnosis-fixed-container').style.display = 'flex';
    document.getElementById('diagnosis-edit').style.display = 'none';
}

// 「変更」を押した時：プルダウンを再表示
function unlockDiagnosis() {
    document.getElementById('diagnosis-fixed-container').style.display = 'none';
    document.getElementById('diagnosis-edit').style.display = 'flex';
}

// 読み込み時：すでに保存されていれば固定表示にする
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('userDiagnosis');
    if (saved) {
        document.getElementById('diagnosis-text').innerText = "診断名: " + saved;
        document.getElementById('diagnosis-fixed-container').style.display = 'flex';
        document.getElementById('diagnosis-edit').style.display = 'none';
    } else {
        document.getElementById('diagnosis-edit').style.display = 'flex';
    }
});

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

document.addEventListener('DOMContentLoaded', () => {
    // ボタン生成関数を呼び出す
    createButtons('mood-btns', 'mood');
    createButtons('cond-btns', 'cond');
});

function createButtons(containerId, activeClass) {
    const container = document.getElementById(containerId);
    
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.type = 'button';
        btn.onclick = function() {
            // 同じグループ内の他のボタンから active を消す
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            // 押したボタンに active をつける
            this.classList.add('active');
        };
        container.appendChild(btn);
    }
}

// 読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
    createButtons('mood-btns');
    createButtons('cond-btns');
});
