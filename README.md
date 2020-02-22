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
