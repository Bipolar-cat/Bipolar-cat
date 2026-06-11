function loadState() {

    const saved =
        localStorage.getItem("innernote_state");

    if (!saved) {
        return {};
    }

    return JSON.parse(saved);
}
