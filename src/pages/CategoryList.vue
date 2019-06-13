<template>
  <div class="custom-tree-container">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="title">{{ data.title }}</span>
        <span>
          <input type="text" :value="data.sort_id" class="size" @blur="handleBlur($event,data)">
        </span>
        <span>
          <el-button type="text" size="mini" @click="() => append(data)">编辑</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>


<script>
  let id = 1000;
  export default {
    data() {
      const data = [];
      return {
        data: JSON.parse(JSON.stringify(data))
      };
    },

    methods: {
      goodslist() {
        this.$axios({
          url: "http://localhost:8899/admin/category/getlist/goods",
          method: "GET"
        }).then(res => {
          const { message, status } = res.data;
          this.data = message;
          console.log(this.data);
        });
      },
      append(data) {
        const newChild = { id: id++, label: "testtest", children: [] };
        if (!data.children) {
          this.$set(data, "children", []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.append(data)}
              >
                Append
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                Delete
              </el-button>
            </span>
          </span>
        );
      },
      handleBlur(e, data) {
        console.log(data);
        if (data.sort_id == event.target.value) {
          return;
        }
        var res = window.confirm("是否确认编辑？");
        this.$axios({
          url: "http://localhost:8899/admin/category/edit/" + data.category_id,
          method: "POST",
          data: {
            ...data,

            sort_id: event.target.value
          },
          withCredentials: true
        }).then(res => {
          this.goodslist();
          this.$message.success("修改成功");
        });
      }
    },
    mounted() {
      this.goodslist();
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .size {
    width: 50px;
    text-align: center;
    border-radius: 3px;
  }
  .title {
    width: 100px;
  }
</style>