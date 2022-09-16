
let datas = [],
current = 1,
pages = 0,
total = 0,
listElem = document.getElementById('list'),
pageElem = document.getElementById('pages');

showList(current);

// 显示列表
async function showList (current) {
    let data = null;
    listElem.innerHTML = '';
    listElem.innerHTML = '<li class="loading">加载中...</li>';
    if (datas && datas.length) {
        data = {
            code: 200,
            msg: 'get_succ',
            data: {
                list: datas[current-1],
                current: current,
                pages,
                total,
            }
        }
    } else {
        data = await getList(current);
    }
    if (data.code === 200) {
        let list = data.data.list;
        if (list && list.length) {
            let liStr = '',pageStr = '';
            for (const item of list) {
                liStr += `<li>
                    <h3>${item.title}</h3>
                    <p>${item.body}</p>
                </li>`;
            }

            setTimeout(() => {
                listElem.innerHTML = liStr;
            }, 1000);

            if (pageElem.innerText === '') {
                for (let i = 0; i < data.data.pages; i++) {
                    pageStr += `<li><button class="page" data-id="${i+1}">${i+1}</button></li>`
                }
                pageElem.innerHTML = `
                <li><button id="start" data-id="1">首页</button></li>
                <li><button id="prev">上一页</button></li>
                ${pageStr}
                <li><button id="next">下一页</button></li>
                <li><button id="end" data-id="${data.data.pages}">尾页</button></li>`;
                showHighLight(current);
                addClick();
            }

        } else {
            listElem.innerHTML = '<li class="nodata">暂无数据</li>';
        }
    }
}

// 添加点击
function addClick () {  
    let btns = document.querySelectorAll('#pages li button');
    for (const item of btns) {
        item.addEventListener('click', toggleList, false);
    }
}

// 切换页面
function toggleList (event) {  
    let id = event.target.dataset.id,
    bid = event.target.id;
    if (id) {
        current = Number(id);
    }
    if (bid == 'prev') {
        if (current <= 1) {
            current = 1;
        } else {
            current--;
        }
    } else if (bid == 'next') {
        if (current >= pages) {
            current = pages;
        } else {
            current++;
        }
    }
    showHighLight(current, bid);
    showList(current);
}

// 显示高亮
function showHighLight (current, bid) {
    let btns = document.querySelectorAll('.page'),
    startBtn = document.getElementById('start'),
    endBtn = document.getElementById('end');
    for (const item of btns) {
        item.className = 'page';
    }
    btns[current-1].className = 'page active';
    startBtn.className = current == 1 ? 'active dis' : '';
    endBtn.className = current == pages ? 'active dis' : '';
}

// 获取列表
async function getList (page = 1) {
    let res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    if (res.status === 200) {
        let data = sliceData(res.data);
        pages = data.pages;
        total = res.data.length;
        datas = [...data.list];
        return {
            code: 200,
            msg: 'get_succ',
            data: {
                list: data.list[page-1],
                current: page,
                pages: data.pages,
                total: list.length,
            }
        }
    }
}

// 处理数据
function sliceData (list) {  
    let newArr = [],step = 10,pages = Math.ceil(list.length/10);
    for (let i = 0; i < list.length; i+=step) {
        let item = list.slice(i, i+step);
        newArr.push(item);
    }
    return {
        list: newArr,
        pages,
    };
}