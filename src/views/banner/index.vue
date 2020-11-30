<template>
	<div style="height: 100%;margin: 10px;">
		<a-row type="flex">
			<!-- 左侧区 -->
			<a-col :flex="1">
				<a-row style="line-height:20px;">
					<a-button type="link" @click="addDataType()">
						<a-icon type="file-add" />新增</a-button>
					<a-button type="link" @click="copyDataType()">
						<a-icon type="snippets" />套用</a-button>
				</a-row>
				<a-row>
					<a-row type="flex">
						<a-col :flex="1">
							<div style="height:600px;overflow: hidden;overflow-y: scroll;border-style: solid;border-color: #00B7B8;border-width: 1px;">
								<!-- <ul style="list-style:none;">
									<li v-for="item in typeList" :RUID="item.RUID" :tablename="item.tablename" v-on:click="refreshDataTypeInfo(item.RUID)">
										{{item.name}}
									</li> -->
								<div v-for="(item,index) in typeList" style="line-height: 10px;" :index="index" :RUID="item.RUID" :tablename="item.tablename"
								 v-on:click="refreshDataTypeInfo(item.RUID)">
									<a-button class="button-color-sunset" block>
										{{item.name}}
									</a-button>
								</div>
								</ul>
							</div>
						</a-col>

					</a-row>
				</a-row>

			</a-col>
			<!-- 右侧按区 -->
			<a-col :flex="5">
				<a-row>
					<a-form-model :model="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
						<a-row style="margin-bottom:1px;" type="flex" justify="space-around" align="middle">
							<a-col :span="4">
								<!-- 占位 -->
							</a-col>
							<a-col :span="8">
								<a-form-model-item :wrapper-col="{ span: 14, offset: 12 }" :model="form">
									<a-button type="primary" style="margin-right: 10px;" @click="onSubmit()">
										保存
									</a-button>
									<a-button type="primary" style="margin-right: 10px;" @click="onDataSet()">
										资料组
									</a-button>
									<a-button style="margin-right: 10px;" @click="" id="test">
										删除
									</a-button>
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item :wrapper-col="{ span: 14, offset: -1 }">
									<a-button type="link" @click="onInitDataStructure()">
										<a-icon type="file-add" />
										初始化数据结构
									</a-button>
									<a-button type="link" style="margin-left: 1px;" @click="onDataBackup()">
										<a-icon type="file-add" />
										数据备份
									</a-button>
									<a-button type="link" style="margin-left: 1px;" @click="onRecovery()">
										<a-icon type="file-add" />
										数据恢复
									</a-button>
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="编码:">
									<a-input v-model="form.code" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item :label-col="{ span: 3 }" label="名称:">
									<a-input v-model="form.name" id="aaa" />
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="表名:">
									<a-input v-model="form.tablename" />
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="无权下载:">
									<a-input v-model="form.nodownrightmessage" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="无权阅读:" :label-col="{ span: 3 }">
									<a-input v-model="form.noreadrightmessage" />
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="录入页面:">
									<a-input v-model="form.editorpage" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item :wrapper-col="{ span: 14, offset: -1 }">
									<a-button style="margin-right: 10px;" @click="onPageSelect('editorpage',form.editorpage)">选择</a-button>
									<a-button style="margin-right: 10px;" @click="onPageCopy('editorpage',form.editorpage)">套用</a-button>
									<a-button style="margin-right: 10px;" @click="onPageCreat('editorpage',form.editorpage)">新建</a-button>
									<a-button style="margin-right: 10px;" @click="onPageAdd('editorpage',form.editorpage)">增量</a-button>
									<a-button style="margin-right: 10px;" @click="onPageSet('editorpage',form.editorpage)">设置</a-button>
								</a-form-model-item>

							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="详情页面:">
									<a-input v-model="form.detailspage" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item :wrapper-col="{ span: 14, offset: -1 }">
									<a-button style="margin-right: 10px;" @click="onPageSelect('detailspage',form.detailspage)">选择</a-button>
									<a-button style="margin-right: 10px;" @click="onPageCopy('detailspage',form.detailspage)">套用</a-button>
									<a-button style="margin-right: 10px;" @click="onPageCreat('detailspage',form.detailspage)">新建</a-button>
									<a-button style="margin-right: 10px;" @click="onPageAdd('detailspage',form.detailspage)">增量</a-button>
									<a-button style="margin-right: 10px;" @click="onPageSet('detailspage',form.detailspage)">设置</a-button>
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="移动端详情页面:">
									<a-input v-model="form.phonedetailspage" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item :wrapper-col="{ span: 14, offset: -1 }">
									<a-button style="margin-right: 10px;" @click="onPageSelect('phonedetailspage',form.phonedetailspage)">选择</a-button>
									<a-button style="margin-right: 10px;" @click="onPageCopy('phonedetailspage',form.phonedetailspage)">套用</a-button>
									<a-button style="margin-right: 10px;" @click="onPageCreat('phonedetailspage',form.phonedetailspage)">新建</a-button>
									<a-button style="margin-right: 10px;" @click="onPageAdd('phonedetailspage',form.phonedetailspage)">增量</a-button>
									<a-button style="margin-right: 10px;" @click="onPageSet('phonedetailspage',form.phonedetailspage)">设置</a-button>
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="16">
							</a-col>
							<a-col :span="8">
								<a-form-model-item :wrapper-col="{ span: 14, offset: -1 }">
									<a-button style="margin-right: 10px;" @click="onPageSelect('phonedetailspage',form.phonedetailspage)">套用元数据</a-button>
									<a-button style="margin-right: 10px;" @click="onPageCopy('phonedetailspage',form.phonedetailspage)">追加元数据</a-button>
								</a-form-model-item>
							</a-col>
						</a-row>
						<!-- <a-row>
							<a-col :span="12">
								<a-form-model-item label="元数据列表:">
									<div style="width: 1000px;margin-left: 10px;margin-bottom: 20px;">
										<a-table :columns="columns" :data-source="tableData" :pagination="false" :scroll="{ y: 300 }" rowKey='RUID'>
											<span slot="operation" slot-scope="text, record">
												<a slot="action" href="javascript:;" @click="onTableSet(record,text)">设置</a>
												<a-divider type="vertical" />
												<a slot="action" href="javascript:;" @click="onTableDelete(record)">删除</a>
												<a-divider type="vertical" />
												<a slot="action" href="javascript:;" @click="onTableInsert(record)">插入</a>
												<a-divider type="vertical" />
												<a slot="action" href="javascript:;" @click="onTableMoveUp(record)">上移</a>
												<a-divider type="vertical" />
											</span>

										</a-table>
									</div>
								</a-form-model-item>
							</a-col>
						</a-row> -->

						<a-row>
							<a-col :span="12">
								<a-form-model-item label="元数据列表:">
									<div style="width: 1000px;margin-left: 10px;margin-bottom: 20px;">
										<a-button class="editable-add-btn" @click="handleAdd">
											添加元数据
										</a-button>
										<a-table bordered :data-source="tableData" :pagination="false" :scroll="{ y: 300 }" :columns="columns"
										 :rowKey='record=>record.RUID'>
											<template v-for="col in ['name', 'code', 'valuetype']" :slot="col" slot-scope="text, record, index">
												<div :key="col">
													<a-input v-if="record.editable" style="margin: -5px 0" :value="text" @change="e => handleChange_1(e.target.value, record.key, col)" />
													<template v-else>
														{{ text }}
													</template>
												</div>
											</template>
											<template slot="operation" slot-scope="text, record,index">
												<a-popconfirm v-if="tableData.length" title="确认删除?" @confirm="() => onDelete(record.RUID)">
													<a href="javascript:;">删除</a>
												</a-popconfirm>
												<a-divider type="vertical" />
												<a href="javascript:;" @click="onTableSet(record)">设置</a>
												<a-divider type="vertical" />
												<a href="javascript:;">插入</a>
												<a-divider type="vertical" />
												<a href="javascript:;" @click="onTableMoveUp(record)">上移</a>
												<div class="editable-row-operations">
													<span v-if="record.editable">
														<a @click="() => save_1(record.key)">保存</a>
														<a-popconfirm title="Sure to cancel?" @confirm="() => cancel_1(record.key)">
															<a>取消</a>
														</a-popconfirm>
													</span>
													<span v-else>
														<a :disabled="editingKey !== ''" @click="() => edit_1(record.key)">编辑</a>
													</span>
												</div>
											</template>

										</a-table>
									</div>
								</a-form-model-item>
							</a-col>
						</a-row>

						<a-row>
							<a-col :span="12">
								<a-form-model-item label="列表页面显示模板:">
									<a-textarea v-model="form.listhtml" />
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="详细页面显示模板:">
									<a-textarea v-model="form.listhtml" />
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="移动端列表页面显示模板:">
									<a-textarea v-model="form.listhtml" />
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="移动端详细页面显示模板:">
									<a-textarea v-model="form.listhtml" />
								</a-form-model-item>
							</a-col>
						</a-row>
					</a-form-model>
				</a-row>

			</a-col>
		</a-row>
		<div>
			<a-modal v-model="dataTypeVisible" title="新增" @ok="handleOk('dataTypeForm')" @cancel="resetForm('dataTypeForm')"
			 destroyOnClose:true>
				<a-form-model ref="dataTypeForm" :model="dataTypeForm" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
					<a-form-model-item label="资料类型名称:" prop="dataTypeName">
						<a-input v-model="dataTypeForm.dataTypeName" />
					</a-form-model-item>
					<a-form-model-item label="资料类型编码:" prop="dataTypeCode">
						<a-input v-model="dataTypeForm.dataTypeCode " />
					</a-form-model-item>
					<a-form-model-item label="表名:" prop="dataTypeTable">
						<a-input v-model="dataTypeForm.dataTypeTable" />
					</a-form-model-item>
					<!-- 					<a-form-model-item :wrapper-col="{ span: 4, offset: 4 }">
						<a-button style="margin-left: 10px" @click="resetForm('dataTypeForm')">
							Reset
						</a-button>
					</a-form-model-item> -->
				</a-form-model>
			</a-modal>
		</div>

		<div>
			<a-modal width='800px' v-model="tableDataVisible" title="文本型元数据编辑" @ok="handleTableOk('tableDataForm')" @cancel="resetForm('tableDataForm')"
			 destroyOnClose:true>
				<div style="height:600px;overflow: hidden;overflow-y: scroll;">
					<a-form-model ref="tableDataForm" :model="tableDataForm" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
						<a-form-model-item label="元数据编码:">
							<a-input v-model="tableDataForm.code" />
						</a-form-model-item>
						<a-form-model-item label="元数据名称:">
							<a-input v-model="tableDataForm.name" />
						</a-form-model-item>
						<a-form-model-item label="元数据字段:">
							<a-input v-model="tableDataForm.fieldname" />
						</a-form-model-item>
						<a-form-model-item label="元数据权限:">
							<a-select placeholder="全部">
								<a-select-option value="1">
									在线阅读权限
								</a-select-option>
								<a-select-option value="2">
									下载权限
								</a-select-option>
							</a-select>
						</a-form-model-item>
						<a-form-model-item label="长度:" v-if="tableDataForm.valuetype==='C'">
							<a-input v-model="tableDataForm.len" />
						</a-form-model-item>
						<a-form-model-item label="默认值:" v-if="tableDataForm.valuetype==='C'">
							<a-input v-model="tableDataForm.defvalue" />
						</a-form-model-item>
						<a-form-model-item label="字段属性:">
							<a-checkbox :checked="isChecked(tableDataForm.mustflag)" name="mustflag" @change="onCheckBoxChang" v-if="tableDataForm.valuetype==='C'">
								必备
							</a-checkbox>
							<a-checkbox :checked="isChecked(tableDataForm.repeatflag)" name="repeatflag" @change="onCheckBoxChang" v-if="tableDataForm.valuetype==='C'">
								可重复
							</a-checkbox>
							<a-checkbox :checked="isChecked(tableDataForm.sortflag)" name="sortflag" @change="onCheckBoxChang" v-if="tableDataForm.valuetype==='C'">
								可排序
							</a-checkbox>
						</a-form-model-item>
						<a-form-model-item label="参与检索方式:" v-if="tableDataForm.valuetype==='C'">
						
							<a-checkbox :checked="isChecked(tableDataForm.fulltextsearch)" @change="onCheckBoxChang" name="fulltextsearch">
								分词检索
							</a-checkbox>
							<a-checkbox :checked="isChecked(tableDataForm.exactmatch)" @change="onCheckBoxChang"  name="exactmatch">
								精确查找
							</a-checkbox>
							
						</a-form-model-item>
						<a-form-model-item label="检索生产方式:" v-if="tableDataForm.valuetype==='C'">
							<a-radio-group v-model="value" @change="onRadioChange">
								<a-radio :style="radioStyle" :value="1">
									保持原值
								</a-radio>
								<a-radio :style="radioStyle" :value="2">
									精简ISBN
								</a-radio>
								<a-radio :style="radioStyle" :value="3">
									支持简繁体拼音同时检索
								</a-radio>
								<a-radio :style="radioStyle" :value="4">
									后台代码
									<a-input v-if="value === 4" style="width: 40%;margin-left: 5px;" />
									<a-input v-if="value === 4" style="width: 40%;margin-left: 15px;" />
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
						<a-form-model-item label="检验方式:" v-if="tableDataForm.valuetype==='C'">
							<a-radio-group v-model="value1">
								<a-radio :value="1">
									不校验
								</a-radio>
								<a-radio :value="2">
									电话号码
								</a-radio>
								<br />
								<a-radio :value="3">
									手机号码
								</a-radio>
								<a-radio :value="24">
									电子邮箱
								</a-radio>
								<br />
								<a-radio :value="13">
									身份证号码
								</a-radio>
								<a-radio :value="14">
									数字和字母
								</a-radio>
								<br />
								<a-radio :value="213">
									ISBN
								</a-radio>
								<a-radio :value="124">
									数字
								</a-radio>
								<br />
								<a-radio :value="4">
									后台代码
									<a-input v-if="value1 === 4" style="width: 40%;margin-left: 5px;" />
									<a-input v-if="value1 === 4" style="width: 40%;margin-left: 15px;" />
								</a-radio>
							</a-radio-group>
						</a-form-model-item>
						<a-form-model-item label="应用到:">
							<a-checkbox-group>
								<a-row>
									<a-col :span="12">
										<a-checkbox value="1" style="">
											列表页
										</a-checkbox>
									</a-col>
									<a-col :span="12">
										<a-checkbox value="2">
											详情信息页
										</a-checkbox>
									</a-col>
									<a-col :span="12">
										<a-checkbox value="3">
											资料录入页
										</a-checkbox>
									</a-col>
									<a-col :span="12">
										<a-checkbox value="4">
											回带录入
										</a-checkbox>
									</a-col>
								</a-row>
							</a-checkbox-group>
						</a-form-model-item>
						<a-form-model-item label="录入页组件:">
							<a-select placeholder="全部">
								<a-select-option value="1">
									在线阅读权限
								</a-select-option>
								<a-select-option value="2">
									下载权限
								</a-select-option>
							</a-select>
						</a-form-model-item>
						<a-form-model-item label="列表页模板选择:">
							<a-select placeholder="全部">
								<a-select-option value="1">
									列表页文本型
								</a-select-option>
								<a-select-option value="2">
									列表页文本型题名
								</a-select-option>
							</a-select>
						</a-form-model-item>
						<a-form-model-item label="详情页模板选择:">
							<a-select placeholder="全部">
								<a-select-option value="1">
									详情页文本型
								</a-select-option>
								<a-select-option value="2">
									详情页文本型题名
								</a-select-option>
								<a-select-option value="3">
									详情文本跳转
								</a-select-option>
							</a-select>
						</a-form-model-item>
						<a-form-model-item label="移动端列表页模板选择:">
							<a-select placeholder="全部">
								<a-select-option value="1">
									移动端列表页模板选择
								</a-select-option>
								<a-select-option value="2">
									移动端列表页模板选择题名
								</a-select-option>
							</a-select>
						</a-form-model-item>
						<a-form-model-item label="移动端详细页模板选择:">
							<a-select placeholder="全部">
								<a-select-option value="1">
									移动端详情页文本型
								</a-select-option>
								<a-select-option value="2">
									移动端详情页文本型题名
								</a-select-option>
							</a-select>
						</a-form-model-item>
						<a-form-model-item label="列表页定制模板:">
							<a-textarea placeholder="根据设置内容生成列表页面附件的html" />
						</a-form-model-item>
						<a-form-model-item label="详细页定制模板:">
							<a-textarea placeholder="根据设置内容生成详细页面附件的html" />
						</a-form-model-item>
						<a-form-model-item label="移动端列表页定制模板:">
							<a-textarea placeholder="根据设置内容生成移动端页面附件的html" />
						</a-form-model-item>
						<a-form-model-item label="移动端详细页定制模板:">
							<a-textarea placeholder="根据设置内容生成移动端详细页面附件的html" />
						</a-form-model-item>
					</a-form-model>
				</div>

			</a-modal>
		</div>

	</div>
