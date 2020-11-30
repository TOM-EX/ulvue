import axios from './Axiosindex.js'
import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function getList(params) {
  return request({
    url: '/vue-admin-template/user/list',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

//线上接口
export const menulist = (params) =>{
   return axios.request({
      url:'http://192.168.0.31/platform/entitytree',
      method:'post',
      data:params
   })
}


// export function menulist(params){
//   return axios.request({
//      url:'/api/platform/entitytree',
//      method:'post',
//      data:params
//   })
// }



export const saveObject = (params) => {
   return axios.request({
      url:'http://192.168.0.31/platform/ctrlmthdcaller?typeid=objectoperator&mthdname=saveObject',
      method:'post',
      data:params
   })
}
