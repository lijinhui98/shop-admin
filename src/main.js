import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import Goodslist from './pages/Goodslist.vue'
import GoodsAdd from './pages/GoodsAdd.vue'
import GoodsEdit from './pages/GoodsEdit.vue'
import Category from './pages/CategoryList.vue'

// 1 引入element-ui
import ElementUI from 'element-ui'
// 引入element样式
import 'element-ui/lib/theme-chalk/index.css'
// 2 注册组件
Vue.use(ElementUI)
Vue.use(VueRouter)

// 配置路由
const routes = [
  {
    path: '/',
    redirect: '/home/goods-list'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [{
        path: 'goods-list',
        component: Goodslist,
        meta: "商品列表"
      },
      {
        path: 'goods-add',
        component: GoodsAdd,
        meta: "添加商品"
      },
      {
        path: "goods-edit/:id",
        component: GoodsEdit,
        meta: "编辑商品"
      },
      {
        path: 'category-list',
        component:Category
      },
    ]
  },
];

// 路由实例
const router = new VueRouter({
  routes
})
// 绑定到原型
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  // 挂载实例
  router
}).$mount('#app')