import React from 'react'
import Report from './components/Report'
import { authenticate } from './utils/api2'



import  Availability  from './components/Availability'





class App extends React.Component  {
  constructor(props) {
    super(props)
    
    this.state = {
     token: null,
     error: null
    }
  }



  componentDidMount() {

    const { dispatch,services } = this.props
   
    //const user = "Admin_Zabbix"
    //const password = "Z@bB1Xx" 

    const user = "p4122982"
    const password = "l07u$20!3"
   
  
    authenticate(user,password)
      .then((token) => {this.setState({token})})
      .catch((error) => {
        this.setState({error})
      })
    
 
  }


  render() {
    const { token , error} = this.state
    
  
    return (
      <div className="App">
       
        { error && <p>{error}</p>}
         {token && <Report token={token} /> } 
        
      </div>

    )
    }

      
        
  
}



export default App
