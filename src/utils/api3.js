
export function fetchPosts() {
    const  endpoint = window.encodeURI('https://jsonplaceholder.typicode.com/posts')
    return fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
          if (!data) {
              throw new Error(data.message)
          }
          return data
      })
}


