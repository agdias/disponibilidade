import React from 'react'
import { connect } from 'react-redux'
import { addToken } from './actions'
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
   
    const user = "Admin_Zabbix"
    const password = "Z@bB1Xx" 
   
  
    authenticate(user,password)
      .then((token) => {this.setState({token})})
      .catch((error) => {
        console.log(error)
      })
    
 
  }


  render() {
    const { token, error } = this.state
  
    return (
      <div className="App">
        { error && <p>{error}</p>}
        {token && <Availability token={token} /> }
        
      </div>

    )
    }

      
        
  
}



export default App
