<template>
  <el-aside width="auto">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isShow"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>购物商城</span>
        </template>
        <el-menu-item index="1-1">
          <template slot="title">
            <router-link to="/home/goods-list">商品管理</router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="1-2">
          <template slot="title">
            <router-link to="#">栏目管理</router-link>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    props: ["isShow"]
  };
</script>

<style>
  .el-menu {
    border-right: none !important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
  }
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
  }

  .box {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
     .el-menu-vertical-demo a{
       display: block;
        width: 200px;
        height: 100%;
        color:inherit;
        text-decoration: none;
    }
</style>
