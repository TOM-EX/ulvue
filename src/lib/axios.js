import axios from 'axios'
import { baseURL } from '@/config'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

class HttpRequest{
  constructor(baseUrl = baseURL) {
      this.baseUrl = baseUrl
      this.qeue = {}
  }
  getInsideConfing(){
    const config = {
      baseUrl : this.baseUrl,
       // timeout: 5000 ,
      headers:{

      }
    }
    return config
  }
  // axios请求拦截器
  interceptors( instance ){
    instance.interceptors.request.use(config=>{
      // if(store.getters.token){
      //   config.headers['X-Token'] = getToken()
      // }
      return config
    },err=>{
    return Promise.reject(err)
  })
  // axios响应拦截器
  instance.interceptors.response.use(res=>{
     let { data , status } = res
     if( status !==200 ) {
       Message({
         message: res.message || 'Error',
         type: 'error',
         duration: 5 * 1000
       })

       // 50008:非法令牌;50012:已登录其他客户端;50014:令牌过期
       // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
       if (status === 50008 || status === 50012 || status === 50014) {
         // to re-login 您已经登出，您可以取消停留在此页面，或再次登录'，'确认登出'
         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
           confirmButtonText: 'Re-Login',
           cancelButtonText: 'Cancel',
           type: 'warning'
         }).then(() => {
           store.dispatch('user/resetToken').then(() => {
             location.reload()
           })
         })
       }
     }else {
        return  data
     }
     // return { data,status }
    },error=>{
      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
        return Promise.reject(error)
    })
   }
   request(options){
     const instance = axios.create()
     options = Object.assign(this.getInsideConfing(),options)
     this.interceptors(instance,options)
     return instance(options)
   }
  }
  export default HttpRequest
