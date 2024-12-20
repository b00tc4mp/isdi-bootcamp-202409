import { extractPayLoad } from '../../util'
export default () => extractPayLoad(sessionStorage.token).role === 'teacher'