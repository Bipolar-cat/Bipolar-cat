console.log("script.js loaded");

let records = [];

window.addEventListener("DOMContentLoaded", () => {

    renderThreeButtons(
        "mood-buttons",
        "mood"
    );

    renderThreeButtons(
        "cond-buttons",
        "cond"
    );

});

{
  id: 1,
  timestamp: 123456,
  mood: 5,
  condition: 6
}
