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
