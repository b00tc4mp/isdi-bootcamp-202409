import {Component} from 'react'

class PasswordInput extends Component {
    constructor(props) {
        console.log("PasswordInput -> constructor");
        //este props recibe el id de input linea 65 
        super(props);
        //se le añade status y type como propiedades internas del objeto
        this.state = { status: "😌", type: "password", length: 0 };
    }
    //render 
    render() {
        console.log("PasswordInput -> render");
        //aqui comienza a imprimir lo que es
        return <div  class="form-control " style={{ display: "flex" }}>
            <input  type={this.state.type} id={this.props.id} placeholder={this.props.placeholder}  />
            <span
                style={{ cursor: "pointer", right: "10px" }}
                onClick={() => this.setState({
                    //length++ no funciona
                    length: this.state.length + 1,
                    //esto es un if----------------------desp------sino dormido
                    status: this.state.status === "😌" ? "😳" : "😌",
                    //si el tipo es password al hacer click lo cambio por text
                    type: this.state.type === "password" ? "text" : "password"
                })}
            //dinamico
            >{this.state.status}

                {/* <input type={this.state.type} id={this.props.id} style={{ width: "100%", boxSizing: "border-box", paddingRight: "18px" }} /> */}

            </span>
            <span>
                {/* {alert ("increible")/* contenido  */}
                {this.state.length}
            </span>

        </div>
    }

}

export default PasswordInput