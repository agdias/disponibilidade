export  function servicesReducer(state=[], action) {
    
    switch (action.type) {
        case 'ADD_SERVICES':
            return [
                ...state,
                 ...action.services
            ]
        default:
            return state
    }
}

export function slaReducer(state=[], action) {
    const { type, sla } = action
    switch ( type ) {
        case 'ADD_SLA':
            return {
                ...state,
                ...sla
            }
        default:
            return state;
    }
}