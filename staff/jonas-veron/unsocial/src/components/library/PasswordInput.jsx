import { Component } from "react"

class PasswordInput extends Component{
    constructor(props) {
        super(props) //this.props = props

        this.state = { status: '😊', type: 'password'}
    }
    
    render() {
        return <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
            <input type={this.state.type} id={this.props.id} style={{width: '85%', boxSizing: 'border-box', marginLeft:'19px' }} />

            <span
                style={{ cursor: 'pointer', position: 'relative', right: '30px', fontSize: '16px'}}
                onClick={() => this.setState({
                    status: this.state.status === '😊' ? '😃' : '😊',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}>
                {this.state.status}{/* lo que se muestra en el span */}
            </span>
        </div>
    }
}

export default PasswordInput