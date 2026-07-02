/*analysis.js ◎
 * ログデータの分析
 * analyzeTrend() - 気分と体調の傾向を分析
 * getAverageScore() - 平均スコア計算
 * getStability() - 安定度を判定
 */

/**
 * 直近ログの傾向を分析
 * @param {Array} logs - ログデータ
 * @param {Number} count - 分析対象件数（デフォルト10）
 * @returns {Object} 分析結果
 */
function analyzeTrend(logs, count = 10) {
  if (!logs || logs.length === 0) {
    return {
      moodAvg: 0,
      condAvg: 0,
      moodTrend: "データなし",
      condTrend: "データなし",
      stability: "評価不可",
    };
  }

  const targetLogs = logs.slice(-count);

  // 平均値を計算
  const moodAvg = getAverageScore(targetLogs.map((l) => l.mood));
  const condAvg = getAverageScore(targetLogs.map((l) => l.cond));

  // トレンドを判定
  const moodTrend = getTrendDirection(targetLogs.map((l) => l.mood));
  const condTrend = getTrendDirection(targetLogs.map((l) => l.cond));

  // 安定度を判定
  const stability = getStability([
    ...targetLogs.map((l) => l.mood),
    ...targetLogs.map((l) => l.cond),
  ]);

  return {
    count: targetLogs.length,
    moodAvg: Math.round(moodAvg * 10) / 10,
    condAvg: Math.round(condAvg * 10) / 10,
    moodTrend,
    condTrend,
    stability,
  };
}

/**
 * スコア配列の平均値を計算
 * @param {Array<Number>} scores
 * @returns {Number} 平均値
 */
function getAverageScore(scores) {
  if (scores.length === 0) return 0;
  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}

/**
 * トレンド方向を判定（上昇/下降/安定）
 * @param {Array<Number>} scores
 * @returns {String} トレンド判定
 */
function getTrendDirection(scores) {
  if (scores.length < 2) return "判定不可";

  const first = scores.slice(0, Math.ceil(scores.length / 2));
  const last = scores.slice(Math.ceil(scores.length / 2));

  const firstAvg = getAverageScore(first);
  const lastAvg = getAverageScore(last);

  const diff = lastAvg - firstAvg;

  if (diff > 1) return "↗️ 改善傾向";
  if (diff < -1) return "↘️ 悪化傾向";
  return "→ ほぼ安定";
}

/**
 * スコアの安定度を判定
 * @param {Array<Number>} scores
 * @returns {String} 安定度評価
 */
function getStability(scores) {
  if (scores.length < 2) return "判定不可";

  const avg = getAverageScore(scores);
  const variance =
    scores.reduce((sum, s) => sum + Math.pow(s - avg, 2), 0) / scores.length;
  const stdDev = Math.sqrt(variance);

  if (stdDev < 1.5) return "✅ 非常に安定";
  if (stdDev < 3) return "🟢 安定";
  if (stdDev < 5) return "🟡 やや不安定";
  return "🔴 不安定";
}
