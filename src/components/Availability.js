import React from 'react'
import { connect } from 'react-redux'
import { getServices, getSLA } from '../utils/api2'
import { addServices } from '../actions'
import { Button,
         Form,
         Select } from 'semantic-ui-react'
import { subDays } from 'date-fns'

class Availability extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: null,
            error: null,
            serviceid: null,
            period: "diario"
            
        }

        this.buildOptions = this.buildOptions.bind(this)
        this.onServiceChangeHandler = this.onServiceChangeHandler.bind(this)
        this.onPeriodChangeHandler = this.onPeriodChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.timeFactor = this.timeFactor.bind(this)
    }

    componentDidMount() {
        const { dispatch, token } = this.props
        getServices(token)
          .then((services) => dispatch(addServices(services)))
          .catch((error) => this.setState({error:"Error"}))

        this.buildOptions()

        

    }

   onSubmitHandler(e) {
       const {  serviceid } = this.state
       const { token } = this.props
       e.preventDefault()
       const tf = this.timeFactor()
       const today = Date.now()

       getSLA(token, serviceid,tf, today)
         .then((result) => console.info(result,"***"))
       
   }
   onServiceChangeHandler(event, { value }) {   
       this.setState({serviceid:value})
    }

    onPeriodChangeHandler(event, {value}) {
        this.setState({period:value})
    }

    timeFactor() {
        const { period } = this.state
        const now = new Date()
        const year = now.getFullYear()
        const day = now.getDate()
        let month = now.getMonth()
        const secs = now.getSeconds()
        const mins = now.getMinutes()
        const hours = now.getHours()


        //   let result = subDays(new Date(`${year}-${month === 0 ? 1 : month}-${day} ${hours}:${mins}:${secs} GMT-0300`),6)
        switch (period) {
            case "diario":
                
                return Date.parse(subDays(new Date(`${year}-${month === 0 ? 1 : month}-${day} ${hours}:${mins}:${secs} GMT-0300`),1))
            case "mensal":
                return  Date.parse(subDays(new Date(`${year}-${month === 0 ? 1 : month}-${day} ${hours}:${mins}:${secs} GMT-0300`),30))
            case "anual":
                return Date.parse(subDays(new Date(`${year}-${month === 0 ? 1 : month}-${day} ${hours}:${mins}:${secs} GMT-0300`),365))
            default:
                return 99

        }
    }

    





    buildOptions() {
        const { services } = this.props
        let list = []
        services &&
        Object.keys(services).forEach((service) => {
          list.push({
              key: services[service].serviceid,
              value: services[service].serviceid,
              text: services[service].name
          })
        })
       return list
       
    }
    render() {
        const { token, error, list } = this.state
        const { services } = this.props
        const options = list
        

        { error && <p>{error}</p>}
        const periodo = [
            {
                "key":"1",
                "value":"diario",
                "text":"Diário"
            },
            {
                "key":"2",
                "value":"mensal",
                "text":"Mensal"
            },
            {
                "key":"3",
                "value":"anual",
                "text":"Anual"
            },

        ]
        
        return (
            
              <div>
                  <div className="services">

                  
                  <Form onSubmit={this.onSubmitHandler}>
                      <Form.Group inline>
                          {
                              this.buildOptions() &&
                              <Form.Field

                              control={Select}
                              onChange={this.onServiceChangeHandler}
                              label="Serviço"
                              placeholder="Serviço"
                              options={this.buildOptions()}
                            />
                          }
                          <Form.Field
                            control={Select}
                            onChange={this.onPeriodChangeHandler}
                            label="Período"                           
                            placeholder="Período"
                            options={periodo}
                          />
                         <Button  color="blue" type="submit">Consultar</Button>      
                       </Form.Group>
                  </Form>
                </div>
                <div className="results">
                 
                </div>
              </div>
        )
    }
}

function mapStateToProps(state) {
    const { services } = state
    return {
        services
    }

}

export default connect (mapStateToProps)(Availability)