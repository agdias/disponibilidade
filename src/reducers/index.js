import { combineReducers } from 'redux'

import {  servicesReducer } from './service' 
import { slaReducer }  from './service'



const rootReducer = combineReducers({
    
    services: servicesReducer,
    sla: slaReducer

  
   
})

export default rootReducer;

