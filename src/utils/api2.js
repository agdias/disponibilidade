const endpoint = window.encodeURI("http://10.0.40.174/zabbix/api_jsonrpc.php")

const headers = {
    "Content-Type":"application/json-rpc"
}

export function authenticate(username, password) {
    return fetch(endpoint, {
        headers: {...headers},
        method: "POST",
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "user.login",
            "params": {
                "user": username,
                "password": password
            },
            "id": 1,
            "auth": null
        })
    })
    .then(response => response.json())
    .then((data) => {
        if (!data) {
            throw new Error("Authentication failure")
        }
        return data.result
    })
    .catch((error) => {
        return error
    })

}


export function getServices(token) {
   
    return fetch(endpoint, {
        headers: {...headers},
        method: "POST",
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "service.get",
            "params": {
                "output": "extend",
                
                 //"selectDependencies": "extend", 
            },
            "auth": token,
            "id": 1
        })
    })
    .then((response) => response.json())
    .then((services) => {
        if (!services) {
            throw new Error("No services available!")
        }
        return services.result
    })
    .catch((error) => {
        return error
    })
}

export function getSLA(token,serviceids, start, end) {
   
    return fetch(endpoint, {
        method: "POST",
        headers: {...headers},
        body: JSON.stringify({
            "jsonrpc":"2.0",
            "auth": token,
            "id": "1",
            "method": "service.getsla",
            "params": {
                "serviceids": serviceids,
                "intervals": [
                    {
                        "from": start,
                        "to": end
                    }

                ]

            },
           
        })
    })
    .then(response => response.json())
    .then((result) => {
        if (!result) {
            throw new Error("Information not available")
        }

        return result
    })
}

export function getHostGroups(token) {
    return fetch(endpoint, {
        method: "POST",
        headers: {...headers},
        body: JSON.stringify({
            "jsonrpc":"2.0",
            "method":"hostgroup.get",
            "params": {
               "output": "extend",
               "filter": {
                   "name": [
                       "Roteadores"
                   ]
               }
            },
            "auth": token,
            "id": 1

        }
        )
    })
}


