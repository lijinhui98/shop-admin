<template>
        <el-row type="flex" justify="space-between">
            <div @click='handleIsShow'>
                <i class="el-icon-back" :label="true" style="font-size:30px;line-height: 56px !important;"></i>
            </div>
            <div>
                <span>{{user.uname}}</span>
                <span>{{user.realname}}</span>
                <span @click="handleQuit"  style="cursor: pointer">退出</span>
            </div>
        </el-row>

</template>

<script>
export default {
    data(){
        return{
            user:{

            }
        }
    },
   methods:{
       handleIsShow(){
           this.$emit('click')
       },
       handleQuit(){
           this.$axios({
               url:'http://localhost:8899/admin/account/logout',
               method:'GET',
                withCredentials: true
           }).then(res =>{
               const {status,message} = res.data
               if(status == 0){
                   this.$message.success(message)
                   localStorage.removeItem('user')
                   this.$router.push('/login')
               }
           })
       }
   },
   mounted(){
       this.user = this.$store.state.user
   },
}
</script>

<style scoped>
.el-header{
    height: 56px !important;
}
.el-icon-back{
    cursor: pointer;
}
span{
    margin-right: 10px;
    
}
</style>
