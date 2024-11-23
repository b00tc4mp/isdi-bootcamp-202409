import { useParams } from 'react-router-dom'
import './Hello.css'
export default function Hello() {
  console.log('Hello -> Render')

  const { name } = useParams()

  return <main className='Hello py-20 flex items-center justify-center flex-col h-full bg-white'>
    <h1>Hello, {name} !</h1>
  </main>

}