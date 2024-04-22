<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入企业名称"/>
      </el-form-item>
      <el-form-item label="联系人手机号" prop="contactPhone">
        <el-input v-model="formData.contactPhone" placeholder="请输入联系人手机号"/>
      </el-form-item>
      <el-form-item label="联系人姓名" prop="contactPerson">
        <el-input v-model="formData.contactPerson" placeholder="请输入联系人姓名"/>
      </el-form-item>
      <el-form-item label="联系人邮箱" prop="contactEmail">
        <el-input v-model="formData.contactEmail" placeholder="请输入联系人邮箱"/>
      </el-form-item>
      <el-form-item label="企业地址" prop="location">
        <el-cascader
          style="width: 240px"
          v-model="formData.locationList" :options="areaList" clearable
          :props="{value: 'id', label: 'name'}"
          @change="console.log(formData.locationList)">
          <template #default="{ node, data }">
            <span>{{ data.name }}</span>
            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
          </template>
        </el-cascader>
      </el-form-item>
      <el-form-item label="企业规模" prop="scale">
        <el-select
          v-model="formData.scale"
          default-first-option
          placeholder="请输入企业规模"
          style="width: 240px">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.COMPANY_SCALE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import {CompanyApi, CompanyVO} from '@/api/xztx/company'
import {DICT_TYPE, getIntDictOptions} from '@/utils/dict'
import * as AreaApi from '@/api/system/area'
/** 携智同行 企业 表单 */
defineOptions({name: 'CompanyForm'})

const {t} = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  name: undefined,
  contactPhone: undefined,
  contactPerson: undefined,
  contactEmail: undefined,
  locationList: undefined,
  scale: undefined,
  status: undefined
})
const formRules = reactive({})
const formRef = ref() // 表单 Ref
const areaList = ref([])
/**
 * 获得地区
 */
const getAreaList = async () => {
  areaList.value = await AreaApi.getAreaTree()
  console.log(areaList.value)
}
/** 初始化 **/
onMounted(() => {
  getAreaList()
})
/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await CompanyApi.getCompany(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({open}) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as CompanyVO
    if (formType.value === 'create') {
      await CompanyApi.createCompany(data)
      message.success(t('common.createSuccess'))
    } else {
      await CompanyApi.updateCompany(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    name: undefined,
    contactPhone: undefined,
    contactPerson: undefined,
    contactEmail: undefined,
    locationList: undefined,
    scale: undefined,
    status: undefined
  }
  formRef.value?.resetFields()
}
</script>
