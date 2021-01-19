import React from 'react'

import Header from './Header'


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            token: null
        }
    }
    render() {
        return (
            <div className="App">
               <header className="hero">header</header>
               <div className="content">
                 <div className="master"><Reports token={token} /></div>
                 <div className="detail">Detail</div>
               </div>
               <footer className="footer">footer</footer>
            </div>
        )
    }
}

export default App;