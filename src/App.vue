<template>
  <div>
    <p>
      <router-view></router-view>
    </p>
  </div>
</template>

<!-- 引入组件库 -->

<script>
  // import axios from "axios";
  export default {
    mounted() {
      // axios({
      //   url: "https://api.github.com/users",
      //   method: "GET",
      //   params:{
      //     abc:6666
      //   }
      // }).then(res => {
      //   console.log(res);
      // });

    }
  };
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
ul,li,ol{
  list-style: none;
}
</style>
