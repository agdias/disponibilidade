
const endpoint = window.encodeURI("http://zabbixcpapphml01.intra.tjmg.gov.br/zabbix/api_jsonrpc.php")

const headers = {
    "Content-Type":"application/json"
}

export async   function authenticate(user,password) {
	const res = await fetch(endpoint, {
		method: "POST",
		headers: { ...headers },
		body: JSON.stringify({
			"jsonrpc": "2.0",
			"method": "user.login",
			"params": {
				"user": user,
				"password": password
			},
			"id": 1,
			"auth": null
		})
	})
	const data = await res.json()
	if (!data) {
		throw new Error("Authentication process error")
	}
	return data
}


export async function fetchServices(token) {
  
    try {
		const data = await fetch(endpoint, {
			"method": "POST",
			"headers": { ...headers },
			"body": JSON.stringify({
				"jsonrpc": "2.0",
				"method": "service.get",
				"params": {
					"output": "extend",
					"selectDependencies": "extend"
				},
				"auth": token,
				"id": 1
			})
		})
		if (!data) {
			throw new Error("error fetching services")
		}
		return data
	} catch (error) {
		return console.log("ERROR:===>", error)
	}
}

export async function getServices(token) {
    
	let response = await fetch(endpoint, {
		"method": "POST",
		"headers": {...headers },
		"body": JSON.stringify({
			"jsonrpc": "2.0",
			"method":"service.get",
			"params": {
				"output": "extend",
				"selectDependencies": "extend"
			},
			"auth": token,
			"id": 1
		})
		
	})
	if (!response.ok) {
		throw new Error(`Error - status: ${response.status}`)
	}
	return response.json()
}