import axios from 'axios'
const baseUrl="http://192.168.0.102:3003"
const BaseService=axios.create({
    baseURL:baseUrl
})
export default BaseService