<template>
  <div id="container">
    <el-form ref="form" label-width="120px" >
      <el-form-item label="Username">
        <el-input v-model="form.Username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.Password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Subdomain">
        <el-input v-model="form.Subdomain"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="admin">Sign</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "admin",
    data(){
      return {
        // the info user fill in
        form: {
          Username : "",
          Password : "",
          Subdomain: ""
        },
        tickets: []
      }
    },
    methods:{
      admin(){
        //1. First check, check if there is empty input
        if(this.form.Username == "" || this.form.Password == "" || this.form.Subdomain == "") {
          alert("Please fill in complete information!")
        } else {
          // 2. Second check, check the Username, Password and Subdomain
          //    if it is true, turn to ticketViewer page.
          //    else, turn to error page
          this.axios.get('http://localhost:8081/tickets/' + this.form.Subdomain,{
            auth: {
              // Pass the password and username in the request
              username: this.form.Username,
              password: this.form.Password
            },
          }).then(function (res) {
            // Request successfully
            this.tickets = res.data;
            // Get to another web page ticketViewer, and pass all the tickets we get
            this.$router.push({name:"ticketViewer", params: {tickets: this.tickets}});
          }.bind(this))
            .catch(function (err) {
              // Request fail, make an alert to user and turn to error page
              alert("Please fill in right information!")
              this.$router.push({name:"error"});
              if (err.response){
                console.log(err.response)
              }
            }.bind(this))
        }
      }
    }
  }
</script>

<style scoped>
  #container{
    width: 600px;
    height: 1500px;
    margin: 200px auto;
  }
</style>

