import request from '@/utils/request'
import axios from './Axiosindex.js'
//http://192.168.0.31/platform/menu?uniflag=manager
//
export function getroutes() {
  return request({
    url: '/vue-admin-template/permission/getroutes',
    method: 'get'
  })
}


export function getroutest() {
  // http://192.168.0.31/platform/vuerouter?uniflag=Home&show=0
  return axios.request({
    url: '/api/platform/vuerouter?uniflag=Home&show=0',
    method: 'get'
  })
}
