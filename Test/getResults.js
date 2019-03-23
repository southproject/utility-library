import {array,add} from './instances'

import * as fnsIo from '../Process/fnsIo'


console.log(fnsIo.curry(add)(1)(2))