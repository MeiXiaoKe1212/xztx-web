<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="职位名称" prop="jobName">
        <el-input v-model="formData.jobName" placeholder="请输入职位名称"/>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="起始薪资" prop="jobMinSalary">
            <el-input v-model="formData.jobMinSalary" placeholder="请输入起始薪资"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最高薪资" prop="jobMaxSalary">
            <el-input v-model="formData.jobMaxSalary" placeholder="请输入最高薪资"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="职位描述" prop="jobDescription">
        <el-input type="textarea" v-model="formData.jobDescription"
                  placeholder="例：1. 根据工位的操作指南熟练并独立的完成自己的工作；2. 提高客户满意度"/>
      </el-form-item>
      <el-form-item label="职位要求" prop="jobRequirement">
        <el-input type="textarea" v-model="formData.jobRequirement"
                  placeholder="例： 1：只招残疾人 2. 有流水线生产经验者； 3. 非色盲"/>
      </el-form-item>
      <el-form-item label="其它信息" prop="jobOtherInfo">
        <el-input type="textarea" v-model="formData.jobOtherInfo" placeholder="请输入职位其它信息"/>
      </el-form-item>
      <el-form-item label="工作福利" prop="jobLabelStr">
        <el-select
          v-model="formData.jobWelfareIds"
          multiple
          filterable
          default-first-option
          :reserve-keyword="false"
          placeholder="请选择工作福利"
          style="width: 240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.JOB_WELFARE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工作特色" prop="jobTese">
        <el-select
          v-model="formData.jobTeseIds"
          multiple
          filterable
          default-first-option
          :reserve-keyword="false"
          placeholder="请选择工作特色"
          style="width: 240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.JOB_TESE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工作类型" prop="jobType">
        <el-select
          v-model="formData.jobType"
          filterable
          default-first-option
          :reserve-keyword="false"
          placeholder="请选择工作类型"
          style="width: 240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.JOB_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="行业" prop="jobIndustryType">
        <el-select
          v-model="formData.jobIndustryType"
          filterable
          default-first-option
          :reserve-keyword="false"
          placeholder="请选择行业"
          style="width: 240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.JOB_INDUSTRY_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工作地址" prop="jobAddress">
        <el-cascader
          style="width: 240px"
          v-model="formData.jobAddress" :options="areaList" clearable
          :props="{value: 'id', label: 'name'}"
          @change="console.log(formData.jobAddress)">
          <template #default="{ node, data }">
            <span>{{ data.name }}</span>
            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
          </template>
        </el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="jobAddressDetail">
        <el-input v-model="formData.jobAddressDetail" placeholder="详细地址，例如：xx市xx区xx号"/>
      </el-form-item>
      <el-form-item label="学历要求" prop="eduValue">
        <el-select
          v-model="formData.edu"
          default-first-option
          placeholder="请选择学历"
          style="width: 240px">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.USER_EDU)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工作经验" prop="exp">
        <el-select
          v-model="formData.exp"
          default-first-option
          placeholder="请选择工作经验"
          @change="expChange"
          style="width: 240px">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.USER_EXP)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="残疾类别" prop="disTypeStr">
        <el-select
          v-model="formData.disTypeIds"
          default-first-option
          multiple
          placeholder="请选择残疾类别"
          style="width: 240px">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.DISABLED_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="formData.age" placeholder="请输入年龄"/>
      </el-form-item>
      <el-form-item label="专业" prop="major">
        <el-input v-model="formData.major" placeholder="请输入专业"/>
      </el-form-item>
      <el-form-item label="招聘状态" prop="jobStatus">
        <el-select
          v-model="formData.jobStatus"
          placeholder="请选择职位状态"
          style="width: 240px"
        >
          <el-option
            v-for="item in [
              {label: '急聘', value: 0},
              {label: '正常招聘', value: 1}
            ]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="招聘周期" prop="jobBeginEndDate">
        <el-date-picker
          v-model="formData.jobBeginEndDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import {JobApi, JobVO} from '@/api/xztx/job'
import {DICT_TYPE, getIntDictOptions} from '@/utils/dict'
import * as AreaApi from '@/api/system/area'

/** 招聘职位 表单 */
defineOptions({name: 'JobForm'})

const {t} = useI18n() // 国际化
const message = useMessage() // 消息弹窗
const areaList = ref([])
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  jobName: undefined,
  jobMinSalary: undefined,
  jobMaxSalary: undefined,
  jobDescription: undefined,
  jobRequirement: undefined,
  jobWelfareIds: undefined,
  jobOtherInfo: undefined,
  jobTeseIds: undefined,
  jobType: undefined,
  jobIndustryType: undefined,
  jobAddress: undefined,
  provinceId: undefined,
  cityId: undefined,
  threeCityId: undefined,
  jobAddressDetail: undefined,
  isCollegeStudent: undefined,
  edu: undefined,
  exp: undefined,
  disTypeIds: undefined,
  age: undefined,
  major: undefined,
  jobStatus: undefined,
  jobBeginEndDate: undefined,
  beginTime: undefined,
  endTime: undefined,
})
const formRules = reactive({})
const formRef = ref() // 表单 Ref

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
      formData.value = await JobApi.getJob(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({open}) // 提供 open 方法，用于打开弹窗
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
/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value
    // 将数组类型参数转换为以逗号分隔的字符串
    data.jobAddress = data.jobAddress.join(',')
    data.jobBeginEndDate = data.jobBeginEndDate.join(',')
    data.jobWelfareIds = data.jobWelfareIds.join(',')
    data.jobTeseIds = data.jobTeseIds.join(',')
    data.disTypeIds = data.disTypeIds.join(',')
    data.isCollegeStudent = data.isCollegeStudent === true ? '1' : '0'
    data.provinceId = (data.jobAddress[0] === null || data.jobAddress[0] === '') ? null : data.jobAddress[0]
    data.cityId = (data.jobAddress[1] === null || data.jobAddress[1] === '') ? null : data.jobAddress[1]
    data.threeCityId = (data.jobAddress[2] === null || data.jobAddress[2] === '') ? null : data.jobAddress[2]
    if (formType.value === 'create') {
      console.log(data)
      await JobApi.createJob(data)
      message.success(t('common.createSuccess'))
    } else {
      await JobApi.updateJob(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}
const expChange = async (value: number) => {
  if (value === 2 || value === 1) {
    formData.value.isCollegeStudent = true
  } else {
    formData.value.isCollegeStudent = false
  }
}
/** 重置表单 */
const resetForm = () => {
  formData.value = {
    jobName: undefined,
    jobMinSalary: undefined,
    jobMaxSalary: undefined,
    jobDescription: undefined,
    jobRequirement: undefined,
    jobLabelStr: undefined,
    jobOtherInfo: undefined,
    jobTese: undefined,
    jobType: undefined,
    jobIndustryType: undefined,
    jobAddress: undefined,
    jobAddressDetail: undefined,
    provinceValue: undefined,
    cityValue: undefined,
    threeCityValue: undefined,
    isCollegeStudent: undefined,
    eduValue: undefined,
    exp: undefined,
    disTypeStr: undefined,
    age: undefined,
    major: undefined,
    jobStatus: undefined,
    jobBeginEndDate: undefined,
    beginTime: undefined,
    endTime: undefined,
    createBy: undefined
  }
  formRef.value?.resetFields()
}
</script>
