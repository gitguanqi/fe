(function xqMourn () {
    let now = new Date();
    let mouth = now.getMonth()+1;
    let day = now.getDate();
    let date = mouth.toString()+'.'+day.toString();
    let mourns = ['7.7', '9.18', '12.13'];
    if (mourns.includes(date)) {
        document.documentElement.style = 'filter: gray; filter: grayscale(1)';
    } else {
        document.documentElement.style = '';
    }
})();