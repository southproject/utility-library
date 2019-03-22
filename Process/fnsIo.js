//pipe

const pipe = (...fns) => (x) => fns.reduce((f,g) => {g(f)},x)

//compose

const compose = (...fns) => fns.reduce((f,g) => {(...args) => g(f(...args))})
//this is a more flexible method could exchange f and g 

//curry


export {pipe,compose}