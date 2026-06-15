function setVal(type, val, btn) {

    const parent = btn.parentElement;

    parent.querySelectorAll("button")
        .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    if (type === "mood") {
        selectedMood = val;
    } else {
        selectedCond = val;
    }
}

function formatDate(date) {

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}
