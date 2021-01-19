import subDays from 'date-fns/subDays'

export const getPastDays = (days) => {

    const now = new Date()
    const day = now.getDate()
    let month = now.getMonth()
    const secs = now.getSeconds()
    const mins = now.getMinutes()
    const hours = now.getHours()
    
   
    const year = now.getFullYear()
    let result = subDays(new Date(`${year}-${month === 0 ? 1 : month}-${day} ${hours}:${mins}:${secs} GMT-0300`), 30)
   
   
    return Date.parse(result)
}