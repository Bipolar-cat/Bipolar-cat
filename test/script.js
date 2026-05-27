// グラフの描画用変数
let myChart;

// ページが読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
    createButtons('mood-btns');
    createButtons('cond-btns');
    renderChart();
});

function createButtons(id) {
    const cont = document.getElementById(id);
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.onclick = () => {
            cont.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
        cont.appendChild(btn);
    }
}

function renderChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    // まだデータがない場合でもエラーにならないようにする
    if (myChart) myChart.destroy();

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['5/25', '5/26', '5/27'], // 横軸の日付
            datasets: [{
                label: '気分',
                data: [5, 8, 6], // ここに保存された数値データが入ります
                borderColor: '#3b82f6',
                tension: 0.1
            }]
        },
        options: {
            responsive: false, // 横スクロールさせるためにfalseにする
            maintainAspectRatio: false,
            scales: {
                y: { min: 0, max: 10 }
            }
        }
    });
}

// グラフ描画を確実に行うための修正
window.addEventListener('load', () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['5/25', '5/26', '5/27'],
            datasets: [{
                label: '気分',
                data: [5, 8, 6],
                borderColor: '#3b82f6',
                borderWidth: 2,
                fill: false
            }]
        },
