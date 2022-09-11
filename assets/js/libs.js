let isLocal = window.location.host.indexOf('static.guanqi.xyz') === -1 ? true : false,
domain = isLocal ?  'https://static.guanqi.cn/libs/' : 'https://static.guanqi.xyz/libs/',
libs = [
    'font-awesome/5.15.3/css/all.min.css',
    'opensans/0.0.1/css/opensans.min.css',
    'xqdevice/0.0.1/js/device.min.js',
    'html5shiv/3.7.3/html5shiv.min.js',
    'respond/1.4.2/js/respond.min.js',
    'xqmourn/0.0.1/js/xqmourn.min.js',
    'gjs/1.0.3/js/gjs.min.js',
];

function addCssAndLink () {  
    let headFrame = document.createDocumentFragment(),
    head = document.getElementsByTagName('head')[0];
    for (let i = 0, len = libs.length; i < len; i++) {
        const item = libs[i];
        let type = item.split('/')[item.split('/').length-1].split('.');
        type = type[type.length-1].indexOf('css') === -1 ? 'js' : 'css';
        if (type === 'css') {
            const headCss = document.createElement('link');
            headCss.type = 'text/css';
            headCss.rel = 'stylesheet';
            headCss.href = domain+item;
            headFrame.appendChild(headCss);
        } else {
            const headScript = document.createElement('script');
            headScript.src = domain+item;
            headFrame.appendChild(headScript);
        }
    }
    head.appendChild(headFrame);

}

document.addEventListener('DOMContentLoaded', addCssAndLink, false);
