import {array,add} from './instances'

import * as fnsIo from '../Process/fnsIo'


//console.log(fnsIo.curry(add)(1)(2))

console.log(fnsIo.map_([1,2,3],function(i){return i+1}))