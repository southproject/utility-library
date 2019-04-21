import {array,add} from './instances'

import * as fnsIo from '../Process/fnsIo'


//console.log(fnsIo.curry(add)(1)(2))
var aa = fnsIo.mapp([1,2,3],(i)=>i+1)
console.log(aa)