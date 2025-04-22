//import { extractPayloadFromJWT } from '../util/index.js';
import util from '../util'

const { extractPayloadFromJWT } = util;
export default () => extractPayloadFromJWT(sessionStorage.token).sub;