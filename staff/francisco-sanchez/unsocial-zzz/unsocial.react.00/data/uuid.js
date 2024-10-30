//Para los identificadores únicos de los usuarios
const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '')

//Para los identificadores únicos de los posts
const postUuid = () => ('p_' + Date.now() + Math.random()).toString(36).replace('.', '')
