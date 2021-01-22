

export  function addToken(token) {
  return {
      type: 'ADD_TOKEN',
      token
  }
}

export  function addServices(services) {
   
    return {
        type: 'ADD_SERVICES',
        services
    }
}

export function addSLA(sla) {
    return {
        type: 'ADD_SLA',
        sla
        
    }
}





