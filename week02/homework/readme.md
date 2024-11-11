# 1 导航栏的实现

1. 将导航栏设为flex布局，将其分为左，中，右三个div

2. 然后将每个块细分，左边为logo和分类发现电台，中间为搜索框，右侧为导航栏。

   

# 2 猜你喜欢栏目和有声书栏目的实现

猜你喜欢栏目和有声书栏目的重点在于其的点击切换的功能，这里对其css样式代码的设计不再赘述。

主要说明js代码的实现。

猜你喜欢栏目和有声书栏目js代码的实现基本相同，以下以猜你喜欢的js代码举例说明：

```json
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
														<img class="zantingjian" src="../img/donghua.png">
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
```

其主要核心就是在于通过js代码生成相对应的块，然后有以下的函数控制传入的数据

```json
// 定义切换 currentPage 值的函数
function changePage() {
    // 将 currentPage 值在 0 和 1 之间切换
    currentPage = currentPage === 0 ? 1 : 0;
    console.log(currentPage);
    renderItems(guesslikeData,currentPage);
}
```

这样，将这个changePage函数绑定到换一批按钮上的时候，就可以实现切换的效果。

有声书的js代码与其类似，只不过参数要改为导航栏的不同导航的id值。



#  3 侧边栏的实现

​	侧边栏的实现主要在于页面的如何布局，使得侧边栏的块位于侧方，这里选择的是flex布局，猜你喜欢栏目和有声书栏目整体为一个块，侧边栏为一个块，这两个块的父容器为flex布局，这样通过调整宽度就可以使得完成侧边栏的布局。

​	其下面有声书排行榜也可以通过如猜你喜欢栏目类似的js代码生成，需要调整的仅是css样式，以及要解决排行4，5，6没有图片的问题，这需要在循环内增加一个计数器来简单判断，

```json
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
```



# 4 分类下拉框和上传悬浮框的实现

​	对于分类下拉框，查阅资料，最终采用position：fixed的方法，使其相对于页面的位置固定，使得该下拉框的css样式不会影响到导航栏其父容器的大小。

​	通过事件监听器来控制下拉框的出现消失

```json
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
```



# 5 图片动画效果的实现

1. 在js代码中的img-div中加入暂停键的图片，并将图片设置居中
2. 对整个img-div添加鼠标监听事件，通过改变display样式，实现暂停键图片的出现与切换



# 6 音乐播放的实现

1. 对暂停键绑定play-Audio函数，控制音乐的播放。

2. playAudio的函数主要逻辑为，通过两个全局变量currentAudio 和currentSrc存储当前播放的音乐和源，当点击暂停键时，取出其对应数据的audio中所存储的音乐的源，将音乐保存到 currentAudio中，再次点击则暂停，换图片点击，则清除当前音乐和源，更换音乐和源，重新播放，

   ```json
   function playAudio(src) {
       // 定义路径前缀
       const basePath = '/week02/homework';
       // 将前缀与音频文件的相对路径拼接
       const fullSrc = basePath + src;
   
       // 如果当前有音频正在播放，并且请求播放的是同一音频，则暂停
       if (currentAudio && currentSrc === fullSrc) {
           currentAudio.pause();
           currentAudio = null;
           currentSrc = null;
       } else {
           // 如果当前有音频正在播放，暂停并清除
           if (currentAudio) {
               currentAudio.pause();
               currentAudio = null;
               currentSrc = null;
           }
   
           // 创建新的 Audio 对象
           const audio = new Audio(fullSrc);
           audio.play().catch(error => {
               console.error('Error playing audio:', error);
           }).then(() => {
               // 存储当前播放的音频对象和它的源
               currentAudio = audio;
               currentSrc = fullSrc;
           });
       }
   }
   ```

   

# 7 音乐播放栏的实现

1. 其样式同样采用position:fixed来保持其与页面位置的相对固定。

2. 目前实现了两个功能：

   1. 播放音乐时播放栏图片的更换，思路为在playAudio函数中，增加一个函数 专门来插入图片，并将图片的源作为参数传入

      

   2. 暂停音乐的实现，通过一个全局变量isPaused判断音乐是否处于暂停状态，从而控制音乐的播放与暂停

      ```json
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
      ```

      

 3. 与此同时，修改playAudio函数的逻辑，使其可以通过pauseMusic控制音乐的暂停开始

    ```json
    // 如果当前有音频正在播放，并且请求播放的是同一音频，则只改变播放状态
    	if (currentAudio && currentSrc === fullSrc) {
    			pauseMusic(); // 调用pauseMusic来改变播放状态
    ```



# 8 导航栏动画实现

```css
	&:nth-child(1):hover~.nav-box{
						left: calc((100%/3)*0);
						background-color:#f86442;
					}
					&:nth-child(2):hover~.nav-box{
						left: calc((100%/3)*1);
						background-color:#f86442;
					}
					&:nth-child(3):hover~.nav-box{
						left: calc((100%/3)*2);
						background-color:#f86442;
					}
```



主要代码为上，通过一个nav-box的hover属性的移动，来实现导航栏的动画效果





# 9 未完成功能

音乐播放栏的切换音乐，进度条等功能

点击图片播放音乐时 图片由▶变为⏸，两个播放暂停图片的切换功能

客户端，头像的展示效果
