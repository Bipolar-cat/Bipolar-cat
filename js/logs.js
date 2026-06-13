function saveData() {

    debug("saveData開始");

    console.log("saveData開始");

    try {

        const logs = getLogs();

        console.log(
            "現在の記録数:",
            logs.length
        );

    } catch(e){

        console.error(
            "saveData ERROR",
            e
        );

    }
}
 function setVal(type,val,btn){
    debug(
      "setVal: " +
      type +
      "=" +
      val
    );

    const parent = btn.parentElement;

    parent
      .querySelectorAll("button")
      .forEach(b =>
          b.classList.remove("active")
      );

    btn.classList.add("active");

    if(type==="mood"){
        selectedMood = val;
    }else{
        selectedCond = val;
    }
}
