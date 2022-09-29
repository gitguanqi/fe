function calcRem() {
    let clientWidth =
        document.documentElement.clientWidth || document.body.clientWidth;
    if (clientWidth <= 750) {
        document.documentElement.style.fontSize = clientWidth / 23.4375 + "px";
    } else {
        document.documentElement.style.fontSize = 16 + "px";
    }
}
calcRem();

window.addEventListener("resize", calcRem, false);