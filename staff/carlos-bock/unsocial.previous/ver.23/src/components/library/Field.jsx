import './Form.css'

const Field = ({children}) => {
    console.log('Field -> render')

    return <div className="Field">{children}</div>
}
export default Field