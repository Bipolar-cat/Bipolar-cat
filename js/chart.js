options: {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
        y: {
            min: 1,
            max: 3,
            stepSize: 1,

            ticks: {
                callback: function(value) {

                    if (value === 3) return "良い";
                    if (value === 2) return "普通";
                    if (value === 1) return "低い／悪い";

                    return "";
                }
            }
        }
    }
}
