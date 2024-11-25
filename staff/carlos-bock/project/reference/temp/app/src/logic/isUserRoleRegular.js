//import { extractPayloadFromJWT } from '../util';

import util from '../util'

const { extractPayloadFromJWT } = util;

export default () => extractPayloadFromJWT(sessionStorage.token).role === 'regular';