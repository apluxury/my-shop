


/* 配置axios */
import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
axios.interceptors.request.use(config => {
    // console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // 在最后必须 return config
    return config
})
// Vue.prototype.$http=axios

/* 登录 */
export const login_api = (params) => {
    return axios.post("login", params)
}
/* 左侧导航 */
export const menus_api = (params) => {
    return axios.get("menus", params)
}
/* 获取用户列表 */
export const users_api = (params) => {
    return axios.get("users", { params });
}
/* 用户状态 */
export const usersStateChange_api = (params) => {
    return axios.put(`users/${params.uId}/state/${params.type}`);
}
/* 添加用户 */ 
export const adduser_api = (params) => {
    return axios.post("users",params);
}
/* 根据用户id查询用户 */ 
export const  editgetbyid_api = (params) => {
    return axios.get(`users/${params.id}`);
}













