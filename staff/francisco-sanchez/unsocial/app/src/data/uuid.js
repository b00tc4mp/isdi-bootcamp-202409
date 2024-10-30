//Para los identificadores únicos de los usuarios y posts
export default () => (Date.now() + Math.random()).toString(36).replace('.', '')