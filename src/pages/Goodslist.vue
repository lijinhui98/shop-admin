<template>
  <div>
    <!-- 搜索框 -->
    <div class="search-box">
      <el-row type="flex" justify="space-between">
        <!-- 左侧按钮 -->
        <div>
          <el-button>新增</el-button>
          <el-button type="danger" @click="handleDelectMore">删除</el-button>
        </div>
        <!-- 右侧搜索框 -->
        <div>
          <el-input placeholder="请输入内容" class="input-with-select" v-model="searchValue">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>
      </el-row>
    </div>
    <!-- 列表 -->
    <div class="list">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品" width="300">
          <template slot-scope="scope">
            <el-row type="flex" align="middle">
              <img :src="scope.row.imgurl" class="goods-img">
              <div>{{scope.row.title}}</div>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="categoryname" label="类型" width="120"></el-table-column>
        <el-table-column prop="sell_price" label="价格" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<style>
  .page {
    margin-top: 20px;
  }
  .goods-img {
    width: 60px;
    height: 60px;
    /*表示元素压缩的倍数，如果是0，表示不会被挤压*/
    flex-shrink: 0;
    margin-right: 5px;
  }
  .input-search {
    width: 200px;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .search-box {
    margin-bottom: 20px;
  }
</style>
<script>
  export default {
    data() {
      return {
        tableData: [],
        pageIndex: 1,
        pageSize: 5,
        searchValue: ""
      };
    },
    methods: {
      // 商品封装
      getList() {
        // pageIndex: 当前的页面，会变化
        // pageSize：数据条数，会变化
        // searchValue：搜索关键字
        this.$axios({
          url: `http://localhost:8899/admin/goods/getlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`,
          method: "GET"
        }).then(res => {
          const data = res.data;
          // 商品列表的数据
          this.tableData = data.message;
          // 总条数
          this.total = data.totalcount;
        });
      },
      // 删除封装
      getDel(id) {
        // 调用删除商品的接口
        this.$axios({
          url: `http://localhost:8899/admin/goods/del/${id}`,
          method: "GET"
        }).then(res => {
          const { message, status } = res.data;
          // 删除成功
          if (status === 0) {
            this.$message.success(message);
            // 请求商品列表数据
            this.getList();
          } else {
            this.$message.error(message);
          }
        });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.selectGoods = val;
      },
      // 条数的切换
      handleSizeChange(val) {
        // 保存当前的条数
        this.pageSize = val;
        // 重新发起请求
        this.getList();
      },

      // 页数切换
      handleCurrentChange(val) {
        // 保存当前的页面
        this.pageIndex = val;
        // 重新发起请求
        this.getList();
      },
      handleDelectMore() {
        const arr = this.selectGoods.map(v => {
          return v.id;
        });
        const ids = arr.join(",");
        this.getDel(ids);
      },
      // 删除商品
      handleDelete(goods) {
        // 获取到商品的id
        const id = goods.id;
        this.getDel(id);
      },
      // 处理搜索
      handleSearch() {
        // 发起请求 ，赋值searchValue
        this.getList();
      }
    },
    mounted() {
      this.getList();
    }
  };
</script>