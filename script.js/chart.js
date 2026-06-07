function renderChart() {

    const logs =
        JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        );

    const ctx =
        document.getElementById('myChart')
        .getContext('2d');

    new Chart(ctx, {

        type: 'line',

        data: {

            labels:
                logs.map(l => l.date),

            datasets: [

                {
                    label: '気分',
                    data: logs.map(l => l.mood),
                    borderColor: '#3b82f6',
                    backgroundColor: '#3b82f6'
                },

                {
                    label: '体調',
                    data: logs.map(l => l.cond),
                    borderColor: '#f59e0b',
                    backgroundColor: '#f59e0b'
                }

            ]
        }

    });

}
