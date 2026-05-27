document.addEventListener('DOMContentLoaded', () => {
    createButtons('mood-btns');
    createButtons('cond-btns');
});

// 診断名の表示切り替え
function showSelect() {
    document.getElementById('fixed-area').style.display = 'none';
    document.getElementById('select-area').style.display = 'block';
}

function saveDiagnosis() {
    const sel = document.getElementById('diagnosis-select');
    document.getElementById('diagnosis-text').innerText = '診断名: ' + sel.value;
    document.getElementById('fixed-area').style.display = 'flex';
    document.getElementById('select-area').style.display = 'none';
}

function createButtons(id) {
    const cont = document.getElementById(id);
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.onclick = () => {
            // まず全てのボタンから 'active' クラスを外す
            cont.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            // 押したボタンに 'active' クラスを付ける
            btn.classList.add('active');
        };
        cont.appendChild(btn);
    }
}
