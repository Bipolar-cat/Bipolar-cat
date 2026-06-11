function loadSettings() {

    const saved =
        localStorage.getItem("innernote_settings");

    if (!saved || saved === "undefined") {
        return;
    }

    let settings;

    try {
        settings = JSON.parse(saved);
    } catch (error) {
        console.error("設定データ破損", error);
        return;
    }

    document.getElementById("record-mode").value =
        settings.recordMode || "3";

    document.getElementById("diagnosis").value =
        settings.diagnosis || "";

    document.getElementById("diagnosis-other").value =
        settings.diagnosisOther || "";

    document.getElementById("age-group").value =
        settings.ageGroup || "";
}
