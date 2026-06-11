console.log("script.js loaded");
console.log("NEW SCRIPT");

window.addEventListener("DOMContentLoaded", () => {

    console.log("DOM READY");

    renderThreeButtons("mood-buttons", "mood");
    renderThreeButtons("cond-buttons", "cond");

});
