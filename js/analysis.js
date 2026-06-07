function getDiagnosisStats() {

    const logs = getAllLogs();

    const result = {};

    logs.forEach(log => {

        const diagnosis =
            log.diagnosis || "未設定";

        if (!result[diagnosis]) {

            result[diagnosis] = {
                count: 0,
                moodTotal: 0,
                condTotal: 0
            };
        }

        result[diagnosis].count++;
        result[diagnosis].moodTotal += log.mood;
        result[diagnosis].condTotal += log.cond;
    });

    Object.keys(result).forEach(key => {

        result[key].avgMood =
            (
                result[key].moodTotal /
                result[key].count
            ).toFixed(1);

        result[key].avgCond =
            (
                result[key].condTotal /
                result[key].count
            ).toFixed(1);
    });

    return result;
}

function getDiagnosisByAge() {

    const logs = getAllLogs();

    const result = {};

    logs.forEach(log => {

        const diagnosis =
            log.diagnosis || "未設定";

        const age =
            log.ageGroup || "未設定";

        if (!result[diagnosis]) {
            result[diagnosis] = {};
        }

        if (!result[diagnosis][age]) {

            result[diagnosis][age] = {
                count: 0,
                moodTotal: 0,
                condTotal: 0
            };
        }

        result[diagnosis][age].count++;
        result[diagnosis][age].moodTotal += log.mood;
        result[diagnosis][age].condTotal += log.cond;
    });

    return result;
}

function getDiagnosisByAffiliation()
function getDiagnosisByEnvironment()
