<template>
  <div class="user-list">
    <ToolBar>
      <el-button 
        type="primary" 
        icon="el-icon-plus" 
        size="small" 
      @click="addCategory(true)">添加

      </el-button>
      <div style="float: right">
        <el-input
            placeholder="搜索用户"
            size="small"
            style="width: 140px"
            v-model="params.name"
            clearable>
        </el-input>
        <el-button type="success" icon="el-icon-search" size="small"></el-button>
      </div>
    </ToolBar>
    <el-table
        :data="usersData"
        border
        style="width: 100%">
      <el-table-column
          prop="loginname"
          label="成果名称">
      </el-table-column>
      <el-table-column
          prop="nickname"
          label="类型">
      </el-table-column>
      <el-table-column
          prop="email"
          label="科研项目">
      </el-table-column>
      <el-table-column
          prop="cellphone"
          label="取得时间">
      </el-table-column>
      <el-table-column
          prop="result"
          label="排名">
        <div slot-scope="scope" style="width: 100%;text-align: center">{{ 

scope.row.result ?
          $Config.tizhiCategories[scope.row.result]:'2' }}
        </div>
      </el-table-column>
      <el-table-column
          prop="sex"
          width="66"
          label="贡献者">
        <div slot-scope="scope" style="width: 100%;text-align: center">{{ 

$Config.sex[scope.row.sex] }}</div>
      </el-table-column>
      <el-table-column
          prop="active"
          width="100"
          label="所属研究室">
        <div slot-scope="scope" style="width: 100%;text-align: center">
          <el-tag v-if="scope.row.active">机器人实验室</el-tag>
          <el-tag v-else type="danger">信息复杂度实验室</el-tag>
        </div>
      </el-table-column>
      <el-table-column
          label="操作"
          width="180">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="重置密码123456" 

placement="top">
            <el-button style="transition: .4s;" type="warning" :ref="scope.row.id" 

@click="resetting(scope.row.id)"
                       icon="el-icon-refresh" size="small" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑用户" 

placement="top">
            <el-button @click="addCategory(scope.row)" type="primary" icon="el-

icon-edit" size="small" circle></el-button>
          </el-tooltip>
          <el-button @click="editPost(scope.row)" type="text" size="small">编辑

</el-button>
          <el-button style="color: #a00" @click="deletePost(scope.row.id)" 

type="text" size="small">删除</el-button>
          <el-tooltip class="item" v-if="scope.row.active != '0'" effect="dark" 

content="删除用户" placement="top">
            <el-button @click="deleteUser(scope.row.id)" type="danger" icon="el-

icon-delete" circle
                       size="small"></el-button>
          </el-tooltip>
          <el-tooltip class="item" v-else effect="dark" content="恢复用户" 

placement="top">
            <el-button @click="deleteUser(scope.row.id)" icon="el-icon-check" 

circle size="small"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import ToolBar from '~/components/ToolBar/ToolBar.vue';


  export default {
    data() {
      return {
        params: {
          name: '',
        },
        usersData: [
          {id:1,loginname:'迁移学习文本翻译',nickname:'人工智能/国家级',email:'基于GC_GAN的迁移学习研究',cellphone:'2018.06.23',sex:'2',active:1},
          {id:1,loginname:'迁移学习文本翻译',nickname:'人工智能/国家级',email:'基于GC_GAN的迁移学习研究',cellphone:'2018.06.23',sex:'1',active:1},
        ]
      }
    },
    methods: {
      deleteCategory(id){
        let self = this;
        self.$confirm('此操作将删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            //========================================
            self.$notify({
              title: '成功',
              message: '请参照下面代码完成Api对接！',
              type: 'success'
            });
            self.dialogFormVisible = false;
            //========================================删除这坨
           self.$Api.departDelete({id:id},r=>{
             self.$notify({
               title: '成功',
               message: '部门删除成功！',
               type: 'success'
             });
             self.init();
           });
        }).catch(() => {

        });

      },
      addCategory(data){

        let self = this;
        self.dialogFormVisible = true;
        self.currentEditCategory = null;
        if(!data) {

          self.categoryEditTitle = '添加顶级分类';
        } 
        else {
          self.currentEditCategory = {};
          self.currentEditCategory.pid = data.id;//添加子部门，把当前部门id作为新增

部门pid
          self.categoryEditTitle = '添加“'+data.name+'”的子分类';
        }

      },
      editCategory(data){
        let self = this;
        self.dialogFormVisible = true;
        self.currentEditCategory = data;
        self.categoryEditTitle = '修改“'+data.name+'”分类';
      },

      categoryEditChange(data){
        let self = this;
        //========================================
        self.$notify({
          title: '成功',
          message: '请参照下面内容完成对接！',
          type: 'success'
        });
        self.dialogFormVisible = false;
         self.$Api.departEdit({data:data},r=>{
         self.$message.success(self.departEditTitle+'成功！');
           self.init();
           self.dialogFormVisible = false;
         });

      },
      handleNodeClick(data,k) {

      },
      renderContent(h, { node, data, store }) {
        return this.$createElement('TreeDetails',{props: {data:node},on:{
            'add-category': this.addCategory,
            'edit-category':this.editCategory,
            'delete-category':this.deleteCategory,
          }});
      },
      init(){
        let self = this;
        // self.$Api.departList({}, r => {
        //   self.data = self.$Func.departTree(r);
        // });
      },
      editUser(data) 
      {
        let self = this;
        self.dialogFormVisible = true;
        self.currentEditCategory = null;
        if(!data) {

          self.categoryEditTitle = '添加顶级分类';
        } 
        else {
          self.currentEditCategory = {};
          self.currentEditCategory.pid = data.id;//添加子部门，把当前部门id作为新增

部门pid
          self.categoryEditTitle = '添加“'+data.name+'”的子分类';
        }
      },
      UploadUser(data) {

      },
      deleteUser(id) {

          this.$message({
            message: '这里请求api删除或者恢复用户之后刷新分页组件，列表自动更新',
            type: 'success'
          });

      },
      resetting(id) {

      let dom = this.$refs[id].$el;
      dom.style.transform = 'rotate(180deg)';
      setTimeout(()=>{dom.style.transform = 'rotate(0deg)'},600)
      this.$message({
        message: '已经成功重置密码',
        type: 'success'
      });

      },


    },
    components: {
      ToolBar
    }
  }
</script>
<style lang="less">

</style>
