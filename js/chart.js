/*chart.js ◎
 * グラフ描画専用
 * 保存処理を書かない
 * DOM操作を書かない
 * renderChart()
 */
let myChart = null;

function renderChart() {
  const logs = getLogs();
  const last10 = logs.slice(-10);
  const canvas = document.getElementById("myChart");
  if (!canvas) return;

  // グラフクリア処理
  if (last10.length === 0) {
    if (myChart) {
      myChart.destroy();
      myChart = null;
    }
    return;
  }

  if (myChart) {
    myChart.destroy();
  }

  // 横スクロール幅を設定
  const chartInner = document.querySelector(".chart-inner");
  if (chartInner) {
    chartInner.style.width =
      Math.max(last10.length * 70, window.innerWidth - 40) + "px";
  }

  const ctx = canvas.getContext("2d");

  // ✅ ラベルを正しく生成（日付フォーマット）
  const labels = last10.map((l, index) => {
    const d = new Date(l.date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");

    // 前の日付と比較して年表示を判定
    const prev = index > 0 ? last10[index - 1] : null;
    const prevDate = prev ? new Date(prev.date).toDateString() : null;
    const currentDate = d.toDateString();
    const showYear = !prev || prevDate !== currentDate;

    return showYear
      ? `${year}/${month}/${day}\n${hour}:${min}`
      : `${month}/${day}\n${hour}:${min}`;
  });

  // ✅ 重複コードをリファクタリング（DRY原則）
  const createDataset = (label, color, data) => ({
    label,
    data,
    borderColor: color,
    backgroundColor: color,
    pointBackgroundColor: color,
    pointBorderColor: "#ffffff",
    pointRadius: 6,
    pointHoverRadius: 8,
    pointBorderWidth: 2,
    pointHitRadius: 15,
    borderWidth: 3,
    tension: 0.55,
    fill: false,
  });

  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        createDataset(
          "気分",
          "#2196F3",
          last10.map((l) => l.mood),
        ),
        createDataset(
          "体調",
          "#FFA726",
          last10.map((l) => l.cond),
        ),
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
            boxWidth: 10,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          titleFont: {
            size: 11,
          },
          bodyFont: {
            size: 11,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            maxRotation: 45,
            minRotation: 45,
            autoSkip: false,
            font: {
              size: 10,
            },
          },
        },
        y: {
          position: "left",
          min: 1,
          max: 10,
          // ✅ Y軸ラベルを 1, 5, 10 だけ表示
          ticks: {
    stepSize: 1,

    callback(value) {
        if (value === 10) return "良い";
        if (value === 5) return "普通";
        if (value === 1) return "低い/悪い";
        return "";
             }
            },
            font: {
              size: 13,
              weight: "bold",
            },
            color: "#333",
            padding: 12,
            maxRotation: 0,
            minRotation: 0,
          },
          grid: {
            color: function (context) {
              const v = context.tick.value;
              return [1, 5, 10].includes(v) ? "#e0e0e0" : "rgba(0,0,0,0)";
            },
            drawBorder: true,
            lineWidth: 1,
          },
        },
      },
    },
  });
}
