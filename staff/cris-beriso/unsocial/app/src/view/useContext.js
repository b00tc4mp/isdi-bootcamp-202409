import { createContext, useContext } from 'react'

export const Context = createContext()

export default () => useContext(Context)