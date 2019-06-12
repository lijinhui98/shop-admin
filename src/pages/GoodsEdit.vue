<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属类型" style="color:#000">
      <el-select v-model="form.category_id" placeholder="请选择活动区域">
        <el-option
          v-for="(item,index) in categorys"
          :key="index"
          :label="item.title"
          :value="item.category_id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
    </el-form-item>

    <el-form-item label="推荐类型">
      <el-checkbox label="置顶" title="type" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" title="type" v-model="form.is_hot"></el-checkbox>
    </el-form-item>

    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <el-form-item label="封面图片">
      <!-- 上传组件 -->
      <!-- action：上传地址 -->
      <!-- show-file-list：是否支持多选 -->
      <!-- on-success: 上传成功之后的回调函数 -->
      <!-- before-upload：上传之前执行的函数 -->
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <!-- 图片预览 -->
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <!-- 加号图标 -->
        <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height:6"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
      <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>

    <!-- 多张图片的上传 -->
    <el-form-item label="图片相册">
      <!-- list-type: 声明当前图片相册的方式显示 -->
      <!-- on-preview：预览的事件处理函数 -->
      <!-- on-remove：删除图片时候触发的事件 -->
      <el-upload
        action="http://localhost:8899/admin/article/uploadimg"
        list-type="picture-card"
        :on-success="handleCartSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="form.fileList"
      >
        <i class="el-icon-plus"></i>
      </el-upload>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </el-form-item>

    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao" style="resize:vertical;"></el-input>
    </el-form-item>

    <el-form-item label="内容描述">
      <quillEditor v-model="form.content"></quillEditor>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import "quill/dist/quill.core.css";
  import "quill/dist/quill.snow.css";
  import "quill/dist/quill.bubble.css";
  import { quillEditor } from "vue-quill-editor";
  export default {
    data() {
      return {
        form: {
          title: "",
          sub_title: "",
          goods_no: "",
          stock_quantity: "",
          category_id: "",
          market_price: "",
          sell_price: "",
          status: false,
          is_slide: false,
          is_top: false,
          is_hot: false,
          zhaiyao: "",
          type: [],
          imgList: [],
          desc: "",
          fileList: [],
          content: ""
        },
        categorys: [],
        imageUrl: "",
        dialogImageUrl: "",
        dialogVisible: false
      };
    },
    components: {
      quillEditor
    },
    methods: {
      handleAvatarSuccess(res, file) {
        // 设置图片地址
        this.imageUrl = URL.createObjectURL(file.raw);

        // 把上传成功的结果赋值给form.imgList
        this.form.imgList = [res];
      },

      // upload：上传之前执行的函数
      beforeAvatarUpload(file) {
        // 判断图片的大小有没大于2m
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }

        // 如果返回false不会上传
        return isLt2M;
      },
      // 多张图片删除的事件
      handleRemove(file, fileList) {
        const files = fileList.map(v => {
          return v.response;
        });

        this.form.fileList = files;
      },

      // 图片的预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      // 上传多张图片的成功的回调
      handleCartSuccess(res, file, fileList) {
        this.form.fileList.push(res);
      },
      onSubmit() {
        this.$axios({
          url: "http://localhost:8899/admin/goods/edit/" + this.$route.params.id,
          method: "POST",
          data: this.form,
          withCredentials: true
        }).then(res => {
          console.log(this.form);
          const { message, status } = res.data;
          if (status == 0) {
            this.$message.success(message);
            this.$router.back();
          } else {
            // 跳转到登录页
            this.$router.push("/login");
          }
        });
      }
    },
    mounted() {
      this.$axios({
        url: "http://localhost:8899/admin/category/getlist/goods",
        method: "GET"
      }).then(res => {
        const { message, status } = res.data;
        this.categorys = message;
      });
      const { id } = this.$route.params;

      this.$axios({
        url: "http://localhost:8899/admin/goods/getgoodsmodel/" + id,
        method: "GET"
      }).then(res => {
        console.log(res.data);
        const { status, message } = res.data;
        // console.log(message.fileList);
        const fileList = message.fileList.map(v => {
          console.log(v);
          return {
            ...v,
            url: "http://127.0.0.1:8899" + v.shorturl
          };
        });
        // console.log(fileList);
        // 对象合并
        this.form = {
          ...message,
          // category_id转化为数字
          category_id: +message.category_id,
          fileList
        };

        //  imageUrl封面的预览
        this.imageUrl = message.imgList[0].url;
      });
    }
  };
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>