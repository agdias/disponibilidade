

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

export function getSLA(sla) {
    return {
        type: 'ADD_SLA',
        sla
    }
}



export function addBulkPosts(posts) {
    return {
        type: 'ADD_BULK_POSTS',
        posts
    }
}

