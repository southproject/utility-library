function add1(x) {
	return x * x
}

function add2(x) {
	return x + 7
}

function add3(x) {
	return x + 1
}

function add(x,y){
	return x + y
}
const array = [add1, add2, add3]
export {array,add}