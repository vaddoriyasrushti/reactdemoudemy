import baseService from './baseservice';

export function fetchcategories(){
    return baseService.get('/categories')
}

export function fetchallsubcategories(){
    return baseService.get('/subcategories')
}

export function fetchsubcategoriesbyname(catname){
    return baseService.get('/subcategories/'+catname)
}

export function fetchsubcategoriesbyid(id){
    return baseService.get('/subcategories/id/'+id)
}
export function fetchsubcat(){
    return baseService.get('/subcat')
}
export function postsubcategory(formData){
    console.log("dataservice",formData)
    return baseService.post('/subcategories',formData)
}
 