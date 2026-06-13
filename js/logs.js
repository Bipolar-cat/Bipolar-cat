debug("logs.js loaded");

function saveData() {

    debug("saveData開始");

    console.log("saveData開始");

    try {

        const logs = getLogs();

        console.log(
            "現在の記録数:",
            logs.length
        );

    } catch(e){

        console.error(
            "saveData ERROR",
            e
        );

    }
}
