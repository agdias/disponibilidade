import { combineReducers } from 'redux'
import { tokenReducer } from './token'
import {  servicesReducer } from './service' 
import { slaReducer }  from './service'
import { postsReducer } from './posts'


const rootReducer = combineReducers({
    
    services: servicesReducer,
  
   
})

export default rootReducer;

