<template>
  <div>
    <el-alert type="info" show-icon title="Oh noes, something went wrong!" :closable="false" ></el-alert>
    <el-alert type="error" show-icon title="Error: Couldn't authenticate you" :closable="false"></el-alert>
    <!--  click button to get back to admin page   -->
    <el-button
      size="mini" @click="getBackToSign()">Bact to Sign
    </el-button>
  </div>
</template>

<script>
  export default {
    name: "error",
    data(){
      return {

      }
    },
    methods:{
      getBackToSign() {
        // click button to get back to admin page
        this.$router.push({name:"admin"});
      }
    }
  }
</script>

<style scoped>

</style>
