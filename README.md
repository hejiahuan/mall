1assets /img/src 
2components 放公共组件  common放以后项目用的公共组件   content是跟业务相关的公共组件
3views  业务组件


1用normalize.css做css初始化，然后引入base.css的样式

2配置路径别名，就不用写../../!!!!
vuecli3 配置文件夹别名
在项目中创建vue.config.js文件


3加入.editorconfig  (通用代码标准)
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

#childComps
是每个大页面下的组件，我们把每个页面中的每个栏目都变成组件
##如果只是文字不一样，就不用搞插槽slot！！！！

##tabcontrol
tabcontrol封装，然后鼠标滚动，栏目吸顶！！思路

  .tab-control {
    /*//吸顶属性*/
    /*//必须设置top属性*/
    /*sticky到达top值后，自动position变成flex*/
    position: sticky;
    top: 44px
  }

##商品列表tabcontrol下面
##首页数据请求和保存在Goods下面

##安装Better-scroll用来做局部滚动
代码在github中
npm install better-scroll --save

用原生css 做局部滚动！！！！！
overflow-y: scroll;

但是这个有一个缺点，手机端非常卡顿

better-scroll必须放在mounted中，mounted表示模板,el创建完毕了！！不能用create,create那个时候什么都没有创建，找不到better-scroll(dom)中的dom
##必须封装Better-scroll解耦合，不然bettr-scroll太依赖了！！
scroll.vue

##如果确定中间高度(用better-scroll必须设置高度！！！！！)
[!55.jpg](55.JPG)
1用定位
.content {
    /*height: 300px;*/
    overflow: hidden;
    position: absolute;
    top:44px; 上边确定
    bottom: 49px; 下边确定
    left: 0; 左边为0
    right: 0; 右边为0
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  }
2用height: calc(100% - 93px)
.content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }
##回到首页的封装
思路
1就是先放一张图片
2然后得到better-scroll这个对象，然后用better-scroll这个对象的一个方法就可以回去
scrollTo(0,0,500ms)方法回到指定地方
  this.$refs.scroll.scroll.scrollTo(0,0,500)
##在用回到首页的时候，遇到一个小问题，就是要想在组件上监听事件必须用@click.native才可以监听
<!--不用放到Scroll,不需要跟他滚,组件是不能直接监听点击的，必须加native才可以-->

