/*summary.js △
 * サマリー生成・表示
 * generateSummary() - 最近の傾向レポートを生成
 * displaySummaryCard() - サマリーカードを表示
 */

/**
 * 最近の傾向をまとめたレポートを生成・表示
 */
function generateSummary() {
  const logs = getLogs();

  if (logs.length === 0) {
    alert("記録がまだありません");
    return;
  }

  // 分析を実行
  const analysis = analyzeTrend(logs, 10);

  // レポートテキストを生成
  const reportText = generateReportText(analysis, logs.length);

  // サマリーカードに表示
  displaySummaryCard(reportText, analysis);

  // 最後の作成時刻を記録
  const now = new Date();
  const timeStr = formatDate(now, true);
  const summaryTs = document.getElementById("summary-ts");
  if (summaryTs) {
    summaryTs.textContent = `前回まとめ作成：${timeStr}`;
  }

  console.log("Summary generated:", analysis);
}

/**
 * 分析結果からレポートテキストを生成
 * @param {Object} analysis - analyzeTrend()の戻り値
 * @param {Number} totalCount - 全ログ件数
 * @returns {String} レポートテキスト
 */
function generateReportText(analysis, totalCount) {
  let text = `<div class="report-item">`;
  text += `<span class="report-label">直近10件の分析結果</span><br>`;
  text += `</div>`;

  text += `<div class="report-item">`;
  text += `<span class="report-label">気分：</span>`;
  text += `平均 ${analysis.moodAvg} / 10 ${analysis.moodTrend}`;
  text += `</div>`;

  text += `<div class="report-item">`;
  text += `<span class="report-label">体調：</span>`;
  text += `平均 ${analysis.condAvg} / 10 ${analysis.condTrend}`;
  text += `</div>`;

  text += `<div class="report-item">`;
  text += `<span class="report-label">安定度：</span>`;
  text += `${analysis.stability}`;
  text += `</div>`;

  text += `<div class="report-item">`;
  text += `<span class="report-label">データ数：</span>`;
  text += `累計 ${totalCount}件`;
  text += `</div>`;

  return text;
}

/**
 * サマリーカードを表示
 * @param {String} reportHTML - レポートHTML
 * @param {Object} analysis - 分析データ
 */
function displaySummaryCard(reportHTML, analysis) {
  const summaryCard = document.getElementById("summary-card");
  const summaryContent = document.getElementById("summary-content");

  if (!summaryCard || !summaryContent) {
    console.error("Summary card elements not found");
    return;
  }

  summaryContent.innerHTML = reportHTML;
  summaryCard.style.display = "block";
}
