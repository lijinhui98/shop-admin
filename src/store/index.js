// 导入vuex
import Vuex from "vuex";
import Vue from "vue";

// 注册插件
Vue.use(Vuex)

// 调用vuex创建一个仓库
const store = new Vuex.Store({
    // 数据位置
    state: {
        user: JSON.parse(localStorage.getItem("user"))  || {}
    },
    // 设置仓库数据的方法
    mutations: {
        setUser(state, data) {
            state.user = data
            localStorage.setItem('user',JSON.stringify(data))
        }
        
    }
})
// 暴露出去
export default store