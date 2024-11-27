import {Button} from '../library'

import logic from '../../logic'

import './Header.css'
import { Component } from 'react'


class Header extends Component {
    constructor (props) {
        console.log('Header -> constructor')

        super(props);

        this.state = {name: null};
    }

    componentDidMount() {
        console.log('Header -> componentDidMount');

        if(logic.isUserLoggedIn())
            try {
                logic.getUserName((error,name) => {
                    if (error) {
                        alert(error.message);

                        console.error(error);

                        return;
                    }

                    this.setState({name});
                });
            } catch (error) {
                alert(error.message);

                console.error(error);
            }
    }

    handleHomeClick = event => {
        event.preventDefault();

        this.props.onHomeClick();
    }

    handleLogout = () => {
        if (confirm ('Logout?')) {
            logic.logoutUser();

            this.props.onLoggedOut();
        }
    }

    render() {
        console.log('Header -> render');

        return <header className='header'>
            <h1>{this.props.view === 'new-post' ? <a href='' onClick={this.handleHomeClick}>unSocial</a>: 'unSocial'}</h1>

            {this.state.name && <h3>{this.state.name}</h3>}

            {logic.isUserLoggedIn() && <Button type="button" onClick={this.handleLogout}>Logout</Button>}
        </header>
    };
};

export default Header;