function renderScrollableChart(logs) {

    const canvas =
        document.getElementById('myChart');

    const ctx =
        canvas.getContext('2d');

    if (window.myChartInstance) {
        window.myChartInstance.destroy();
    }

    window.myChartInstance =
        new Chart(ctx, {

        type: 'line',

        data: {

            labels:
                logs.map(l => l.date),

            datasets: [

                {
                    label: '気分',
                    data:
                        logs.map(
                            l => l.mood
                        ),
                    borderColor: '#3b82f6'
                },

                {
                    label: '体調',
                    data:
                        logs.map(
                            l => l.cond
                        ),
                    borderColor: '#f59e0b'
                }
            ]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            onClick: (evt, elements, chart) => {

                const activePoints =
                    chart.getElementsAtEventForMode(
                        evt,
                        'index',
                        { intersect:false },
                        true
                    );

                if (!activePoints.length)
                    return;

                const index =
                    activePoints[0].index;

                const logData =
                    logs[index];

                scrollToLog(logData.ts);
            }
        }
    });
}
