import request from '@/utils/request'
import axios from '@/api/Axiosindex.js'
export function getList(params) {
  return request({
    url: '/vue-admin-template/banner/list',
    method: 'get',
    params
  })
}

export const dataTypeManageList = (params) => {
   return axios.request({
      url:'http://192.168.0.31/platform/entitylist',
      method:'post',
      data:params
   })
}


export const dataTypeManageSave = (params) => {
   return axios.request({
      url:'http://192.168.0.31/platform/ctrlmthdcaller?typeid=objectoperator&mthdname=saveObject',
      method:'post',
      data:params
   })
}
