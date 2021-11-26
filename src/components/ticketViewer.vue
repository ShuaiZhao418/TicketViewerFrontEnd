<template>
  <div id="container">
    <el-table
      :data="tickets.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      border highlight-current-row
      tooltip-effect="dark"
      style="width: 100%"
      @current-change="selectTr"
      @sort-change="sort_change">
      <el-table-column
        sortable="custom"
        prop="status"
        label="status"
        width="130">
      </el-table-column>
      <el-table-column
        prop="subject"
        label="Subject"
        width="300">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="requester_id"
        label="Requester"
        width="130">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="created_at"
        label="Time"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="Type"
        width="100">
      </el-table-column>
      <el-table-column
        prop="priority"
        label="Priority"
        width="100">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="showAdd(scope.$index, scope.row)">Details
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :total="total"
        :page-sizes="[25]"
        :page-size = "pagesize"
        @current-change="current_change">
      </el-pagination>
    </div>
    <el-dialog
      title="Ticket Detail"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-form ref="ticket" :model="ticket" label-width="90px" style="text-align: left">
        <el-form-item label="Requester">
          <el-input v-model="ticket.requester_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="Assignee">
          <el-input v-model="ticket.assignee_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="Tags" >
          <el-input v-model="ticket.tags" disabled></el-input>
        </el-form-item>
        <el-form-item label="Subject">
          <el-input v-model="ticket.subject" disabled></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input
            disabled
            type="textarea"
            :rows="3"
            v-model="ticket.description"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ticketViewer",
    data(){
      return {
        // To control the visibility of detail dialogs
        dialogVisible:false,
        // To count and show the pagination
        total: 0,
        pagesize: 25,
        currentPage: 1,
        proptype:"",
        // a ticket model for showing
        ticket: {
          "created_at": "",
          "updated_at": "",
          "type": "",
          "subject": "",
          "description": "",
          "priority": "",
          "status": "",
          "requester_id": "",
          "assignee_id": "",
          "tags":[],
        },
        // array of tickets for showing
        tickets: [],
      }
    },
    methods:{
      // function for showing the dialog
      showAdd(){
        this.dialogVisible = true;
      },
      // functions for sorting the data based on certain attribute
      sort_change(column) {
        this.currentPage = 1;
        this.proptype = column.prop;

        if (this.proptype == "created_at") {
          this.tickets.sort(this.my_sortTime);
        } else if (this.proptype == "status") {
          this.tickets.sort(this.my_sortStatus);
        } else if (this.proptype == "requester_id") {
          this.tickets.sort(this.my_sortRequester);
        }
      },
      my_sortRequester(a, b) {
        return b[this.proptype] - a[this.proptype];
      },
      my_sortStatus(a, b) {
        return a[this.proptype].localeCompare(b[this.proptype]);
      },
      my_sortTime(a, b) {
        return Date.parse(b[this.proptype]) - Date.parse(a[this.proptype]);
      },
      // Pass the ticket information of current row to ticket model, to show it in the dialog
      selectTr(obj){
        this.ticket.status = obj.status;
        this.ticket.subject = obj.subject;
        this.ticket.requester_id = obj.requester_id;
        this.ticket.created_at = obj.created_at;
        this.ticket.type = obj.type;
        this.ticket.priority = obj.priority;
        this.ticket.assignee_id = obj.assignee_id;
        this.ticket.description = obj.description;
        this.ticket.tags = obj.tags;
      },
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
    },
    // Do some operations at the begin of showing this website page
    created(){
      this.tickets = this.$route.params.tickets;
      this.total = this.$route.params.tickets.length;
    }
  }
</script>

<style scoped>
  #container{
    width: 1200px;
    height: 900px;
    margin: 0px auto;
  }
</style>
