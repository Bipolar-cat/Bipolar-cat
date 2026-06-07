// 全体傾向分析
function analyzeTrend() {
    const logs = getAllLogs();
    if (logs.length === 0) return null;

    const moods = logs.map(l => l.mood);
    const conds = logs.map(l => l.cond);

    const avgMood = moods.reduce((a, b) => a + b, 0) / moods.length;
    const avgCond = conds.reduce((a, b) => a + b, 0) / conds.length;

    const moodDiff = Math.max(...moods) - Math.min(...moods);
    const condDiff = Math.max(...conds) - Math.min(...conds);

    return {
        avgMood: Number(avgMood.toFixed(1)),
        avgCond: Number(avgCond.toFixed(1)),
        moodVolatility: moodDiff,
        condVolatility: condDiff
    };
}

// 診断別分析
function analyzeByDiagnosis() {
    const logs = getAllLogs();

    const map = {};

    logs.forEach(l => {
        const key = l.diagnosis || '未設定';

        if (!map[key]) {
            map[key] = {
                count: 0,
                moodSum: 0,
                condSum: 0
            };
        }

        map[key].count++;
        map[key].moodSum += l.mood;
        map[key].condSum += l.cond;
    });

    const result = {};

    Object.keys(map).forEach(k => {
        result[k] = {
            count: map[k].count,
            avgMood: Number((map[k].moodSum / map[k].count).toFixed(1)),
            avgCond: Number((map[k].condSum / map[k].count).toFixed(1))
        };
    });

    return result;
}

// 安定度スコア（ブレの少なさ）
function calculateStability() {
    const logs = getAllLogs();
    if (logs.length === 0) return 0;

    const moods = logs.map(l => l.mood);

    const avg = moods.reduce((a, b) => a + b, 0) / moods.length;

    const variance =
        moods.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / moods.length;

    const stability = 10 - Math.sqrt(variance);

    return Number(stability.toFixed(1));
}

function analyzeByDimension(key) {
    const logs = getAllLogs();

    const map = {};

    logs.forEach(l => {
        const k = l[key] || '未設定';

        if (!map[k]) {
            map[k] = {
                count: 0,
                moodSum: 0,
                condSum: 0
            };
        }

        map[k].count++;
        map[k].moodSum += l.mood;
        map[k].condSum += l.cond;
    });

    const result = {};

    Object.keys(map).forEach(k => {
        result[k] = {
            count: map[k].count,
            avgMood: Number((map[k].moodSum / map[k].count).toFixed(1)),
            avgCond: Number((map[k].condSum / map[k].count).toFixed(1))
        };
    });

    return result;
}

analyzeByDimension("diagnosis");
analyzeByDimension("ageGroup");
analyzeByDimension("environment");

function filterLogs({ diagnosis, ageGroup, environment }) {
    const logs = getAllLogs();

    return logs.filter(l => {
        const okDiagnosis = !diagnosis || l.diagnosis === diagnosis;
        const okAge = !ageGroup || l.ageGroup === ageGroup;
        const okEnv = !environment || l.environment === environment;

        return okDiagnosis && okAge && okEnv;
    });
}

function analyzeFiltered(filters) {
    const logs = filterLogs(filters);

    if (logs.length === 0) return null;

    const moods = logs.map(l => l.mood);
    const conds = logs.map(l => l.cond);

    return {
        count: logs.length,
        avgMood: (moods.reduce((a,b)=>a+b,0)/moods.length).toFixed(1),
        avgCond: (conds.reduce((a,b)=>a+b,0)/conds.length).toFixed(1),
        raw: logs
    };
}

function filterLogs({ diagnosis, ageGroup, environment }) {
    const logs = getAllLogs();

    return logs.filter(l => {
        const okDiagnosis = !diagnosis || l.diagnosis === diagnosis;
        const okAge = !ageGroup || l.ageGroup === ageGroup;
        const okEnv = !environment || l.environment === environment;

        return okDiagnosis && okAge && okEnv;
    });
}

function analyzeFiltered(filters) {
    const logs = filterLogs(filters);

    if (logs.length === 0) return null;

    const moods = logs.map(l => l.mood);
    const conds = logs.map(l => l.cond);

    return {
        count: logs.length,
        avgMood: (moods.reduce((a,b)=>a+b,0)/moods.length).toFixed(1),
        avgCond: (conds.reduce((a,b)=>a+b,0)/conds.length).toFixed(1),
        raw: logs
    };
}
