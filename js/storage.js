const SETTINGS_KEY = "innernote_settings";

function saveSettingsData(data) {
    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(data)
    );
}

function loadSettingsData() {
    return JSON.parse(
        localStorage.getItem(SETTINGS_KEY)
        || "{}"
    );
}
