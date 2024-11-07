function formatCount(count) {
    return (count / 10000).toFixed(1) + '万';
}

let currentPage = 0; // 当前页码
const itemsPerPage = 5; // 每页显示的项目数量
let guesslikeData = null; //存储guesslike数据
let audiobookData=null;//存储有声书数据
let rankbookData=null; //存储排行榜数据


// 定义切换 currentPage 值的函数
function changePage() {
    // 将 currentPage 值在 0 和 1 之间切换
    currentPage = currentPage === 0 ? 1 : 0;
    console.log(currentPage);
    renderItems(guesslikeData,currentPage);
}


fetch('db.json')
.then(response => response.json())
.then(data => {
    guesslikeData = data.guesslike; // 将数据赋给全局变量
    audiobookData = data.audiobook;
    rankbookData =data.ranking;
    renderItems(guesslikeData, currentPage); // 初次渲染
    renderItems1("toutuoyuan",0);
    renderItems2(rankbookData,0)
})
.catch(error => console.error('加载 JSON 文件出错:', error));


function renderItems(globalData,page) {
    const container = document.getElementById('guesslike-container');

    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = globalData.slice(startIndex, endIndex);

    // 创建一个 ul 元素作为列表容器
    const ul = document.createElement('ul');
    ul.className = 'image-list'; // 添加类名以便于样式

    // 遍历数据并创建 li 元素
    pageItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item'; // 添加类名以便于样式

        //创建一个包含所有内容的div
        const allDiv=document.createElement('div');
        allDiv.className="all-wrap";

        // 创建包含图片的 div 标签
        const imgDiv = document.createElement('div');
        imgDiv.className = 'image-div';
        imgDiv.innerHTML = `<img src="${item.img}" alt="${item.title}">
                            <span class="iconfont icon-shouting">
                                
                                ${formatCount(item.times)}
                            </span>`;

        // 创建包含标题的 div 标签
        const titleDiv = document.createElement('div');
        titleDiv.className = 'title-div';
        titleDiv.innerHTML = `${item.title}`;
        titleDiv.setAttribute('title',item.title);
        

        // 创建包含作者的 div 标签
        const authorDiv = document.createElement('div');
        authorDiv.className = 'author-div';
        authorDiv.innerHTML = `${item.author}`;

        // 创建包含 VIP 标识的 div 标签（如果需要）
        const vipDiv = item.vip ? document.createElement('div') : null;
        if (vipDiv) {
            vipDiv.className = 'vip-div';
            vipDiv.innerHTML = '<p class="vip">VIP</p>';
        }

        // 将 imgDiv 和 textDiv 添加到 li 中
        allDiv.appendChild(imgDiv);
        allDiv.appendChild(titleDiv);
        allDiv.appendChild(authorDiv);


        li.appendChild(allDiv)
        // 将 li 添加到 ul 中
        ul.appendChild(li);
    });

    // 清空容器并将 ul 添加到容器中
    container.innerHTML = ''; // 清空之前的内容
    container.appendChild(ul);
}



//定义切换有声书页面的函数 根据id值切割data
function handleNavClick(id) {
    // 根据传入的 id 重新渲染页面
    switch (id) {
      case 'nav1':
        renderItems1("toutuoyuan",0);
        break;
      case 'nav2':
        renderItems1("doupocangqiong",0);
        break;
      case 'nav3':
        renderItems1("xinghancanlan",0);
        break;
      case 'nav4':
        renderItems1("santi",0);
        break;
    }
    console.log(id);
}


