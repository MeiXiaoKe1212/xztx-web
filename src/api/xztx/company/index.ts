import request from '@/config/axios'

// 携智同行 企业 VO
export interface CompanyVO {
  name: string // 企业名称
  contactPhone: string // 联系人手机号
  contactPerson: string // 联系人姓名
  contactEmail: string // 联系人邮箱
  location: string // 企业地址
  scale: string // 企业规模
  status: number // 状态（0停用，1正常）
}

// 携智同行 企业 API
export const CompanyApi = {
  // 查询携智同行 企业分页
  getCompanyPage: async (params: any) => {
    return await request.get({ url: `/xztx/company/page`, params })
  },

  // 查询携智同行 企业详情
  getCompany: async (id: number) => {
    return await request.get({ url: `/xztx/company/get?id=` + id })
  },

  // 新增携智同行 企业
  createCompany: async (data: CompanyVO) => {
    return await request.post({ url: `/xztx/company/create`, data })
  },

  // 修改携智同行 企业
  updateCompany: async (data: CompanyVO) => {
    return await request.put({ url: `/xztx/company/update`, data })
  },

  // 删除携智同行 企业
  deleteCompany: async (id: number) => {
    return await request.delete({ url: `/xztx/company/delete?id=` + id })
  },

  // 导出携智同行 企业 Excel
  exportCompany: async (params) => {
    return await request.download({ url: `/xztx/company/export-excel`, params })
  }
}