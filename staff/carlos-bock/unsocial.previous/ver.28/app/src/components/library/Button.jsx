import './Button.css'

const Button = ({type, children, theme, onClick}) => {
    //console.log('Button -> render')

    return <button type={type} className={`Button ${theme === 'light' ? 'Button--light':''}` }onClick={onClick}>{children}</button>
}

export default Button