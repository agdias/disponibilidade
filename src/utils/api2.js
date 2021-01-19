const endpoint = window.encodeURI("http://zabbixcpapphml01.intra.tjmg.gov.br/zabbix/api_jsonrpc.php")

const headers = {
    "Content-Type":"application/json"
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

export function getSLA(token, serviceids, start, end) {
    
    return fetch(endpoint, {
        method: "POST",
        headers: {...headers},
        body: JSON.stringify({
            "jsonrpc":"2.0",
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
            "auth": token,
            "id": 1
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


