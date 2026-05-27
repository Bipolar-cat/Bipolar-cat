let myChart;

document.addEventListener('DOMContentLoaded', () => {
    createButtons('mood-btns');
    createButtons('cond-btns');
    renderChart();
});

// ボタン生成関数
function createButtons(id) {
    const cont = document.getElementById(id);
    if (!cont) return;
    
    // CSSのスタイルを適用するためにこのクラスを追加
    cont.classList.add('btn-group-circle');
    
    cont.innerHTML = ''; 
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.type = "button";
        
        btn.onclick = function() {
            // 同じ親要素内の全てのボタンから active を外す
            cont.querySelectorAll('button').forEach(s => s.classList.remove('active'));
            // クリックされたボタンに active をつける
            this.classList.add('active');
        };
        cont.appendChild(btn);
    }
}

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
