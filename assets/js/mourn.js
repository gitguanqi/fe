/*
 * @Autor: MarkGuan
 * @Date: 2022-09-29 10:41:01
 * @LastEditors: MarkGuan
 * @LastEditTime: 2022-12-05 15:07:39
 * @Description: This is a mourn js!
 */
(function xqMourn () {
    let xqmourn = document.getElementById('xqmourn');
    let user = xqmourn.dataset ? xqmourn.dataset.date : '';
    user = user ? user.split(',') : [];
    let mourns = ['7.7', '12.13'];
    const baseUrl = location.origin+location.pathname+'/assets/mock/mourn.json';
    if (typeof fetch === 'function' && typeof Promise === 'function' && typeof Set === 'function') {
        fetch(baseUrl).then(function(res) {
            res.json().then(function (doc) {
                getData(doc);
            });
        });
    } else if (typeof window.gjs === 'function') {
        window.gjs.httpSimple('get', baseUrl, {}, function (res) {
            if (res.code === 200) {
                getData(res.data);
            }
        });
    } else {
        getData();
    }

    function getData (data) {
        let newArr = [];
        mourns = mourns.concat(mourns, user, data);
        mourns.forEach(function (item) {  
            if (newArr.indexOf(item) === -1) {
                newArr.push(item);
            }
        });
        checkData(newArr);
    }
    
    function checkData (arr) {
        let now = new Date();
        let mouth = now.getMonth()+1;
        let day = now.getDate();
        let date = mouth.toString()+'.'+day.toString();
        if (arr.indexOf(date) > -1) {
            document.documentElement.style = 'filter:grayscale(100%); -webkit-filter:grayscale(100%); -moz-filter:grayscale(100%); -ms-filter:grayscale(100%); -o-filter:grayscale(100%); filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); -webkit-filter:grayscale(1);filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");';
        } else {
            document.documentElement.style = '';
        }
    }

})();