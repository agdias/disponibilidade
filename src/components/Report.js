import React from 'react'
import { connect } from 'react-redux'
import { getServices , getSLA} from '../utils/api2'
import { addServices, addSLA } from '../actions'

import { Button,
         Form,
         Table} from 'semantic-ui-react'


import  DatePicker  from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import pt from  'date-fns/locale/pt-BR'


class Report extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: null,
            endDate: null,
            serviceids: [],
            result: null,
            error: null
        }
        this.onEndDateChangeHandler = this.onEndDateChangeHandler.bind(this)
        this.onStartDateChangeHandler = this.onStartDateChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.calcSLA = this.calcSLA.bind(this)

    }

    onStartDateChangeHandler(date) {

        const now = Date.parse(date)
        this.setState({startDate:now})

    }

    onEndDateChangeHandler(date) {
        const now = Date.parse(date)
        this.setState({endDate:now})
    }

    onSubmitHandler(e) {
       const {  sla,   services, token, dispatch } = this.props
       const { startDate, endDate } = this.state

       e.preventDefault()
      
       services && 
       Object.keys(services).forEach((service) => {
           getSLA(token, services[service].serviceid, startDate/1000, endDate/1000)
             .then((response) => dispatch(addSLA(response.result)))
       })

       

      
    }

     calcSLA(serviceid) {

        const { token, startDate, endDate } = this.state

           getSLA(token, serviceid, startDate, endDate)
             .then((result) => {
                 return result.sla[serviceid].status
             })
             .catch(error => console.log(error))
        
    }





    componentDidMount() {
        const { dispatch, token} = this.props
        getServices(token)
          .then((services) => dispatch(addServices(services)))
          .catch((error) => this.setState({error:"Error"}))

    }

    componentDidUpdate(prevProps) {
        
        prevProps !== this.props && console.info(prevProps)
 
       
       
        

       
    }


 
       
        
    

    render() {
        const { services, sla } = this.props
       
        
        return (
            <React.Fragment>
                
                    
                    <div> 
                      <Form  className="heading" onSubmit={this.onSubmitHandler}> 
                          <Form.Group inline>
                            <Form.Field
                              control={DatePicker}
                              locale={pt}
                              label="Start"
                              placeholder="Data Inicial"
                              selected={this.state.startDate}
                              onChange={(date) => this.onStartDateChangeHandler(date)}
                            />
                            <Form.Field
                              control={DatePicker}
                              locale={pt}
                              label="End"
                               placeholder="Data Final"
                              selected={this.state.endDate}
                              onChange={(date) => this.onEndDateChangeHandler(date)}
                            />
                               <Button  color="instagram" type="submit">Consultar</Button>   
                          </Form.Group>
                      </Form>
                    </div>
                    {
                        sla &&
                        <div className="reports">
                            <Table celled>
                               <Table.Header>
                                   <Table.Row>
                                       <Table.HeaderCell>Roteador</Table.HeaderCell>
                                       <Table.HeaderCell>Service Id</Table.HeaderCell>
                                       <Table.HeaderCell>Meta (%)</Table.HeaderCell>
                                       <Table.HeaderCell>SLA (%)</Table.HeaderCell>
                                   </Table.Row>
                               </Table.Header>
                               <Table.Body>
                                   {
                                       
                                       Object.keys(services).map((service) => {
                                           const si = services[service].serviceid
                                           return (
                                              <Table.Row>
                                                 <Table.Cell>{services[service].name}</Table.Cell>
                                                 <Table.Cell>{services[service].serviceid}</Table.Cell>
                                                 <Table.Cell>{services[service].goodsla}</Table.Cell>
                                                
                                                 
                                                
                                               
                                                
                                                
                                                  
                                                 
                                              </Table.Row>
                                           )
                                           
                                       })
                                   }
                                  
                               </Table.Body>
                        </Table>


                  }
                      
                     

                    
                  
              </div>
          
                    }
                
            </React.Fragment>
    
        
        )
    }
}

function mapStateToProps(state) {
    const { services, sla } = state
    return {
        services, 
        sla
    }
}

export default connect(mapStateToProps)(Report);