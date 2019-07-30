import baseService from './baseservice'

export function postcartitem(data) {
    return baseService.post('/cart',data);
}
export function getcartitembyuserid(userid) {
    return baseService.get('/cart/'+userid);
}
export function deletecartitem(userid,catid) {
    return baseService.delete('/cart/'+userid+'/'+catid);
}