function renderItems1(category,page) {
    const container = document.getElementById('audiobook-container');

    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + 10;

    // 从 data.audiobook 中获取对应的 globalData
    const globalData = audiobookData[category];

    // 检查 globalData 是否存在
    if (!globalData) {
      console.error('No data found for the given category');
      return;
    }

    const pageItems = globalData.slice(startIndex, endIndex);

    // 创建一个 ul 元素作为列表容器
    const ul = document.createElement('ul');
    ul.className = 'image-list'; // 添加类名以便于样式

    // 遍历数据并创建 li 元素
    pageItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item'; // 添加类名以便于样式

        //创建一个包含所有内容的div
        const allDiv=document.createElement('div');
        allDiv.className="all-wrap";

        // 创建包含图片的 div 标签
        const imgDiv = document.createElement('div');
        imgDiv.className = 'image-div';
        imgDiv.innerHTML = `<img src="${item.img}" alt="${item.text}">
                            <span class="iconfont icon-shouting">
                                
                                ${formatCount(item.times)}
                            </span>`;

        // 创建包含标题的 div 标签
        const titleDiv = document.createElement('div');
        titleDiv.className = 'title-div';
        titleDiv.innerHTML = `${item.text}`;
        titleDiv.setAttribute('title',item.text);
        

        // 创建包含作者的 div 标签
        const authorDiv = document.createElement('div');
        authorDiv.className = 'author-div';
        authorDiv.innerHTML = `${item.author}`;

        // 创建包含 VIP 标识的 div 标签（如果需要）
        const vipDiv = item.vip ? document.createElement('div') : null;
        if (vipDiv) {
            vipDiv.className = 'vip-div';
            vipDiv.innerHTML = '<p class="vip">VIP</p>';
        }

        // 将 imgDiv 和 textDiv 添加到 li 中
        allDiv.appendChild(imgDiv);
        allDiv.appendChild(titleDiv);
        allDiv.appendChild(authorDiv);


        li.appendChild(allDiv)
        // 将 li 添加到 ul 中
        ul.appendChild(li);
    });

    // 清空容器并将 ul 添加到容器中
    container.innerHTML = ''; // 清空之前的内容
    container.appendChild(ul);
}

function renderItems2(globalData,page) {
    const container = document.getElementById('ranking-container');

    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + 6;
    const pageItems = globalData.slice(startIndex, endIndex);

    // 创建一个 ul 元素作为列表容器
    const ul = document.createElement('ul');
    ul.className = 'image-list'; // 添加类名以便于样式

    // 遍历数据并创建 li 元素
    pageItems.forEach((item ,index)=> {
        const li = document.createElement('li');
        li.className = 'item'; // 添加类名以便于样式
        //增加一个计数器处理逻辑
        const counter = index + 1; 
        //创建一个包含所有内容的div
        const allDiv=document.createElement('div');
        allDiv.className="all-wrap";

        //创建一个包含文字内容的div
        const textDiv=document.createElement('div');
        textDiv.className="text-wrap";

       if (counter<=3) {
           const imgDiv = document.createElement('div');
           imgDiv.className = 'image-div';
           imgDiv.innerHTML = `<img src="${item.img}" alt="${item.desc}">`;
           allDiv.appendChild(imgDiv); // 将 imgDiv 添加到 allDiv 中
       }

        // 创建包含标题的 div 标签
        const titleDiv = document.createElement('div');
        titleDiv.className = 'title-div';
        titleDiv.innerHTML = `${item.desc}`;
        titleDiv.setAttribute('title',item.desc);
        textDiv.appendChild(titleDiv);  
        
        const counterDiv = document.createElement('div');
        counterDiv.className = 'counter-div';
        counterDiv.innerHTML = `${counter}`; // 显示计数器的值

        if (counter<=3) {
            // 创建包含作者的 div 标签
            const authorDiv = document.createElement('div');
            authorDiv.className = 'author-div';
            authorDiv.innerHTML = `${item.author}`;
            textDiv.appendChild(authorDiv);
        }

        if(counter<=3){
            allDiv.appendChild(textDiv);
        }else{
            allDiv.appendChild(counterDiv);
            allDiv.appendChild(titleDiv);
        }
        
        

        li.appendChild(allDiv)
        // 将 li 添加到 ul 中
        ul.appendChild(li);
    });

    // 清空容器并将 ul 添加到容器中
    container.innerHTML = ''; // 清空之前的内容
    container.appendChild(ul);
}