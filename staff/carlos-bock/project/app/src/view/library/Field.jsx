import './Field.css'

export default function Field({ children }) {
    console.log('Field -> render')

    return <div className='Field'>{children}</div>
}