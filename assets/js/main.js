/*
 * @Author: Mr.Mark
 * @Date: 2019-10-18 19:49:27
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-09-05 12:58:53
 */
let siteTitle = document.querySelector(".site-title");
let counts = document.querySelectorAll(".count");
let content = document.querySelector(".demo-content");
let search = document.querySelector(".demo-content-search");
let count = document.querySelector("#count");
let navLis = document.querySelectorAll(".demo-nav-content li a");
let contents = document.querySelectorAll(".demo-content-item");
let contentItem = document.querySelectorAll(".demo-content-item-ls");
let searchContent = document.querySelector(".demo-item-search");
let host = location.origin + location.pathname;

// 到顶部
let goTopBtn = document.querySelector(".demo-go-top");
let showNav = document.querySelector(".demo-show-nav");
let demoNav = document.querySelector(".demo-nav");
let navExit = document.querySelector(".demo-nav-exit");

// 搜索事件
search.addEventListener("input", searchDemo, false);

// 获取数据
getData();

function getData() {
  gjs.httpSimple("get", host + "/assets/mock/list.json", null, function (res) {
    if (res.code === 200) {
      let data = res.data;
      document.title = data.name + "- 探索新技术，展望未来云";
      siteTitle.innerText = data.name;
      showData(data.list);
    } else {
      let list = [];
      showData(list);
    }
  });
}

// 显示搜索框
function searchDemo(e) {
  let keywords = e.target.value;
  if (keywords == "") {
    for (let i = 0; i < contents.length; i++) {
      contents[i].style.display = "block";
    }
    searchContent.style.display = "none";
  } else {
    for (let i = 0; i < contents.length; i++) {
      contents[i].style.display = "none";
    }
    searchContent.style.display = "block";
    getSearch(keywords);
  }
}

// 获取搜索内容
function getSearch(keywords) {
  gjs.httpSimple("get", host + "/assets/mock/list.json", null, function (res) {
    let searchArr = [];
    let list = res.data.list;
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item.name.indexOf(keywords) > -1) {
        searchArr.push(item);
      }
    }
    showSearchData(searchArr);
  });
}

// 显示搜索数据
function showSearchData(list) {
  let contentItem = document.querySelector(
    ".demo-item-search .demo-content-item-ls"
  );
  let searchCount = document.getElementById("search-count");
  contentItem.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    let tags = element.tags.split(",").join(", ");
    if (
      element.href.indexOf("http") > -1 ||
      element.href.indexOf("https") > -1
    ) {
      element.href =
        "https://felab.guanqi.xyz/link/check/?target=" +
        encodeURIComponent(element.href);
    } else {
      element.href = host + element.href;
    }
    let str =
      '<li><a href="' +
      element.href +
      '" target="_blank" title=" ' +
      element.description +
      '"><div class="demo-item-img"><img class="lazyimg" src="./assets/img/holder.png" data-src="' +
      "./" +
      element.picUrl +
      '" alt="' +
      element.name +
      '"></div><div class="project-bot"><span class="project-title">' +
      element.name +
      '</span><span class="project-des">' +
      element.description +
      '</span><span class="project-tags"><i class="fa fa-tags"></i>' +
      tags +
      "</span></div></a></li>";
    contentItem.innerHTML += str;
  }
  searchCount.innerText = list.length;
}

// 显示数据
function showData(list) {
  let contentItem = document.querySelectorAll(".demo-content-item-ls");

  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    let cIndex = element.cid.toString().split("")[0] - 1;
    let tags = element.tags.split(",").join(", ");
    if (
      element.href.indexOf("http") > -1 ||
      element.href.indexOf("https") > -1
    ) {
      element.href =
        "https://felab.guanqi.xyz/link/check/?target=" +
        encodeURIComponent(element.href);
    } else {
      element.href = host + element.href;
    }
    let str =
      '<li><a href="' +
      element.href +
      '" target="_blank" title=" ' +
      element.description +
      '"><div class="demo-item-img"><img class="lazyimg" src="./assets/img/holder.png" data-src="' +
      "./" +
      element.picUrl +
      '" alt="' +
      element.name +
      '"></div><div class="project-bot"><span class="project-title">' +
      element.name +
      '</span><span class="project-des">' +
      element.description +
      '</span><span class="project-tags"><i class="fa fa-tags"></i>' +
      tags +
      "</span></div></a></li>";
    contentItem[cIndex].innerHTML += str;
  }
  for (let i = 0; i < contentItem.length; i++) {
    const element = contentItem[i];
    counts[i].innerText = element.childNodes.length;
  }
  count.innerText = list.length;
}

// 图片懒加载
function lazyLoad() {
  let lazyImgs = document.querySelectorAll(".lazyimg");
  let clientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  for (var i = 0; i < lazyImgs.length; i++) {
    console.log(lazyImgs[i].offsetTop, clientHeight+scrollTop);
    if (lazyImgs[i].offsetTop < clientHeight + scrollTop) {
      let secImgs = lazyImgs[i];
      if (secImgs.getAttribute("src") === "./assets/img/holder.png") {
        secImgs.src = secImgs.getAttribute("data-src");
      }
    }
  }
}

content.addEventListener(
  "scroll",
  function () {
    // 懒加载
    lazyLoad();
    // 到顶部
    let scrollTop = content.scrollTop;
    if (scrollTop > 280) {
      goTopBtn.style.display = "block";
    } else {
      goTopBtn.style.display = "none";
    }
    // 滚动高亮
    for (let i = 0; i < contents.length; i++) {
      const element = contents[i].offsetTop - 50;
      if (element <= scrollTop) {
        for (let j = 0; j < navLis.length; j++) {
          navLis[j].className = "";
        }
        navLis[i].className = "active";
      }
    }
  },
  false
);

// 点击到对应
goNavContent();

function goNavContent() {
  for (let i = 0; i < navLis.length; i++) {
    const element = navLis[i];
    element.addEventListener("click", function (e) {
      let contentTop = 0;
      if (contents[i]) {
        contentTop = contents[i].offsetTop;
      }
      document.documentElement.scrollTop = contentTop;
      document.body.scrollTop = contentTop;
    });
  }
}

// 到顶部
$g.addEvent(goTopBtn, "click", goTop, false);

function goTop() {
  let timer = setInterval(function () {
    let top = content.scrollTop;
    let speed = 0;
    if (top > 0) {
      speed = Math.floor(-top / 6);
    }
    if (top == 0) {
      clearInterval(timer);
    }
    content.scrollTop = top + speed;
  }, 10);
}

// 手机版显示左侧导航
if (navigator.userAgent.indexOf("Mobile") > -1) {
  if (showNav) {
    showNav.addEventListener("click", showSilderNav, false);
    function showSilderNav() {
      demoNav.style.left = 0;
    }
  }
  if (navExit) {
    navExit.addEventListener("click", hideSilderNav, false);

    function hideSilderNav() {
      demoNav.style.left = -100 + "%";
    }
  }
}

window.onresize = function () {
  let clientWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  if (clientWidth >= 750) {
    demoNav.style.left = 0;
  } else {
    demoNav.style.left = -100 + "%";
  }
};
