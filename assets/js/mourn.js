/*
 * @Autor: MarkGuan
 * @Date: 2022-09-29 10:41:01
 * @LastEditors: MarkGuan
 * @LastEditTime: 2022-10-31 14:09:31
 * @Description: This is a mourn js!
 */
(function xqMourn () {
    let xqmourn = document.getElementById('xqmourn');
    let dates = xqmourn.dataset ? xqmourn.dataset.date : '';
    let now = new Date();
    let mouth = now.getMonth()+1;
    let day = now.getDate();
    let date = mouth.toString()+'.'+day.toString();
    let mourns = ['12.13', '7.7'];
    if (dates && dates.split(',').length) {
        mourns = dates.split(',');
    }

    if (mourns.indexOf(date) > -1) {
        document.documentElement.style = 'filter: gray; filter: grayscale(1)';
    } else {
        document.documentElement.style = '';
    }
})();