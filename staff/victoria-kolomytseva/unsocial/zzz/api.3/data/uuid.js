const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '') //para generar id

export default uuid