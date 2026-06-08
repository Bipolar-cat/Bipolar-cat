export function initChart(logs, onClickCallback) {
    const ctx = document.getElementById('myChart').getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: { /* データ設定 */ },
        options: { onClick: onClickCallback }
    });
}
