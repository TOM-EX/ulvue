<template>
  <div class="main_margin">
    <el-row>
      <el-col :span="3">
        <div class="left_tree">
          <el-tree
            id="tree"
            :data="manager_data"
            :props="defaultProps"
            node-key="RUID"
            :default-expanded-keys="sider_default_list"
            @node-click="handleNodeClick"
            @node-expand="handleNodeExpand"
            @node-collapse="handleNodeCollapse"
          >
            <span slot-scope="{ node }" class="span-ellipsis">
              <span :title="node.label">{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="1">
        <div style="border: rgb(240, 242, 245) 1px solid" />
      </el-col>
      <el-col :span="18">
        <el-row class="btn_row">
          <el-col :span="16">
            <div style="border: rgb(240, 242, 245) 1px solid" />
          </el-col>
          <el-col :span="2">
            <el-button type="primary" style="" @click="showinsertCategory()">新增</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="showupdateCategory(scope.$index, scope.row)">批量显示</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="showupdateCategory(scope.$index, scope.row)">批量隐藏</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="showupdateCategory(scope.$index, scope.row)">批量删除</el-button>
          </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="tableData" border style="width: 100%">
          <el-table-column type="selection" width="100" />
          <el-table-column prop="name" label="菜单名称" width="200" />
          <el-table-column prop="path" label="路径" width="200">
            <!-- :formatter="stateFormatType" -->
          </el-table-column>
          <el-table-column prop="reloginpage" label="重定向页面" width="200">
            <!-- :formatter="stateFormatOpenWay" -->
          </el-table-column>
          <el-table-column prop="alwaysshow" label="根目录显示/隐藏" width="200" :formatter="stateFormatDisplay" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="showupdateCategory(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="hideMenu(scope.$index, scope.row)">隐藏</el-button>
              <el-button type="danger" size="small" @click="delClick(scope.index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="2" />
    </el-row>

    <!-- 路由设置 -->
    <el-dialog
      title="路由设置"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="上级菜单" :label-width="formLabelWidth" prop="parentid">
          <SelectTree
            :props="props"
            :options="optionData"
            :value="form.parentid"
            :clearable="isClearable"
            :accordion="isAccordion"
            style="width: 100%"
            @getValue="getValue($event)"
          />
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="路径" :label-width="formLabelWidth" prop="path">
          <el-input v-model.number="form.path" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="组件" :label-width="formLabelWidth" prop="component">
          <el-input v-model.number="form.component" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="重定向页面" :label-width="formLabelWidth">
          <!-- prop="redirect" -->
          <el-input v-model.number="form.redirect" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="无权限跳转页面" :label-width="formLabelWidth" prop="reloginpage">
          <el-input v-model.number="form.reloginpage" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="唯一标识" :label-width="formLabelWidth" prop="uniflag">
          <el-input v-model="form.uniflag" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item
          label="菜单类型"
          :label-width="formLabelWidth"
          prop="menu_type"
        >
          <el-select v-model="menu_type" placeholder="请选择">
            <el-option
              v-for="item in menu_type_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="图标类型" :label-width="formLabelWidth" prop="icontype">
          <el-select v-model="form.icontype" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in icon_type_list" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="图片图标" :label-width="formLabelWidth" prop="icon">
          <el-input v-model="form.icon" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item
          label="打开方式"
          :label-width="formLabelWidth"
          prop="target"
        >
          <el-select
            v-model="form.target"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in target_type_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="显示顺序" :label-width="formLabelWidth" prop="orderno">
          <el-input v-model.number="form.orderno" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="根目录显示" :label-width="formLabelWidth" prop="alwaysshow">
          <el-select v-model="form.alwaysshow" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in alwaysshow_list" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="无权限时" :label-width="formLabelWidth" prop="norightoperator">
          <el-select v-model="form.norightoperator" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in none_permission" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单权限" :label-width="formLabelWidth" prop="permission">
          <CheckSelectTree
            :props="props"
            :options="optionperData"
            :value="form.permission"
            :labelname="permissionnamelist"
            :clearable="isClearable"
            :accordion="isAccordion"
            style="width: 100%"
            @getCheckValue="getCheckValue($event)"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdateCategory">取 消</el-button>
        <el-button type="primary" @click="sureCategory">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 路由设置 -->

    <!-- 删除 -->
    <el-dialog
      title="信息"
      :visible.sync="deleteVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <span>确认是否删除当前分类？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel()">取 消</el-button>
        <el-button type="primary" @click="delMenu">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
  </div>
</template>

<script>
// import SelectTree from "../../components/treeSelect";
// import CheckSelectTree from "../../components/CheckTreeSelect";
// import { menulist, saveObject } from "../../api/admin";
import SelectTree from '@/views/user/components/treeSelect'
import CheckSelectTree from '@/views/user/components/CheckTreeSelect'
import { menulist, saveObject } from '@/api/user.js'

export default {
  name: 'Index',
  components: {
    SelectTree,
    CheckSelectTree
  },
  data() {
    return {
      treechecktable: '',
      defaultShowNodes: [],
      checkflag: true, // 判断树形选择框是否使用复选框
      formLabelWidth: '120px',
      insorup: false, // 判断是新增还是修改(true为新增,false为修改)
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      props: {
        // 配置项（必选）
        value: 'RUID',
        label: 'name',
        children: 'children'
      },
      permissionData: [],
      replaceFields: {
        key: 'RUID',
        value: 'RUID',
        title: 'name',
        children: 'childrens'
      },
      manager_data: [], // 树状图菜单
      sup_data: [], // 上级菜单
      permissions_data: [], // 菜单权限
      menu_type: 'separator', // value
      form: {
        path: '',
        reloginpage: '',
        component: '',
        redirect: '',
        parentid: '',
        alwaysshow: 'true',
        permission: [],
        RUID: '', // 在此页面用来获取上级RUID
        name: '',
        orderno: '',
        icontype: 'imgicon',
        norightoperator: 'hide',
        target: '',
        icon: '',
        uniflag: ''
      },
      permissionnamelist: [],
      alwaysshow_list: [{
        label: '一直显示',
        value: 'true'
      },
      {
        label: '不一直显示',
        value: 'false'
      }
      ],
      menu_type_list: [{
        label: '分隔条',
        value: 'separator'
      },
      {
        label: '站外链接',
        value: 'openurl'
      },
      {
        label: '站内链接',
        value: 'innerurl'
      },
      {
        label: '站内页面',
        value: 'openpage'
      },
      {
        label: '脚本',
        value: 'callscript'
      },
      {
        label: '文件',
        value: 'file'
      }
      ],
      target_type_list: [{
        label: '在当前页面打开',
        value: '_self'
      },
      {
        label: '新页面打开',
        value: '_blank'
      }
      ],
      icon_type_list: [{
        label: '图片图标',
        value: 'imgicon'
      },
      {
        label: '文字图标',
        value: 'texticon'
      }
      ],
      none_permission: [{
        label: '隐藏',
        value: 'hide'
      },
      {
        label: '变灰',
        value: 'gray'
      }
      ],
      tableData: [], // 右侧table数组
      dialogFormVisible: false, // 编辑|新增 模态框
      deleteVisible: false,
      del_row: {}, // 删除项数据
      defaultProps: {
        // 树状图默认样式
        children: 'children',
        label: 'name'
      },
      sider_default_list: [], // 树状图默认打开节点
      check_sider_data: {},
      rules: {
        path: [{
          required: true,
          message: '请输入路径',
          trigger: 'blur'
        }],
        reloginpage: [{
          required: true,
          message: '请输入无权限时跳转页面',
          trigger: 'blur'
        }],
        component: [{
          required: true,
          message: '请输入组件',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入菜单名称',
          trigger: 'blur'
        }],
        uniflag: [{
          required: true,
          message: '请输入唯一标识',
          trigger: 'blur'
        }],
        orderno: [{
          required: true,
          message: '请输入显示顺序',
          trigger: 'blur'
        },
        {
          type: 'number',
          message: '请输入数字',
          trigger: 'blur'
        }
        ],
        norightoperator: [{
          required: true,
          message: '请选择无权限时路由样式',
          trigger: 'change'
        }],
        alwaysshow: [{
          required: true,
          message: '请选择是否一直显示',
          trigger: 'change'
        }],
        parentid: [{
          required: true,
          message: '请选择上级分类',
          trigger: 'change'
        }]
      }
    }
  },
  computed: {
    /* 转树形数据 */
    optionData() {
      const cloneData = JSON.parse(JSON.stringify(this.manager_data)) // 对源数据深度克隆
      return cloneData
    },
    optionperData() {
      const cloneData = JSON.parse(JSON.stringify(this.permissionData)) // 对源数据深度克隆
      return cloneData
    }
  },
  beforeMount: function() {
    this.getMenuList()
  },

  methods: {
    handleNodeExpand(data) {
      // 保存当前展开的节点
      let flag = false
      this.defaultShowNodes.some((item) => {
        if (item === data.RUID) {
          // 判断当前节点是否存在， 存在不做处理
          flag = true
          return true
        }
      })
      if (!flag) {
        // 不存在则存到数组里
        this.defaultShowNodes.push(data.RUID)
      }
      console.log(this.defaultShowNodes)
    },
    // 树节点关闭
    handleNodeCollapse(data) {
      this.defaultShowNodes.some((item, i) => {
        if (item === data.RUID) {
          // 删除关闭节点
          this.defaultShowNodes.length = i
        }
      })
      console.log(this.defaultShowNodes)
    },
    getMenuList() {
      menulist({
        type: 'vuerouter6',
        rootnode: {
          RUID: 'root',
          exist: '1',
          show: '1'
        },
        deep: -1,
        field: 'RUID,`name`,parentid,uniflag,path,redirect,icontype,orderno,icon,permission,norightoperator,component,alwaysshow,reloginpage',
        key: {
          RUID: 'RUID',
          name: 'name',
          children: 'children'
        },
        filter: [],
        order: [{
          fieldname: 'name',
          type: 'D'
        }]
      }).then((res) => {
        console.log(res)
        if (res.cxajaxrc == '0') {
          this.manager_data = res.nodes
          this.sider_default_list.push(res.nodes[0].RUID) // 设置左侧Sider默认选中打开
          if (this.defaultShowNodes != []) {
            this.sider_default_list = this.defaultShowNodes
          }
          this.check_sider_data = res.nodes[0]
          if (this.tableData == []) {
            this.tableData = res.nodes[0].children
          }
          if (this.treechecktable != '') {
            this.tableData = []
            this.gettabelcolumnbyid(res.nodes, this.treechecktable)
          }
        } else {
          this.$message.error('菜单列表:检索资料时发生错误')
        }
      })
    },
    getpermissionData() {
      menulist({
        type: 'permission6',
        rootnode: {
          RUID: 'permission',
          exist: '0',
          show: '0'
        },
        deep: -1,
        field: 'RUID,`name`,parentid',
        key: {
          RUID: 'RUID',
          name: 'name',
          children: 'children'
        },
        filter: [],
        order: [{
          fieldname: 'name',
          type: 'D'
        }]
      }).then((res) => {
        if (res.cxajaxrc == '0') {
          this.permissionData = res.nodes
          for (let i = 0; i < this.form.permission.length; i++) {
            this.getnamebyid(this.permissionData, this.form.permission[i])
          }
        } else {
          this.$message.error('菜单列表:检索资料时发生错误')
        }
      })
    },
    gettabelcolumnbyid(data, id) {
      for (let j = 0; j < data.length; j++) {
        console.log(data[j])
        if (id == data[j].RUID) {
          this.tableData = data[j].children
        }
        if (data[j].children) {
          this.gettabelcolumnbyid(data[j].children, id)
        }
      }
    },
    getnamebyid(data, id) {
      for (let j = 0; j < data.length; j++) {
        if (id == data[j].RUID) {
          this.permissionnamelist.push(data[j].name)
        }
        if (data[j].children) {
          this.getnamebyid(data[j].children, id)
        }
      }
    },
    getValue(value) {
      // 下拉树状图获取选中值
      this.form.parentid = value
    },
    getCheckValue(value) {
      this.form.permission = value
    },
    insertmenushow() {
      this.dialogFormVisible = true
    },
    handleNodeClick(data) {
      console.log(data)
      this.treechecktable = data.RUID // 每次切换时保存当前选中的节点,新增修改删除后table不变
      this.check_sider_data = data
      this.tableData = []
      this.tableData = data.children
    },
    showinsertCategory() {
      // 点击新增事件
      this.dialogFormVisible = true
      this.getpermissionData()
      this.insorup = true
    },
    insertCategory() {
      // 新增路由
      this.$refs['form'].validate((valid) => {
        if (valid) {
          saveObject({
            type: 'vuerouter6',
            codeflag: '1',
            object: {
              path: this.form.path,
              reloginpage: this.form.reloginpage,
              component: this.form.component,
              redirect: this.form.redirect,
              parentid: this.form.parentid,
              alwaysshow: this.form.alwaysshow,
              permission: this.form.permission,
              name: this.form.name,
              orderno: this.form.orderno,
              icontype: this.form.icontype,
              icon: this.form.icon,
              norightoperator: this.form.norightoperator,
              uniflag: this.form.uniflag
            }
          }).then((res) => {
            console.log(res)
            if (res.cxajaxrc == '0') {
              this.$message.success('新增成功!')
              this.$refs['form'].resetFields()
              this.getMenuList()
              this.dialogFormVisible = false
            } else {
              this.$message.error('新增错误!!')
            }
          })
        } else {
          this.$message.error('请输入完整!!')
          return false
        }
      })
    },
    updateCategory() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          saveObject({
            type: 'vuerouter6',
            codeflag: '1',
            object: {
              RUID: this.form.RUID,
              path: this.form.path,
              reloginpage: this.form.reloginpage,
              component: this.form.component,
              redirect: this.form.redirect,
              parentid: this.form.parentid,
              alwaysshow: this.form.alwaysshow,
              permission: this.form.permission,
              name: this.form.name,
              orderno: this.form.orderno,
              icontype: this.form.icontype,
              icon: this.form.icon,
              norightoperator: this.form.norightoperator,
              uniflag: this.form.uniflag
            }
          }).then((res) => {
            console.log(res)
            if (res.cxajaxrc == '0') {
              this.$message.success('修改成功!')
              this.$refs['form'].resetFields()
              this.getMenuList()
              this.dialogFormVisible = false
            } else {
              this.$message.error('修改错误!!')
            }
          })
        } else {
          this.$message.error('请输入完整!!')
          return false
        }
      })
    },
    sureCategory() {
      if (this.insorup) {
        this.insertCategory() // 新增
      } else {
        this.updateCategory() // 修改
      }
    },

    showupdateCategory(index, row) {
      console.log(row)
      this.getpermissionData()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.form.RUID = row.RUID
        this.form.parentid = row.parentid
        this.form.icontype = row.icontype
        this.form.name = row.name
        this.form.uniflag = row.uniflag
        this.form.orderno = row.orderno
        this.form.path = row.path
        this.form.redirect = row.redirect
        this.form.reloginpage = row.reloginpage
        this.form.alwaysshow = row.alwaysshow
        this.form.norightoperator = row.norightoperator
        this.form.component = row.component
      })
      this.insorup = false
    },
    stateFormatType(row, column, cellValue) {
      // for (var i = 0; i < this.menu_type_list.length; i++) {
      //   if (cellValue == this.menu_type_list[i].value) {
      //     return this.menu_type_list[i].label;
      //   }
      // }
      // console.log(row);
      // if(cellValue.length>30){
      //   var str = cellValue.slice(0,30)+'...';
      //   return str;
      // }
      if (cellValue != null && cellValue != '') {
        cellValue =
            cellValue.length >= 30 ? cellValue.slice(0, 30) + '...' : cellValue
        return cellValue
      } else {
        return '无'
      }
    },
    stateFormatOpenWay(row, column, cellValue) {
      // if (cellValue == "_blank") {
      //   return "在新页面打开";
      // } else if (cellValue == "_self") {
      //   return "在当前页面打开";
      // }
      if (cellValue != null && cellValue != '') {
        cellValue =
            cellValue.length >= 30 ? cellValue.slice(0, 30) + '...' : cellValue
        return cellValue
      } else {
        return '无'
      }
    },
    stateFormatDisplay(row, column, cellValue) {
      if (cellValue == 'true') {
        return '显示'
      } else if (cellValue == 'false') {
        return '隐藏'
      }
    },
    hideMenu() {},
    delClick() {
      this.del_row = row // 要删除项的数据
      this.deleteVisible = true
    },
    initform() {
      this.form.redirect = ''
      this.form.icon = ''
      this.form.permission = []
    },
    cancelUpdateCategory() {
      this.initform()
      this.$refs['form'].resetFields()
      console.log(this.form)
      this.dialogFormVisible = false
    },
    onChange(value) {
      this.value = value
    },
    onSearch() {},
    onSelectTreeSelect() {},
    delMenu() {},
    delCancel() {}
  }
}
</script>
<style>
  .ant-layout-content {
    line-height: 0;
  }

  .main_margin {
    margin: 10px;
    height: 100%;
  }

  .left_tree {
    border: #007aff 1px solid;
    padding: 10px;
    padding-bottom: 60px;
  }

  .btn_row {
    margin-bottom: 10px;
    line-height: 40px;
  }

  .span-ellipsis {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .el-tree>>>.el-tree-node__label {
    font-size: 18px;
  }
</style>
<style lang='scss' scoped>
</style>
