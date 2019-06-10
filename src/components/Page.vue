<template>
  <div class="page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
  export default {
 data() {
      return {
           tableData: [{
            id: 103,        
            title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
            is_top: 1,
            is_hot: 1,
            is_slide: 1,      
            categoryname: "男装",
            img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
            imgurl:"http://127.0.0.1:8899/upload/201504/20/thumb_201504200214471783.jpg",
            goods_no: "NZ0000000002",
            stock_quantity: 200,
            market_price: 1000,
            sell_price: 800 
        }],
         pageIndex: 1
      };
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  };
</script>

<style>
.page{
    margin-top: 20px;
}
</style>