</template>
<script>
	const columns = [{
			title: '序号',
			dataIndex: 'key',
			width: 100,
			scopedSlots: {
				customRender: 'key'
			},
		},
		{
			title: '排序',
			dataIndex: 'order',
			width: 100,
			scopedSlots: {
				customRender: 'order'
			},
		}, {
			title: '编码',
			dataIndex: 'code',
			width: 100,
			scopedSlots: {
				customRender: 'code'
			},
		},
		{
			title: '名称',
			dataIndex: 'name',
			width: 100,
			scopedSlots: {
				customRender: 'name'
			},
		},
		{
			title: '类型',
			dataIndex: 'valuetype',
			width: 100,
			scopedSlots: {
				customRender: 'valuetype'
			},
		},
		{
			title: '操作',
			key: 'operation',
			scopedSlots: {
				customRender: 'operation'
			},
			width: 140,
		},
	];

	import {
		dataTypeManageList,
		dataTypeManageSave
	} from '@/api/banner.js'
	export default {
		name: "dataTypeManage",
		mounted() {
			this.getDaDataTypeList(this.typeListParam)
			//console.log("e:"+JSON.stringify(this.$refs));
		},
		data() {
			//let cacheData = this.tableData.map(item => ({ ...item }));
			return {
				metaDataParams: {
				    pageno: 0,
					type: "",
					codeflag: "1",
					filter: [{
						fieldname: "RUID",
						word: ""
					}],
					field: "",
				},
				order: 0,
				value: 1,
				value1: 1,
				radioStyle: {
					display: 'block',
					height: '30px',
					lineHeight: '30px',
				},
				editingKey: '',
				dataTypeForm: {
					key: '',
					dataTypeName: '',
					dataTypeCode: '',
					dataTypeTable: '',
				},
				//元数据列表设置页面form表单 
				tableDataForm: {
					RUID: "",
					name: "",
					type: "",
					code: "",
					valuetype: "",
					len: "",
					mustflag: "",
					repeatflag: "",
					defvalue: "",
					sortflag: "",
					editorpage: "",
					detailspage: "",
					listpage: "",
					managerpage: "",
					phoneeditorpage: "",
					phonedetailspage: "",
					phonelistpage: "",
					phonemanagerpage: "",
					order: "",
					ctrloptions: "",
					description: "",
					bringvalue: "",
					sysflag: "",
					readrule: "",
					writerule: "",
					writepermission: "",
					downpermission: "",
					downrule: "",
					onlinerule: "",
					onlinepermission: "",
					updataFlag:false,
					updateItemData:{},
				},
				dataTypeVisible: false,
				dataTypeConfirmLoading: false,
				tableDataVisible: false,
				tableData: [],
				cacheData: [],
				deleteTableData: [],
				columns,
				count: 0,
				typeListParam: {
					"pageno": 0,
					"pagesize": 100,
					"type": "datamodel6",
					"codeflag": "1",
					"filter": [{
						"fieldname": "code",
						"relationop": ">",
						"word": "-1"
					}],
					"field": "RUID,name,tablename",
					"order": [{
						"fieldname": "name",
						"type": "A"
					}]
				},
				typeList: [],
				dataTypeInfoParams: {
					"pageno": 0,
					"type": "datamodel6",
					"codeflag": "1",
					"filter": [],
					"field": "RUID,code,tablename,entitytemp,name,noreadrightmessage,nodownrightmessage,phonedetailspage,editorpage,detailspage,listpage,phonelistpage,managerpage,phonemanagerpage,listhtml"
				},
				typeListTableParam: {
					"pageno": 0,
					"type": "metadata6",
					"codeflag": "1",
					"filter": [],
					"field": "RUID,name,type,code,valuetype,len,mustflag,repeatflag,sortflag,defvalue,editorpage,detailspage,listpage,managerpage,phoneeditorpage,phonedetailspage,phonelistpage,phonemanagerpage,order,ctrloptions,description,bringvalue,sysflag,readrule,writerule,writepermission,downrule,downpermission,onlinerule,onlinepermission"
				},
				form: {
					name: '',
					code: '',
					tablename: '',
					noreadrightmessage: '',
					nodownrightmessage: '',
					editorpage: '',
					detailspage: '',
					listhtml: '',
					RUID: '',
					phonedetailspage: '',
					phoneeditorpage: '',
					entitytemp: '',
					sysflag: '',
					listpage: '',
					phonelistpage: '',
					managerpage: '',
					phonemanagerpage: '',
				},
				saveOrUpdateParams: {
					"type": "datamodel6",
					"codeflag": "1",
					"object": {}
				},

			}
		},
		methods: {
			onRadioChange(e) {
				console.log('radio checked', e.target.value);
			},
			isChecked(val) {
				return val == "1" ? true : false
			},
			onCheckBoxChang(e) {
				console.log(`checked = ${e.target.checked}`);
				console.log(e.target.name);
				if (e.target.checked) {
					this.tableDataForm[e.target.name] = "1";
				} else {
					this.tableDataForm[e.target.name] = "0";
				}
				console.log(this.tableDataForm[e.target.name]);
			},
			handleChange_1(value, key, column) {
				const newData = [...this.tableData];
				const target = newData.filter(item => key === item.key)[0];
				if (target) {
					target[column] = value;
					this.tableData = newData;
				}
			},
			edit_1(key) {
				const newData = [...this.tableData];
				const target = newData.filter(item => key === item.key)[0];
				this.editingKey = key;
				if (target) {
					target.editable = true;
					this.tableData = newData;
				}
			},
			save_1(key) {
				const newData = [...this.tableData];
				const newCacheData = [...this.cacheData];
				const target = newData.filter(item => key === item.key)[0];
				const targetCache = newCacheData.filter(item => key === item.key)[0];
				// console.log(newData)
				// console.log(target)
				// console.log(newCacheData)
				// console.log(targetCache)
				if (target && targetCache) {
					delete target.editable;
					this.tableData = newData;
					Object.assign(targetCache, target);
					this.cacheData = newCacheData;
				}
				this.editingKey = '';
			},
			cancel_1(key) {
				const newData = [...this.tableData];
				const target = newData.filter(item => key === item.key)[0];
				this.editingKey = '';
				if (target) {
					Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
					delete target.editable;
					this.tableData = newData;
				}
			},
			handleTableOk(val) {
				//console.log(this.$refs[val])
				//console.log(this. [val])
				const tableData = [...this.tableData];
				let tableDataItem = this. [val];
				let ruid = tableDataItem.RUID;
				let target = tableData.find(item => item.RUID === ruid);
				target = tableDataItem;
				this.tableData = tableData;
				this.$refs[val].resetFields();
				this.tableDataVisible = false;

				// console.log()
			},
			onCellChange(key, dataIndex, value) {
				const tableData = [...this.tableData];
				const target = tableData.find(item => item.RUID === key);
				if (target) {
					target[dataIndex] = value;
					this.tableData = tableData;
				}
			},
			onDelete(key) {
				const tableData = [...this.tableData];
				this.tableData = tableData.filter(item => item.RUID !== key);
				deleteTableData.push(key)
			},
			handleAdd() {
				const {
					count,
					tableData,
					cacheData
				} = this;
				const newData = {
					key: count + 1,
					code: "",
					name: "",
					valuetype: "",
					RUID: this.uuid()
				};

				this.tableData = [...tableData, newData];
				this.cacheData = [...cacheData, newData];
				console.log(this.tableData)
				this.count = count + 1;
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			showModal() {
				this.dataTypeVisible = true;
			},
			handleOk(formName) {
				console.log(this.$refs[formName])
				console.log(this.dataTypeForm)
				this.form.name = this.dataTypeForm.dataTypeName;
				this.form.code = this.dataTypeForm.dataTypeCode;
				this.form.tablename = this.dataTypeForm.dataTypeTable;
				this.dataTypeVisible = false;
				this.dataTypeConfirmLoading = false;
				this.resetForm(formName)

			},
			handleCancel(formName) {
				console.log(this.forms)
				this.forms.resetFields();
				console.log(this.forms.resetFields())

			},
			getDaDataTypeList(params) {
				dataTypeManageList(params).then(res => {
					this.typeList = res.recordlist;
					//console.log(res.recordlist)
				})
			},
			refreshDataTypeInfo(ruid) {
				let param = [{
					"fieldname": "RUID",
					"word": ruid
				}];
				this.dataTypeInfoParams.filter = param;
				dataTypeManageList(this.dataTypeInfoParams).then(res => {
					this.form = res.recordlist[0];
					let tableParam = [{
						"fieldname": "dmcode",
						"word": res.recordlist[0].code
					}];
					this.typeListTableParam.filter = tableParam;
					dataTypeManageList(this.typeListTableParam).then(res => {
						this.cacheData = [];
						this.tableData = [];
						this.deleteTableData = [];
						this.order = 0;
						//console.log(JSON.stringify(res.recordlist))
						if (res.recordcount != 0) {
							for (var i = 0; i < res.recordlist.length; i++) {
								res.recordlist[i].key = i + 1;
							}
							this.tableData = res.recordlist;
							this.order = this.tableData[this.tableData.length - 1].order;
							//console.log(res.recordlist.length)
							this.cacheData = this.tableData.map(item => ({ ...item
							}));
							this.count = this.tableData.length;
						} else {
							//console.log(res)
							this.order = 0;
							this.count = 0;
						}


					});
				});
			},
			onSubmit() {
				//console.log('表单保存按钮!', this.form);
				//console.log(this.form);
				this.saveOrUpdateParams.type = "datamodel6";
				this.saveOrUpdateParams.object = this.form;
				dataTypeManageSave(this.saveOrUpdateParams).then(res => {
					//console.log(res)
					//保存元数据表
					console.log(this.tableData)
					if (this.tableData.length > 0) {
						this.saveOrUpdateParams.type = "metadata6";
						for (let i = 0; i < this.tableData.length; i++) {
							delete this.tableData[i].key;
							this.tableData[i].dmcode = this.form.code;
							this.saveOrUpdateParams.object = this.tableData[i];
							dataTypeManageSave(this.saveOrUpdateParams).then(res => {
								console.log(res)
							})
						}
					}
				})
			},
			onDataSet() {
				console.log('资料组按钮!', this.form);
			},
			// onDelete() {
			// 	console.log('表单删除按钮!', this.form);
			// },
			onInitDataStructure() {
				console.log('初始化数据结构!', this.form);
			},
			ondataBackup() {
				console.log('数据备份按钮!', this.form);
			},
			onRecovery() {
				console.log('数据恢复按钮!', this.form);
			},
			onTableSet(record) {
				//console.log("设置:" + JSON.stringify(record));
				this.tableDataVisible = true;
				this.tableDataForm = record;
				this.tableDataForm.updataFlag = true;
				const params = this.metaDataParams;
				console.log(record.valuetype)
				if (record.valuetype == 'C') {
					params.type = "metadata6_text";
					params.field = "exactmatch,fulltextsearch,searchvalue,checktype";
					params.filter[0] = {"fieldname":"RUID","word":record.RUID};
					dataTypeManageList(params).then(res => {
						this.tableDataForm.updateItemData = {
							exactmatch:"",
							fulltextsearch:"",
							searchvalue:"",
							checktype:"",
						};
						this.tableDataForm.exactmatch = "";
						this.tableDataForm.fulltextsearch = "";
						this.tableDataForm.searchvalue = "";
						this.tableDataForm.checktype = "";
						const metaObj = res.recordlist[0];
						if(metaObj.exactmatch!=undefined){
							this.tableDataForm.exactmatch = metaObj.exactmatch;
						}
						if(metaObj.fulltextsearch!=undefined){
							this.tableDataForm.fulltextsearch = metaObj.fulltextsearch;
						}
						if(metaObj.searchvalue!=undefined){
							this.tableDataForm.searchvalue = metaObj.searchvalue;
						}
						if(metaObj.checktype!=undefined){
							this.tableDataForm.checktype = metaObj.checktype;
						}
						console.log(this.tableDataForm)
						
					})
				}
			},
			onTableDelete(record, text) {
				console.log("删除:" + JSON.stringify(record))
			},
			onTableInsert(record) {
				console.log("插入:" + JSON.stringify(record))
			},
			onTableMoveUp(record) {
				//console.log("上移前:" + JSON.stringify(record));
				const tableData = [...this.tableData];
				const key = record.key;
				if (key > 1) {
					let moveTarget = tableData.find(item => item.key === key);
					let downTarget = tableData.find(item => item.key === (key - 1));
					moveTarget.key = downTarget.key;
					downTarget.key = key;
					let order = moveTarget.order;
					moveTarget.order = downTarget.order;
					downTarget, order = moveTarget.order;
					tableData[key - 1] = downTarget;
					tableData[key - 2] = moveTarget
					this.tableData = tableData;
				}

			},
			onPageSelect(type, id) {
				console.log(type + ":" + id + ":点击选择按钮")
			},
			onPageCopy(type, id) {
				console.log(type + ":" + id + ":点击复用按钮")
			},
			onPageCreat(type, id) {
				console.log(type + ":" + id + ":点击新建按钮")
			},
			onPageAdd(type, id) {
				console.log(type + ":" + id + ":点击增量按钮")
			},
			onPageSet(type, id) {
				console.log(type + ":" + id + ":点击设置按钮")
			},
			addDataType() {
				console.log('新增资料类型按钮')
				this.dataTypeVisible = true;

			},
			copyDataType() {
				console.log('套用资料类型按钮')
			},
			copyDataType() {
				console.log('套用资料类型按钮')
			},
			copyDataType() {
				console.log('套用资料类型按钮')
			},
			copyDataType() {
				console.log('套用资料类型按钮')
			},
			uuid() {
				var s = [];
				var hexDigits = "0123456789abcdef";
				for (var i = 0; i < 36; i++) {
					s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
				}
				s[14] = "4";
				s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
				s[8] = s[13] = s[18] = s[23] = "-";

				this.uuidA = s.join("");
				//console.log(s.join(""), 's.join("")');
				return this.uuidA;
			},
		}
	}
</script>

<style scoped>
	.a-input {
		border: 1px solid #378888 !important;
	}

	.button-color-sunset {
		/* background-color: #FAAD14; */
		/* border-color: #FAAD14; */

		&:hover,
		&:focus {
			background-color: #000000;
			border-color: #000000;
		}

		&:active,
		&.active {
			background-color: #000000;
			border-color: #000000;
		}
	}

	.editable-cell {
		position: relative;
	}

	.editable-cell-input-wrapper,
	.editable-cell-text-wrapper {
		padding-right: 24px;
	}

	.editable-cell-text-wrapper {
		padding: 5px 24px 5px 5px;
	}

	.editable-cell-icon,
	.editable-cell-icon-check {
		position: absolute;
		right: 0;
		width: 20px;
		cursor: pointer;
	}

	.editable-cell-icon {
		line-height: 18px;
		display: none;
	}

	.editable-cell-icon-check {
		line-height: 28px;
	}

	.editable-cell:hover .editable-cell-icon {
		display: inline-block;
	}

	.editable-cell-icon:hover,
	.editable-cell-icon-check:hover {
		color: #108ee9;
	}

	.editable-add-btn {
		margin-bottom: 8px;
	}
</style>
