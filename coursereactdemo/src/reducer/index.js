import {combineReducers} from 'redux'
import categories from './categories'
import subcategories from './subcategories'
import auth from './auth'
import route from './route'

export default combineReducers({auth,categories,subcategories,route})