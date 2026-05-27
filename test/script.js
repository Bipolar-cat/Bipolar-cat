document.addEventListener('DOMContentLoaded', () => {
    createButtons('mood-btns');
    createButtons('cond-btns');
    renderChart();
});

// ボタン生成関数
function createCircleButtons(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.type = "button"; // フォーム送信を防ぐ
        if (i === 5) btn.classList.add('active'); // 初期値
        
        btn.onclick = function() {
            container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (type === 'mood') selectedMood = i;
            else selectedCond = i;
        };
        container.appendChild(btn);
    }
}

// 実行
document.addEventListener('DOMContentLoaded', () => {
    createCircleButtons('mood-btns', 'mood');
    createCircleButtons('cond-btns', 'cond');
});

// 読み込み完了後にボタンを作成
window.addEventListener('load', () => {
    createButtons('mood-btns');
    createButtons('cond-btns');
});

function renderChart() {
    const ctx = document.getElementById('myChart')?.getContext('2d');
    if (!ctx) return;

    if (myChart) myChart.destroy();

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['5/25', '5/26', '5/27'],
            datasets: [{
                label: '気分',
                data: [5, 8, 6],
                borderColor: '#3b82f6',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                y: { min: 0, max: 10 }
            }
        }
    });
}
