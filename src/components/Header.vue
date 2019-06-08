<template>
        <el-row type="flex" justify="space-between">
            <div @click='handleIsShow'>
                <i class="el-icon-back" :label="true" style="font-size:30px;line-height: 56px !important;"></i>
            </div>
            <div>
                退出
            </div>
        </el-row>

</template>

<script>
export default {
   methods:{
       handleIsShow(){
           this.$emit('click')
       }
   }
}
</script>

<style>
.el-header{
    height: 56px !important;
}
.el-icon-back{
    cursor: pointer;
}
</style>
