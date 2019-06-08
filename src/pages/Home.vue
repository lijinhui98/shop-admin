<template>
  <div>
    <el-container class="box">
      <!-- 侧边栏 -->
      <Menu :isShow='isShow'></Menu>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <Header @click="handleIsShow"></Header>
        </el-header>
        <!-- 内容 -->
        <el-main>
          <Mianbao></Mianbao>
          admin
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Header from "../components/Header.vue";
  import Mianbao from "../components/Mianbao.vue";
  import Menu from "../components/Menu.vue";
  export default {
    components: {
      Header,
      Mianbao,
      Menu
    },
    data() {
      return {
        isShow:false
      };
    },
    methods: {
      handleIsShow(){
        this.isShow = !this.isShow
      }
    }
  };
</script>

<style>
</style>