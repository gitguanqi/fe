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