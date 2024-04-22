import request from '@/config/axios'

// 招聘岗位 VO
export interface JobVO {
  jobName: string // 岗位名称
  jobSalary: number // 岗位薪资
  jobMinSalary: number // 岗位起始薪资
  jobMaxSalary: number // 岗位最高薪资
  jobDescription: string // 岗位描述
  jobRequirement: string // 岗位要求
  jobLabelStr: string // 岗位标签
  jobOtherInfo: string // 岗位其它信息
  provinceValue: string // 省 字典值
  cityValue: string // 市 字典值
  threeCityValue: string // 县/区级 字典值
  isCollegeStudent: string // 是否招聘应届生
  eduValue: string // 学历 字典值
  exp: string // 工作经验
  disTypeStr: string // 残疾类别字符串
  age: number // 年龄
  major: string // 专业
  jobStatus: string // 岗位状态
  beginTime: Date // 招聘开始时间
  endTime: Date // 招聘结束时间
  createBy: number // 发布者id
}

// 招聘岗位 API
export const JobApi = {
  // 查询招聘岗位分页
  getJobPage: async (params: any) => {
    return await request.get({ url: `/xztx/job/page`, params })
  },

  // 查询招聘岗位详情
  getJob: async (id: number) => {
    return await request.get({ url: `/xztx/job/get?id=` + id })
  },

  // 新增招聘岗位
  createJob: async (data: JobVO) => {
    return await request.post({ url: `/xztx/job/create`, data })
  },

  // 修改招聘岗位
  updateJob: async (data: JobVO) => {
    return await request.put({ url: `/xztx/job/update`, data })
  },

  // 删除招聘岗位
  deleteJob: async (id: number) => {
    return await request.delete({ url: `/xztx/job/delete?id=` + id })
  },

  // 导出招聘岗位 Excel
  exportJob: async (params) => {
    return await request.download({ url: `/xztx/job/export-excel`, params })
  }
}