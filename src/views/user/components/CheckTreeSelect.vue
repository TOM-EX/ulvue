<template>
  <el-select
    v-model="labelnames"
    :label="labelnames"
    placeholder="请选择"
    multiple
    collapse-tags
    @change="selectChange"
  >
    <el-option :value="mineStatusValue" style="height: auto">
      <el-tree
        :data="options"
        show-checkbox
        node-key="RUID"
        ref="selectTree"
        :accordion="accordion"
        highlight-current
        :props="props"
        :default-expanded-keys="defaultExpandedKey"
        :default-checked-keys="defaultCheckedKey"
        @check-change="handleCheckChange"
      ></el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "el-tree-select",
  props: {
    // 配置项
    props: {
      type: Object,
      default: {
        value: "RUID", // ID字段名
        label: "label", // 显示名称
        children: "children", // 子级字段名
      },
    },
    // 选项列表数据(树形结构的对象数组)
    options: {
      type: Array,
      default: [],
    },
    // 初始值
    value: {
      type: Array,
      default: null,
    },
    // 可清空选项
    clearable: {
      type: Boolean,
      default: true,
    },
    // 自动收起
    accordion: {
      type: Boolean,
      default: false,
    },
    labelname: {
      type: Array,
      defualt: [],
    },
  },
  data() {
    return {
      labelnames: this.labelname,
      mineStatus: this.value,
      permissionidlist: [],
      permissionnamelist:[],
      mineStatusValue: [],
      defaultExpandedKey: [],
      defaultCheckedKey: [],
    };
  },
  mounted() {
    this.initHandle();
  },
  methods: {
    selectChange(e) {
      for (let i = 0; i < e.length; i++) {
        this.getidbyname(this.options, e[i]);
      }
      this.mineStatus = this.permissionidlist;
      this.$refs.selectTree.setCheckedNodes(this.mineStatus); // 设置默认选中
      this.permissionidlist = [];
    },
    getidbyname(data, name) {
      for (let j = 0; j < data.length; j++) {
        if (name == data[j].name) {
          this.permissionidlist.push(data[j].RUID);
          name = "";
        }
        if (data[j].children) {
          this.getidbyname(data[j].children, name);
        }
      }
    },
    handleCheckChange() {
      let res = this.$refs.selectTree.getCheckedNodes(true, true); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      let arrLabel = [];
      let arr = [];
      let ruids = [];
      res.forEach((item) => {
        arrLabel.push(item.name);
        ruids.push(item.RUID);
        arr.push(item);
      });

      this.mineStatusValue = arr;
      this.mineStatus = arrLabel;
      this.labelnames = this.mineStatus;
      this.$emit("getCheckValue", ruids);
    },
    getCheckedKeys() {
    },
    // 初始化值
    initHandle() {
      if (this.mineStatus) {
        this.$refs.selectTree.setCurrentKey(this.mineStatus); // 设置默认选中
        this.defaultExpandedKey = this.mineStatus; // 设置默认展开
        this.defaultCheckedKey = this.mineStatus;
      }
      this.initScroll();
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        let scrollWrap = document.querySelectorAll(
          ".el-scrollbar .el-select-dropdown__wrap"
        )[0];
        let scrollBar = document.querySelectorAll(
          ".el-scrollbar .el-scrollbar__bar"
        );
        scrollWrap.style.cssText =
          "margin: 0px; max-height: none; overflow: hidden;";
        scrollBar.forEach((ele) => (ele.style.width = 0));
      });
    },
  },
  watch: {},
};
</script>
<style>
.el-tag.el-tag--info .el-tag__close {
  display: none;
}
</style>
<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}

.el-select-dropdown__item.selected {
  font-weight: normal;
}

ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}

.el-tree-node__label {
  font-weight: normal;
}

.el-tree >>> .is-current .el-tree-node__label {
  color: #409EFF;
  font-size: 16px;
  font-weight: 700;
}

.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
