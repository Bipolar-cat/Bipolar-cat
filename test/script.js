let myChart;

document.addEventListener('DOMContentLoaded', () => {
    createButtons('mood-btns');
    createButtons('cond-btns');
    renderChart();
});

function createButtons(id) {
    const cont = document.getElementById(id);
    if (!cont) return;
    cont.innerHTML = ''; 
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.onclick = () => {
            cont.querySelectorAll('button').forEach(b => {
                b.style.background = '';
                b.classList.remove('active');
            });
            btn.style.background = '#e0f2fe';
            btn.classList.add('active');
        };
        cont.appendChild(btn);
    }
}

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
