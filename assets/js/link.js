/*
 * @Autor: MarkGuan
 * @Date: 2022-09-29 09:48:39
 * @LastEditors: MarkGuan
 * @LastEditTime: 2022-10-31 10:54:57
 * @Description: This a file description.
 */
/**
 * @author: MarkGuan
 * @description: go link
 * @return {*}
 */
(function () {  
    if (location.search) {
        let url = decodeURIComponent(location.search.split('?')[1].split('=')[1]);
        if (url && url.indexOf('http') > -1) {
            setTimeout(function () {
                location = url;
            }, 886);
        } else {
            alert('暂无链接！');
            window.history.back();
        }
    } else {
        location.href = '../';
    }
})();