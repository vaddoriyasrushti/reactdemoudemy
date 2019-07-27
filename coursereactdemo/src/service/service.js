import baseService from './baseservice';

export function fetchcategories(){
    return baseService.get('/categories')
}

export function fetchsubcategoriesbyname(catname){
    return baseService.get('/subcategories/'+catname)
}

export function fetchsubcategoriesbyid(id){
    return baseService.get('/subcategories/id/'+id)
}
