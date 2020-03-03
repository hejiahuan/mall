import Vue from "vue"
import VueRouter from "vue-router"


//安装插件
Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail =()=>import(`views/detail/detail`)

const routes = [

  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    //传递参数有2种
    // 1动态路由:id
    // 2push（query）
    path:`/detail/:id`,
    component:Detail
  }


]

const router = new VueRouter({
  routes,
  mode:"history"

})

export default router

