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

##如果确定中间高度
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
