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
														<img class="zantingjian" src="../img/donghuakaishi.png" data-src="${item.audio}">
                            <span class="iconfont icon-shouting">
                                ${formatCount(item.times)}
                            </span>`;
				
				// 为 imgDiv 添加鼠标悬停和移出事件监听器
				imgDiv.addEventListener('mouseenter', function() {
						this.querySelector('.zantingjian').style.display = 'block';
				});
				imgDiv.addEventListener('mouseleave', function() {
						this.querySelector('.zantingjian').style.display = 'none';
				});

       // 访问 "暂停键" img 元素
       const pauseButton = imgDiv.querySelector('.zantingjian');
       pauseButton.addEventListener('click', function() {
           // 调用 playAudio 函数并传递对应的音频源
           playAudio(this.getAttribute('data-src'), item.img, item.title);
       });

      


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

// 存储当前播放的音频对象和它的源
let currentAudio = null;
let currentSrc = null;
//存放播放器图片的块
var playerImgContainers = document.getElementsByClassName('player-img');
const playerImgContainer=playerImgContainers[0];

// 控制音乐播放的函数 flag反应音乐的播放与暂停
let isPaused = true; // 初始状态为暂停
function pauseMusic() {
    if (currentAudio && !isPaused) {
        currentAudio.pause();
        isPaused = true; // 更新全局变量
    } else if (currentAudio && isPaused) {
        currentAudio.play()
            .then(() => {
                isPaused = false; // 更新全局变量
            })
            .catch(error => {
                console.error('Error playing audio:', error);
            });
    }
}

// 播放音乐的函数
function playAudio(src, imgSrc, title) {
	// 定义路径前缀
	const basePath = '/week02/homework';
	// 将前缀与音频文件的相对路径拼接
	const fullSrc = basePath + src;

	// 如果当前有音频正在播放，并且请求播放的是同一音频，则只改变播放状态
	if (currentAudio && currentSrc === fullSrc) {
			pauseMusic(); // 调用pauseMusic来改变播放状态
	} else {
			// 如果当前有音频正在播放，暂停并清除
			if (currentAudio) {
					currentAudio.pause();
					currentAudio = null;
					currentSrc = null;
					// 清空 playerImgContainer 中的内容
					insertPlayerImg('', ''); // 可以传递空字符串或者适当的默认图片
			}

			// 创建新的 Audio 对象
			const audio = new Audio(fullSrc);
			audio.play()
					.then(() => {
							// 存储当前播放的音频对象和它的源
							currentAudio = audio;
							currentSrc = fullSrc;
							// 插入新图片
							insertPlayerImg(imgSrc, title);
							isPaused = false; // 更新全局变量
					})
					.catch(error => {
							console.error('Error playing audio:', error);
					});
	}
}
//设置向player中插入图片的代码
function insertPlayerImg(imgSrc, title) {
	playerImgContainer.innerHTML = `<img src="${imgSrc}" alt="${title}">`;
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
											imgDiv.innerHTML = `<img src="${item.img}" alt="${item.title}">
																					<img class="zantingjian" src="../img/donghuakaishi.png">
																					<span class="iconfont icon-shouting">
																									${formatCount(item.times)}
																					</span>`;

								// 为 imgDiv 添加鼠标悬停和移出事件监听器
								imgDiv.addEventListener('mouseenter', function() {
									this.querySelector('.zantingjian').style.display = 'block';
								}	);
								imgDiv.addEventListener('mouseleave', function() {
										this.querySelector('.zantingjian').style.display = 'none';
								});

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

/**
 * 分类下拉框
 */
// 获取分类链接的 a 标签
var fenleiLink = document.querySelector('.fenlei a');
// 获取分类包裹块
var fenleiWrap = document.querySelector('.fenlei-wrap');

// 给分类链接的 a 标签添加 onmouseover 事件，以便在鼠标悬浮时显示分类包裹块
fenleiLink.onmouseover = function() {
    fenleiWrap.style.display = 'block'; // 显示元素
    fenleiWrap.style.opacity = '1'; // 设置透明度为1
  };
  
  // 给分类链接的 a 标签添加 onmouseout 事件，以便在鼠标离开时隐藏分类包裹块
fenleiLink.onmouseout = function() {
    fenleiWrap.style.opacity = '0'; // 设置透明度为0
    setTimeout(function() {
        fenleiWrap.style.display = 'none'; // 隐藏元素
    }, 500); // 等待过渡效果完成后再隐藏
};

/**
 * 上传下拉框
 */


var shangchuanLink = document.querySelector('#shangchuan1');
var shangchuanWrap = document.querySelector('.shangchuan-wrap');
shangchuanLink.onmouseover = function() {
    shangchuanWrap.style.display = 'block'; // 显示元素
    shangchuanWrap.style.opacity = '1'; // 设置透明度为1
  };
  
  shangchuanLink.onmouseout = function() {
    shangchuanWrap.style.opacity = '0'; // 设置透明度为0
    setTimeout(function() {
        shangchuanWrap.style.display = 'none'; // 隐藏元素
    }, 500); // 等待过渡效果完成后再隐藏
};

// 获取搜索框和下拉菜单的DOM元素
const searchInput = document.getElementById('search-input');
const dropdownMenu = document.getElementById('dropdown-menu');

// 监听搜索框的点击事件
searchInput.addEventListener('click', function(event) {
  // 阻止事件冒泡，避免触发下拉菜单的点击外部隐藏
  event.stopPropagation();
  
  // 显示下拉菜单
  dropdownMenu.style.display = 'block';
});

// 监听整个页面的点击事件，用于隐藏下拉菜单
document.addEventListener('click', function() {
  dropdownMenu.style.display = 'none';
});

// 防止点击下拉菜单时触发页面的点击事件
dropdownMenu.addEventListener('click', function(event) {
  event.stopPropagation();
});



