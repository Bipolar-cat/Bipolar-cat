let selectedMood = 2;
let selectedCond = 2;

function setVal(type, val, btn) {

    const parent = btn.parentElement;

    parent
        .querySelectorAll("button")
        .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    if (type === "mood") {
        selectedMood = val;
    } else {
        selectedCond = val;
    }

    console.log(type, val);
}
