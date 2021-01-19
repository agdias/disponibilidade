import React from 'react'
import { connect } from 'react-redux'
import { getServices, getSLA } from '../utils/api2'
import { addServices } from '../actions'
import { Table } from 'semantic-ui-react'



class Services extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
        this.isLoading = this.isLoading.bind(this)
    }
    componentDidMount() {
        
      const { dispatch, token } = this.props
      getServices(token)
        .then(services => dispatch(addServices(services)))
        .catch((error) => this.setState({error}))
        
    }

    isLoading() {

        return this.state.error === null && this.props.services === null

    }

    render() {

        const { services } = this.props
       

        
        return (
           <React.Fragment>
               { this.isLoading() &&  <p>LOADING...</p> }   
              { this.state.error && <p>{this.state.error}</p>}
               
               {
                   services &&
                   <table className="table">
                       <thead>
                         <tr>
                           <th>Name</th>
                           <th>Status</th>
                         </tr>
                       </thead>
                       <tbody>
                       {
                           Object.keys(services).map((service) => {
                               return (
                                   <tr>
                                       <td>{services[service].name}</td>
                                       <td 
                                         bgcolor={services[service].status === "0" ? "green" : "red"}
                                        
                                         
                                       
                                       >
                                           {services[service].status === "0" ? "Normal" : "Failure"}
                                       </td>
                                   </tr>
                               )
                           })
                       }
                       </tbody>
                    
                       
                     
                   </table>
                   
               }
           
               
           </React.Fragment>

           

            
        )
    }
}

function mapStateToProps(state) {
    const { services } = state
   return {
       services
      
   }
}

export default connect(mapStateToProps)(Services)