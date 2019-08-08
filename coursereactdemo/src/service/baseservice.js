import axios from 'axios'
const baseUrl="http://192.168.200.158:3003"
const BaseService=axios.create({
    baseURL:baseUrl
})
export default BaseService