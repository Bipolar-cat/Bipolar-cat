// データの保存（LocalStorageを使用）
let records = JSON.parse(localStorage.getItem('innerNoteRecords')) || [];

function saveData() {
    const mood = document.querySelector('#mood-btns button.active')?.innerText;
    const cond = document.querySelector('#cond-btns button.active')?.innerText;
    const note = document.getElementById('note').value;

    if (!mood || !cond) { alert('気分と調子を選んでください'); return; }

    const newRecord = { date: new Date().toLocaleString(), mood, cond, note };
    records.push(newRecord);
    localStorage.setItem('innerNoteRecords', JSON.stringify(records));
    
    updateChart(); // グラフを更新
    alert('記録しました！');
}

// グラフ描画
let myChart;
function updateChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const labels = records.map(r => r.date);
    const moodData = records.map(r => r.mood);
    const condData = records.map(r => r.cond);

    if (myChart) myChart.destroy(); // 古いグラフを削除

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { label: '気分', data: moodData, borderColor: '#3b82f6' },
                { label: '体調', data: condData, borderColor: '#f59e0b' }
            ]
        },
        options: {
            responsive: false,
            scales: { x: { min: Math.max(0, records.length - 10) } } // 最新10件を表示
        }
    });
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    createButtons('mood-btns');
    createButtons('cond-btns');
    updateChart();
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

// グラフ描画関数
let myChart;
function renderChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    // 仮のデータ（実際はここに保存したデータが入ります）
    const data = {
        labels: ['5/25', '5/26'],
        datasets: [{
            label: '気分',
            data: [5, 8],
            borderColor: '#3b82f6',
            fill: false
        }]
    };

    if (myChart) myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });
}

// ページ読み込み時にグラフを表示
document.addEventListener('DOMContentLoaded', () => {
    // ...既存の処理...
    renderChart();
});
