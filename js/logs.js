// ========================
// Logs
// ========================

let selectedMood = 2;

function createMoodButtons() {

    const container =
        document.getElementById("mood-buttons");

    if (!container) return;

    const moods = [
        { value:1, label:"🙁 悪い" },
        { value:2, label:"😐 普通" },
        { value:3, label:"🙂 良い" }
    ];

    container.innerHTML = "";

    moods.forEach(mood => {

        const btn =
            document.createElement("button");

        btn.className = "record-btn";

        btn.innerText = mood.label;

        if(mood.value === 2){
            btn.classList.add("active");
        }

        btn.onclick = () => {

            document
            .querySelectorAll(".record-btn")
            .forEach(b =>
                b.classList.remove("active")
            );

            btn.classList.add("active");

            selectedMood = mood.value;
        };

        container.appendChild(btn);

    });

}