#回到首页默认不显示，和显示
达到临界值显示，小于临界值隐藏，必须随意监听滚动
需要实时监听滚到哪了
//2监听滚动的位置
      this.scroll.on("scroll",(position)=>{
        //谁需要要位置我们把位置传给Home父组件
        this.$emit("scroll",position)
}

 //监听位置postition,这个方法为了做topBack的隐藏和消失
      // 因为你要什么时候隐藏和消失，必须得知道位置
      contentScroll(postion){
        // 这个是有scroll传入给home父组件的
        //如果postion大于1000，显示出来topBack
       this.isShow= (-postion.y)>1000
      },
##上拉加载更多
先监听事件打开pullingUp属性，然后回调pullingUp方法！！！！上拉加载完成一次后，一定要
//这里一定要注意加载一次后一定要关闭加载更多不然加载一次再加载加载不了了
 //页面改变一次要刷新一次！！！不然有bug
        this.scroll.refresh()
        //页面加载一次要结束一次，否自只能加载一次
        this.scroll.finishPullUp()
##上拉加载更多bug
better-scroll在决定有多少区域可以滚动时，是根据scrollerHeight属性决定
当图片没有加载的时候，他会按没有加载图片的height算滚动距离，scrollerHight此时没有变化，也不刷新，当图片加载出来的时候，高度远远大于未加载的高度，此时高度并没有重刷新！！！所以在刷新的时候，会出现卡顿不流畅的情况甚至出现滑不下去的情况，此时我们应该重新加载我们的scrollerHight!!!!
##如何解决加载bug!!!
1监听没涨图片是否加载完成，只要有一张图片加载完成，就执行refresh!!!!
2如何监听图片加载完成
js  img.onload=function(){}
vue @load图片加载完成

在GoodsListLitem.vue中 3-23行

但是又有一个问题！！！！
就是我们如何拿到scroll对象！！！！！goodsListItem是拿不到scroll,但是首页home.vue能拿到！！但是拿到了又如何和GoodsListLitem通信！！


1事件总线$bus

###刷新频繁防抖函数
我们现在Refresh刷新的太频繁了
我们之前有个需求，在taobao搜索框搜索一个a,他会像服务器发送搜索a的数据，但是他不是想搜索a,而是想搜索
axxx一个单词，如果这个人写字慢,a-x,x-x-x那么对于服务器来说，写一个提交一下服务器，写一个提交一下服务器，对服务器压力太大了！！！！-----这个时候有一个专业词语叫防抖，有一个防抖函数。
原理：就是一个拥有输入一个单词或者字母的话，我们等他一个100ms或者几十ms!!!!
而项目中：我们一次要刷新10次那么我们不是每次都要刷新，而是等到加载完10次后在刷新！
//函数有防抖和节流！！！
防抖debounce/节流throttle


###自己实现吸顶
之前用css做吸顶，现在不起效果了
这种实际情况下也不会用css做吸顶
  .tab-control {
    /*//吸顶属性*/
    /*//必须设置top属性*/
    /*sticky到达top值后，自动position变成flex*/
    position: sticky;
    top: 44px
  }
吸顶思路：
当往上滚的时候我们要知道
![22.jgp](22.JPG)
就是滚动吸顶是否大于这段距离,大于改动布局flex
1获取到taboffsetTop
// 不能再create()拿tabControl
      //拿到tabControl对象
      //所有的组件都有一个属性$el,Vue 实例使用的根 DOM 元素。
      //但是我们这个offsettop如果上边的图片没有加载完，他的offsetTop是有变化的！！！所以我们思路是
      //监听轮播图是否加载完，然后在计算offsetTop
      this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
      console.log(this.tabOffsetTop);

2监听滚动的位置和offsetTop做对比
contentScroll()之前做backTop时候已经做了
/监听位置postition,这个方法为了做topBack的隐藏和消失
      // 因为你要什么时候隐藏和消失，必须得知道位置
      contentScroll(postion) {
        // 这个是有scroll传入给home父组件的
        //如果postion大于1000，显示出来topBack
        this.isShow = (-postion.y) > 1000
        // 2TabControl是否吸顶,大于就应该吸顶，然后动态绑定class
        this.isTabFixed=(-postion.y)>this.tabOffsetTop

      },
<tab-control :titles="titles" class="tab-control" @tabClick="tabClick" ref="tabControl" :class="{fixed:isTabFixed}"/>

但是这样做还是不能完成吸顶的效果，因为better-scroll---只要把要Fixed的东西放入better-scroll中，我们better-scroll的滚动是用transform的translate来进行偏移
4.position: fixed失效！
bscroll的滚动是用transform的translate来进行偏移，但是父元素设置了transform，所有子元素的position: fixed都不再相对于视口，而是相对于这个transform父元素！这不是什么bug，而是规范中规定。一直以为fixed定位霸道至极，没想到transform可以改变它的定位，学到了。

官方解除就是不要把要fixed的元素放入bscroll中
这样的话，bscroll容器内的fixed定位元素就全乱套了。
Google了一番，除了把fixed元素放出来，没有什么好办法。有的人也说了：如果一个元素是fixed定位，它就不应该被其他元素包裹，直接放到根元素下。

总结：在用better-scroll中，顶部要fixed导航的导航栏可以不用设置fixed属性，他自动fixed.
我们取消了homenav的fixed布局，照样适用fixed
.home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*固定上班购物街*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
    /*//固定上班购物街*/
  }

当better-scroll中有fixed属性，当better-scroll用了transform(肯定用了，偏移本质就是transform),那么better-scroll中的fixed他的父元素已经不是better-scroll了，而是bscroll的父元素，此时我们的父元素是home,他就会跑到顶部被遮盖

