import axios from 'axios'
const baseUrl="http://localhost:3003"
const BaseService=axios.create({
    baseURL:baseUrl
})
export default BaseService