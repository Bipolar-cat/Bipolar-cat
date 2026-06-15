console.log("settings.js loaded");

function openSettings(){
    document
        .getElementById("settings-panel")
        .style.display = "block";
}

function closeSettings(){
    document
        .getElementById("settings-panel")
        .style.display = "none";
}

function toggleSettings(){
    alert("設定画面");
}

    const panel =
        document.getElementById(
            "settings-panel"
        );

    if(panel.style.display==="block"){
        panel.style.display="none";
    }else{
        panel.style.display="block";
    }
}