###解决方法
/*解决在better-scroll里边吸顶有问题的方法，就是把Tabcontrol从better-scroll再拿出来一个*/

  .tabControlTop{
    /*用相对定位他还会保持原来的位置*/
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  
 <tab-control :titles="titles" class="tabControlTop" @tabClick="tabClick" ref="tabControl" v-show="isTabFixed"/>
###用keep-alive保持状态
当你点击其他栏目的时候，在点击hone的位不变
<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <main-tab-bar/>

  </div>
</template>

bug:加了以后，会保持到原来的状态，但是再滑动home的页面，再点击其他栏目，再点击home,又重新刷新了！！！
解决思路：
离开时，保持一个位置信息savey
进来时，将位置设置为原来的savey信息就可以了
如何监听离开和活跃呢?vue周期函数
//活跃
activeated(){
  y值是付的一定是付的记住！！！！！
},
//离开
deactivated(){

}

####当点击首页单品的时候跳转到详情页
1跳转的时候如果跳转
this.$router.push()
2跳转的时候带id
  1动态路由 /xxx/:id
####做轮播图，这个要并且排除keep-alive中不需要缓存的组件
exclude="detail"

<keep-alive exclude="detail">
      <router-view/>
</keep-alive>

####数据整合
比如我们要整合详细页面，但是详情页面数据非常复杂，而切绝对都不是一板一眼的！！！需要自己整合数据，我们要像java一样写一个类，这样封装一个类，然后传入我们该有的东西
detail.js中
/**
 * es6的写法简直跟java一样一样的
 */
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
####当详情页面的时候，把mainBar去掉
思路
position:relative;
z-index:999
backgroun-color:#fff
就可以了

####用better-scroll必须设置高度
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    /*//这里的父类元素是detail---100vh就是100%的视口高度*/
    height: 100vh;
  }

  .content{
    /*100%的高度都是相对于父类元素的*/
    height: calc(100% - 93px);
  }
  
  .nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  
 这里给了思路当吸顶的时候，他是透明的，可以把nav设置成relative然后z-index,这个时候他是透明的，然后设置bgc就可以了
 
 ###如何监听图片加载完了，才调用函数
 思路
 我们可以设置一个计数器，当计数器==图片的长度的时候再执行
 ![3.jpg](3.JPG)
 
####如果将一个时间戳转成时间格式化字符串
unix时间元年为起点，返回对应的时间戳
时间戳:1535694719

思路:
1将时间戳转成Date对象
const date=new Date(1535694719)
2将Date进行格式化，转成对应的字符串
*date.getYear()+date.getMonth()+1---->FormatString(太常用)
直接copy网上

####给goodsListLitem改造
方法一
用路由的方式

        // 这里GoodsListLitem被两个东西用到了一个home一个Detail，那么就有一个问题
        // 当我们图片加载完了我们betterscroll是要刷新的！不刷新的是不行的！！！
        // 所以我们这里用的事件总线来发送全局监听事件的，那么我们这里只给home发了，并没有给Detail发！


//   给home发
        if(this.$route.path.indexOf("/home")){
          this.$bus.$emit("itemImageLoad")
        }else{
          this.$bus.$emit("detailItemImgLoad")
        }
方法二
思路就是当我们离开Home.vue的时候，我们不是不需要这个GoodsListLitem发送的事件总线的，所以可以在home.vue中取消发送的这个事件总线

this.$bus.$off("itemImgLoad,函数)



//对监听的事件进行保存
      this.ItemImgListener=() => {

        refresh()

      }


this.$bus.$off("itemImgLoad,ItemImgListener)


####当页面没有加入keep-alive缓存，那么他离开页面的时候不会调用deactivated,反而离开会调用destroyed
https://cn.vuejs.org/v2/api/#keep-alive

在 2.2.0 及其更高版本中，activated 和 deactivated 将会在 <keep-alive> 树内的所有嵌套组件中触发。

####混入mixins解决代码复用的重要手段，其实跟继承一样！！！！

###解决详情页滚动的时候突然不能滚动的情况！！！

就是跟home.vue中的一样，当我们向下拉的时候，有的时候突然拉不下去，但是过一会儿又能拉了
原因：是因为betterscroll高度----于下拉的高度不一致，比如betterscroll高度是100
现在高度是1500,这个时候重新计算高度，怎么计算高度呢，就是重新让betterscroll刷新，在图片加载的时候刷新

this.$refs.scroll.refresh()


但是加载完一张照片，就要刷新一次，频率有点高哦。就要加入防抖哦

####对应联动效果(一般拿offsetTop只要值不对，100%是图片加载没完成！！！所以一般都在图片加载完成后拿到offsetTop)
1点击标题滚动到指定位置(关键是得到offsetTop 在图片加载完后得到)
![1.jpg](1.jpg)

如何做防抖（只会执行一次）
1就是在props:中设置一个值为null
data(){
  return {
     //做防抖函数用
            getThemeTopY: null
  }
}

2在create函数中初始化
created(){

     // 4做防抖函数给getTopy赋值
          this.getThemeTopY = debounce(() => {
            this.themeTopYs = []
            this.themeTopYs.push(0),
              this.themeTopYs.push(this.$refs.detailParams.$el.offsetTop),
              this.themeTopYs.push(this.$refs.detailComment.$el.offsetTop),
              this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop)
            console.log(this.themeTopYs)
          })

}


3调用函数
        this.getThemeTopY()


2滚动内容显示对应标题(监听滚动)
如何监听滚动我们这里用的是betterscroll


