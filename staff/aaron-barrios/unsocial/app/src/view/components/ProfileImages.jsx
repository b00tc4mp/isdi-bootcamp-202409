import { Component } from 'react'

import logic from '../../logic'

import './ProfileImages.css'

export default class extends Component {

    constructor(props) {
        super(props)

        this.state = { view: 'images' }
    }

    changeMoe = () => {
        this.props.onChangeMoe()
    }


    changeRalph = () => {
        this.props.onChangeRalph()
    }

    changeHomer = () => {
        this.props.onChangeHomer()
    }

    changeSmithers = () => {
        this.props.onChangeNed()
    }


    render() {
        return <section className='ProfPics'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFbHnn7AVO9fizBYGUO79nY30cT0haNFwtFA&s"
                onClick={this.changeMoe} />

            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT96elqZ0Ksj9o-_hQC3RhkZtBeswnPFBusvg&s"
                onClick={this.changeRalph} />

            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpdDFZR-vvOvs7krz_HKu5kk1VQv1Iv9_w5A&s"
                onClick={this.changeHomer} />


            <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/10/Ned-Flanders-in-The-Simpsons.jpg"
                onClick={this.changeSmithers} />

        </section>
    }
}