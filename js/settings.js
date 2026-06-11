// settings.js

function toggleSettings() {
    const panel = document.getElementById("settings-panel");

    if (!panel) return;

    panel.classList.toggle("open");
}

function saveSettings() {

    const settings = {
        recordMode: document.getElementById("record-mode")?.value || "3",

        diagnosis: document.getElementById("diagnosis")?.value || "",

        diagnosisOther:
            document.getElementById("diagnosis-other")?.value || "",

        ageGroup:
            document.getElementById("age-group")?.value || "",

        jobFulltime:
            document.getElementById("job-fulltime")?.checked || false,

        jobPart:
            document.getElementById("job-part")?.checked || false,

        leave:
            document.getElementById("leave")?.checked || false,

        unemployed:
            document.getElementById("unemployed")?.checked || false,

        student:
            document.getElementById("student")?.checked || false,

        leaveSchool:
            document.getElementById("leave-school")?.checked || false,

        noJob:
            document.getElementById("no-job")?.checked || false,

        housewife:
            document.getElementById("housewife")?.checked || false,

        married:
            document.getElementById("married")?.checked || false,

        children:
            document.getElementById("children")?.checked || false,

        alone:
            document.getElementById("alone")?.checked || false,

        family:
            document.getElementById("family")?.checked || false,

        familyDetail:
            document.getElementById("family-detail")?.value || "",

        otherPerson:
            document.getElementById("other-person")?.checked || false,

        otherPersonDetail:
            document.getElementById("other-person-detail")?.value || "",

        hospitalOut:
            document.getElementById("hospital-out")?.checked || false,

        hospitalVisit:
            document.getElementById("hospital-visit")?.checked || false,

        welfare:
            document.getElementById("welfare")?.checked || false,

        familyHistory:
            document.getElementById("family-history")?.checked || false
    };

    localStorage.setItem(
        "innernote_settings",
        JSON.stringify(settings)
    );

    alert("設定を保存しました");
}

function loadSettings() {

    const saved =
        localStorage.getItem("innernote_settings");

    if (!saved) return;

    const settings = JSON.parse(saved);

    document.getElementById("record-mode").value =
        settings.recordMode || "3";

    document.getElementById("diagnosis").value =
        settings.diagnosis || "";

    document.getElementById("diagnosis-other").value =
        settings.diagnosisOther || "";

    document.getElementById("age-group").value =
        settings.ageGroup || "";

    document.getElementById("job-fulltime").checked =
        settings.jobFulltime || false;

    document.getElementById("job-part").checked =
        settings.jobPart || false;

    document.getElementById("leave").checked =
        settings.leave || false;

    document.getElementById("unemployed").checked =
        settings.unemployed || false;

    document.getElementById("student").checked =
        settings.student || false;

    document.getElementById("leave-school").checked =
        settings.leaveSchool || false;

    document.getElementById("no-job").checked =
        settings.noJob || false;

    document.getElementById("housewife").checked =
        settings.housewife || false;

    document.getElementById("married").checked =
        settings.married || false;

    document.getElementById("children").checked =
        settings.children || false;

    document.getElementById("alone").checked =
        settings.alone || false;

    document.getElementById("family").checked =
        settings.family || false;

    document.getElementById("family-detail").value =
        settings.familyDetail || "";

    document.getElementById("other-person").checked =
        settings.otherPerson || false;

    document.getElementById("other-person-detail").value =
        settings.otherPersonDetail || "";

    document.getElementById("hospital-out").checked =
        settings.hospitalOut || false;

    document.getElementById("hospital-visit").checked =
        settings.hospitalVisit || false;

    document.getElementById("welfare").checked =
        settings.welfare || false;

    document.getElementById("family-history").checked =
        settings.familyHistory || false;
}

window.addEventListener("DOMContentLoaded", () => {
    loadSettings();
});
