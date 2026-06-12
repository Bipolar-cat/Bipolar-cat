console.log("renderThreeButtons =", typeof renderThreeButtons);
console.log("logs.js version 2");
console.log("logs.js loaded");

let selectedMood = 2;
let selectedCond = 2;

function renderThreeButtons(containerId, type){

    console.log("render:", containerId);

    const container =
        document.getElementById(containerId);

    console.log(container);

    if(!container) return;

    container.innerHTML = "";

    let labels;

    if(type === "mood"){
        labels = ["良い", "普通", "低い"];
    }else{
        labels = ["良い", "普通", "悪い"];
    }

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
