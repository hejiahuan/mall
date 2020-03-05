//导入防抖函数
import {debounce} from "components/common/utils"


// 这里做了混入的解决代码复用
export const ItemListenMixins={
  data(){
    return{
      ItemImgListener:null
    }
  },
  mounted(){
    //防抖动函数
    const newrefresh = debounce(this.$refs.scroll.refresh, 500)
    //这里用了第二种方法来监听GoodsListItem图片加载完了，然后发送给Detail让他来刷新
    this.ItemImgListener=()=>{
      newrefresh()
    }

    this.$bus.$on("itemImageLoad", this.ItemImgListener)

    console.log("我是混入mix解决代码复用的Vue高级知识，跟继承很像啊哈哈哈哈");
  }
}
