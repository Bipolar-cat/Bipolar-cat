let selectedMood = 2;
let selectedCond = 2;

function renderThreeButtons(containerId, type){

    const container =
        document.getElementById(containerId);

    if(!container) return;

    container.innerHTML = "";

    console.log(document.getElementById("mood-buttons"));
    console.log(document.getElementById("cond-buttons"));

    labels.forEach((label,index)=>{

        const btn =
            document.createElement("button");

        btn.className =
            `record-btn ${type}-btn`;

        if(index === 1){
            btn.classList.add("active");
        }

        btn.textContent = label;

        btn.onclick = () => {

            container
                .querySelectorAll(".record-btn")
                .forEach(b =>
                    b.classList.remove("active")
                );

            btn.classList.add("active");

            if(type === "mood"){
                selectedMood = index + 1;
            }else{
                selectedCond = index + 1;
            }
        };

        container.appendChild(btn);
    });
}
