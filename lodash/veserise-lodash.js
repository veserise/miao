var veserise = function () {

	/**
	 * chunk
	 * @param ary {Array}
	 * @param size {Number}
	 * @return  {Array}
	 *
	 *@example
	 * chunk([1,2,3,4] , 3)
	 * chunk([1,2,3,4])
	*/
	function chunk(ary, size = 1){
		if ( size == 1 ) return ary
		var result  = [] , i = 0
		while (i < size){
			result.push(ary.shift())
			i++
		}
		return [result, ary]
	}

	/**
	 * compact
	 * @param ary {Array}
	 * @return  {Array}
	 *
	 *@example
	 * compact([1,2,3,4])
	 * compact(['1','2','3','4'])
	*/
	function compact(ary){
		 return ary.filter(it => it)
	}

	/**
	 * compact
	 * @param ary {Array}
	 * @param value {Numbers}
	 * @return  {Array}
	 *
	 *@example
	 * compact([1,2,3],1,[2,3])
	 * compact(['1','2','3','4'],[[3]])
	*/
	function concat ( ary , ...value){
		var result = []
		for (var i = 0; i < ary.length; i++) {
			result.push(ary[i])
		}
		result.push(...value)
		return result
	}

	/**
	 * difference
	 * @param ary {Array}
	 * @param value {Numbers}
	 * @return  {Array}
	 *
	 *@example
	 * difference([1,2,3],[1],[2,3])
	 * difference(['1','2','3','4'],[3])
	*/
	function difference( ary, ...value){
		var result = [] , jum = []
		for (var i = 0; i < value.length; i++) {
			for (var j = 0; j < value[i].length; j++) {
				result.push(value[i][j])
			}
		}

		for (var i = 0; i < ary.length; i++) {
			if ( !(result.includes(ary[i])) ){
				jum.push(ary[i])
			}
		}
		return jum
	}

	/**
	 * differenceBy
	 * @param ary {Array}
	 * @param value {Numbers}
	 * @return  {Array}
	 *
	 *@example
	 * differenceBy([[1,2,3],[1],[2,3]],f())
	 * differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x')
	*/
	function differenceBy(ary, ...values){
		var itera = last(values)
		if( Array.isArray(itera) ) itera = undefined 

		var value = values.slice(0, values.length - 1)[0]
		var result = [] , jum = []

		if ( typeof itera == 'function' ){
			for (var i = 0; i < value.length; i++) {
				jum.push( itera(value[i]) )
			}
			for (var i = 0; i < ary.length; i++) {
				var s = itera(ary[i])
				if( !jum.includes(s) ){
					result.push(ary[i])
				}
			}
			return result
		}
		if( typeof itera == 'string' ){
			var str = flattenDeep(value).map(i => i[itera])
			return ary.filter(item => !str.includes(item[itera]))
		}
		if( typeof itera  == 'undefined') return difference( ary ,...values)
	}



	function drop(ary, n = 1){
		if( ary.length == 0 ) return undefined
		var result = []
		for (var i = n; i < ary.length; i++) {
			result.push(ary[i])
		}
		return result
	}

	function dropRight(ary , n = 1){
		if( ary.length == 0 ) return undefined
		var result = []
		for (var i = 0; i < ary.length - n; i++) {
			result.push(ary[i])
		}
		return result
	}

	/**
	 * reverse
	 * @param ary {Array} 
	 * @return  {Array} 
	*/
	function fill(ary, value, start = 0, end = ary.length){
		var res = []
		for (var i = 0; i < ary.length; i++) {
			if (i >= start && i < end ) {
				ary[i] = value
			}
			res.push(ary[i])
		}
		return res
	}


	function flip (f){
		return function(...args){
			return f(...args.reverse() )
		}
	}

	/**
	 * reverse
	 * @param ary {Array} 
	 * @return  {Array} 
	*/
	function reverse(ary){
		var result = []
		for (var i = ary.length - 1; i >= 0; i--) {
			result.push(ary[i])
		}
		return result
	}

	/**
	 * head
	 * @param ary {Array} 
	 * @return  {} return the first data in array 
	*/
	function head(ary){
		if( ary.length == 0 ) return undefined
		return ary[0]
	}

	/**
	 * last
	 * @param ary {Array} 
	 * @return {Number} the last data in array
 	*/
	function last(ary){
		if(ary.length == 0) return undefined
		return ary[ary.length-1]
	}


	/**
	 * indexOf
	 * @param ary {Array} 
	 * @param value {Number} 
	 * @return {Number} return the value' position in array 
	*/
	function indexOf(ary, value , fromIndex = 0){
		if( ary.length == 0 ) return undefined
		for (var i = fromIndex; i < ary.length; i++) {
			if ( ary[i] == value){
				return i
			}
		}
		return -1
	}

	/**
	 * join
	 * @param ary {Array} 
	 * @return {string} 
 	*/
	function join(ary, string = ","){
		var str = ''
		for (var i = 0; i < ary.length; i++) {
			if(i == ary.length - 1){
				str +=''+ ary[i]
			}else{
				str += '' + ary[i] +''+ string
			}
		}
		return str
	}

	
	/**
	 * reduce
	 * @param ary {Array} 
	 * @return {} 
 	*/
	function reduce(ary, calc, initial = 0){
		var i = 0
		for ( i in ary ) {
			initial = calc(initial ,ary[i], i)
		}
		return initial
	}

	/**
	 * reduce
	 * @param ary {Array} 
	 * @return {} 
 	*/
	function filter(ary, test){
		var result = []
		if( typeof test == 'function'){
			for (var i = 0; i < ary.length; i++) {
				if ( test(ary[i], i, ary) ){
	                 result.push(ary[i])
				}
			}
		}
		if( typeof test == 'string'){

		}
		
		return result
	}

	/**
	 * slice
	 * @param ary {Array} 
	 * @param start {Number} 
	 * @param end {Number} 
	 * @return {Array} return the data in range of [start, end) in array
 	*/
	function slice(ary, start, end){
		var result = []
		for (var i = start; i < end; i++) {
			result.push(ary[i])
		}
		return result
	}

	/**
	 * forEach
	 * @param ary {Array} 
	 * @return {Array} 
 	*/
	function forEach( ary, action){
		for (var i = 0; i < ary.length; i++) {
			action(ary[i])
		}
		return ary
	}

	/**
	 * map
	 * @param ary {Array} 
	 * @param key {}
	 * @return  {[]} 
	*/
	function map ( ary, mapper ){
		var result = []
		if (typeof mapper == 'function'){
			if(typeof ary == 'array'){
				for ( var key in ary ) {
					var s = mapper( ary[key], key, ary )
					result.push(s)
				}
			} 
			if( typeof ary == 'object' ){
				for (var i = 0; i < ary.length; i++) {
					var s = mapper(ary[i], i, ary )
					result.push(s)
				}
			}
			
			return result
		}
		if ( typeof mapper == 'string'){
			var s = mapper.split(".")
			var x = s[0] , y = s[1]
			if( y ){
				for (var key in ary) {
					if( x in ary[key] ){
						result.push(ary[key][x][y])
					}
				}
			}else{
				for (var key in ary) {
					if( x in ary[key] ){
						result.push(ary[key][x])
					}
				}
			}

			return result
		}
	}

	/**
	 * keyBy
	 * @param ary {Array} 
	 * @param key {}
	 * @return  {[]} 
	*/
	function keyBy (ary, key){
		var result = {}
		if( typeof key == 'string'){
			ary.forEach(item =>{
				result[ item[key] ] = item
			})
		}
		if( typeof key == 'function'){
			ary.forEach(item =>{
				result[ key(item) ] = item
			})
		}
		
		return result
	}

	/**
	 * hasOdd
	 * @param ary {Array} 
	 * @param arg {}
	 * @return  {boolean} the odd data exsited in ary
	*/
	function hasOdd (ary){
		var has = false
		forEach(ary, function(it) {
			if (it % 2){
				has = true
				return false
			}
		})
		return has
	}

	/**
	 * before
	 * @param f {function} 
	 * @param n {Number}
	 * @return  {} return the data range of [0 , n)
	*/
	function before (n , func){
		var c = 0 , last 
		return function(...args){
			c++
			if(c < n){
				return last = func(...args)
			}else{
				return  last
			}
		}
	}

	/**
	 * after
	 * @param f {function} 
	 * @param n {Number}
	 * @return  {} return the data range of [n,Infinity)
	*/
	function after (n , func){
		var c = 0
		return function(...args){
			c++
			if(c < n){
				return func()
			}else{
				return func(...args)
			}
		}
	}

	/**
	 * ary
	 * @param f {function} slice the data range of [0 , n) in array
	 * @param n {Number}
	 * @return  {}
	*/
	function ary (f , n = f.length){
		return function(...args){
			return f(...args.slice(0, n) )
		}
	}


	/**
	 * unary
	 * @param f {function} slice the first data in array
	 * @param arg {}
	 * @return  {}
	*/
	function unary (f){
		return ary(f, 1)
	}

	/**
	 * bind
	 * @param f {function} remain the first data 
	 * @param arg {}
	 * @return  {}
	*/
	function  bind (f){
		var args = Array.from(arguments)
		return function(){
			var arg = Array.from(arguments)
			return f.apply(null, args.concat(arg))
		}
	}

	/**
	 * spread
	 * @param f {function} spread out the data 
	 * @param arg {}
	 * @return  {}
	*/
	function spread (f) {
		return function(ary){
			return f.apply(null, ary)
		}
	}

	/**
	 * memoize
	 * @param f {function} remain the data of input
	 * @param arg {}
	 * @return  {}
	 *
	*/
	function memoize (f) {
		var map = {}
		return function(arg){
			if(arg in map){
				return map[arg]
			}else{
				map[arg] = f(arg)
				return map[arg]
			}
		}
	}

	/**
	 * curry
	 * @param f {function}
	 * @return  {f}
	 *
	*/
	function curry ( f , arity = f.length , gd ) { 
		arity = gd ? undefined : arity
		var s = []
		return function(){
			var arg = Array.from(arguments)
			if( arg.length == arity ){
				return f.apply(null, s)
			}else{
				s = s.concat(arg)
				return f
			}
		}
	}

	/**
	 * every
	 * @param ary {Array}
	 * @param test {function}
	 * @return  {boolean}
	*/
	function every(ary, test){
		for (var i = 0; i < ary.length; i++) {
			if( ! test(ary[i], i ,ary) ){
				return false
			}
		}
		return true
	}

	/**
	 * some
	 * @param ary {Array}
	 * @param test {function}
	 * @return  {boolean}
	*/
	function some (ary, test){
		for (var i = 0; i < ary.length; i++) {
			if( test(ary[i], i , ary) ){
				return true
			}
		}
		return false
	}

	/**
	 * negate
	 * @param f {function}
	 * @param ...arge {Numbers}
	 * @return  {function}
	 *
	 *@example
	 * f = isOdd()
	 * f = isEven()
	*/
	function negate (f){
		return function(...arg){
			return !f(...arg)
		}
	}

	/**
	 * isArguments
	 * @param val {object/ number/fucntion / string }
	 * @return  {true / false}
	*/
	function isArguments(value){
        return Object.prototype.toString.call(value) === '[object Arguments]'
    }

	/**
	 * isArray
	 * @param val {object/ number/fucntion / string }
	 * @return  {true / false}
	*/
	function isArray(value){
        return Object.prototype.toString.call(value) === '[object Array]'
    }

    /**
	 * isBoolean
	 * @param val {object/ number/fucntion / string }
	 * @return  {true / false}
	*/
	function isBoolean(value){
		return Object.prototype.toString.call(value) == '[object Boolean]'
    }

    /**
	 * isDate
	 * @param val {object/ number/fucntion / string }
	 * @return  {true / false}
	*/
	function isDate(value){
        return Object.prototype.toString.call(value) == '[object Date]'
    }

    /**
	 * isDate
	 * @param val {object/ number/fucntion / string }
	 * @return  {true / false}
	*/
	function isDate(value){
        return Object.prototype.toString.call(value) == '[object Date]'
    }

    /**
	 * isElement
	 * @param str {object/ number/fucntion / string }
	 * @return  {true / false}
	*/
	function isElement (value) {
		return Object.prototype.toString.call(value) == '[object HTMLBodyElement]'
	}

	/**
	 * isEmpty
	 * @param str {object/ number/fucntion / string }
	 * @return  {true / false}
	*/
	function isEmpty (value) {
		 if(value == true || value == false || value == null) return true
		 if( typeof value == 'object' && value == null ) return true
		 if( typeof value == 'array' && value.length == 0) return true
		 return false
	}


	/**
	 * isObject
	 * @param value {object/ number/fucntion }
	 * @return  {true / false}
	*/
	function isObject(value) {
      var type = typeof value
      return value != null && (type == 'object' || type == 'function')
    }



    /**
	 * flattenDeep
	 * @param ary {[,[,[,[]]]]}
	 * @return  {[]}
	*/
	function flattenDeep(ary){
		var str = ary.toString().split(",")
		var result = []
		for (var i = 0; i < str.length; i++) {
			result.push(+str[i])
		}
		return result
	}

	/**
	 * run
	 * @param ary {[,[,[,[]]]]}
	 * @return  {[]}
	 *
	 *@example
	 * run(add, [1,2])
	*/
	function run(f , ...arg){
		return f(...arg)
	}

	/**
	 * forOwn
	 * @param obj {Object}
	 *
	 *@example
	 * forOwn({a:1,b:2},(val , key ,obj))
	*/
	function forOwn(obj , inter){
		var hasOwn = Object.prototype.hasOwnProperty
		for(var key in obj){
			if( hasOwn.call(obj, key)){
				inter(obj[key], key, obj)
			}
		}
	}

	/**
	 * padEnd
	 * @param obj {Object}
	 *
	 *@example
	 * forOwn({a:1,b:2},(val , key ,obj))
	*/
	function padEnd(obj , len){
		
	}



	/**
	 * toArray
	 * @param ary {}
	 * @return {[]}
	 *
	 *@example
	 * toArray({"s": 1, "d": 2})
	 * toArray(1)
	 * toArray("a,b,c")
	 * toArray(['6', '8', '10'])
	*/
	function toArray (ary){
		if( typeof ary == 'string'){
			var res = ary.split('')
			var jum = []
			for (var i = 0; i < res.length; i++) {
				jum.push(res[i])
			}

			return jum
		}

		if( typeof ary == 'object'){
			var res = []
			for (var key in ary) {
				res.push(ary[key])
			}
			return res
		}

		if ( ary == null ) return []
		return Array.from(ary)
	}

	/**
	 * matches
	 * @param source {}
	 * @return {[]}
	 *
	*/
	// function matches (source){
	// 	return function(){
	// 		for (var i = 0; i < arguments.length; i++) {
	// 			arguments[i]
	// 		}
	// 	}
	// }



	return	{
		chunk,
		compact,
		difference,
		differenceBy,
		drop,
		dropRight,
		head,
		indexOf,
		fill,
		join,
		flip,
		last,
		concat,
		reverse,
		reduce,
		filter,
		slice,
		forEach,
		map,
		keyBy,
		spread,
		hasOdd,
		before,
		after,
		ary,
		unary,
		bind,
		memoize,
		curry,
		every,
		some,
		negate,
		isObject,
		isArray,
		isArguments,
		isBoolean,
		isDate,
		isElement,
		//isEmpty,
		flattenDeep,
		toArray
		//isString
	}

}()