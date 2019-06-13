<template>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in info" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    data() {
      return {
        info: []
      };
    },
    methods: {
      getRoute() {
        const arr = this.$route.matched;
        let info = [];
        arr.forEach(v => {
          info.push(v.meta);
        });
        this.info = info
      }
    },
        // 获取meta信息
    watch: {
        $route(){
            this.getRoute();
        }
    },

    mounted() {
      // 组件加载完成后获取meta信息
      this.getRoute();
    }
  };
</script>

<style>
</style>
