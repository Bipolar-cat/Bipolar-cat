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
// Chart.js の設定の一部
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dates, // 日付の配列
        datasets: [{
            label: '気分',
            data: moodData // 過去データ全ての配列
        }]
    },
    options: {
        responsive: false, // 自動リサイズをオフにすることで、親要素の幅を維持
        maintainAspectRatio: false,
        scales: {
            x: {
                min: Math.max(0, moodData.length - 10) // 常に最新の10件が見えるように調整
            }
        }
    }
});
