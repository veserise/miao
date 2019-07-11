var veserise = {
	chunk: function(ary, size){
		if ( size == 1 ) return ary
		var result  = [] , i = 0
		while (i < size){
			result.push(ary.shift())
			i++
		}
		return [result, ary]
	},

	compact: function(ary){
		 return ary.filter(it => it)
	},

	concat: function(ary , ...value){
		var result = []
		for (var i = 0; i < ary.length; i++) {
			result.push(ary[i])
		}
		result.push(...value)
		return result
	},

	difference:function(ary, ...value){
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
	},


	// differenceBy: function (ary, values, itera){
	// 	var result = [] , jum = []
	// 	if ( itera == )
	// 	for (var i = 0; i < values.length; i++) {
	// 		result.push(itera(values[i]))
	// 	}
	// 	for (var i = 0; i < ary.length; i++) {
	// 		if( !( result.includes(itera(ary[i])) ) ){
	// 			jum.push(ary[i])
	// 		}
	// 	}
	// 	return jum
	// },

	drop: function	(ary, n = 1){
		if( ary.length == 0 ) return undefined
		var result = []
		for (var i = n; i < ary.length; i++) {
			result.push(ary[i])
		}
		return result
	},

	dropRight:function(ary , n = 1){
		if( ary.length == 0 ) return undefined
		var result = []
		for (var i = 0; i < ary.length - n; i++) {
			result.push(ary[i])
		}
		return result
	},

	fill:function(ary, value, start = 0, end = ary.length){
		var res = []
		for (var i = 0; i < ary.length; i++) {
			if (i >= start && i < end ) {
				ary[i] = value
			}
			res.push(ary[i])
		}
		return res
	},

	reverse: function (ary){
		var result = []
		for (var i = ary.length - 1; i >= 0; i--) {
			result.push(ary[i])
		}
		return result
	},

	head:function (ary){
		if( ary.length == 0 ) return undefined
		return ary[0]
	},

	indexOf: function(ary, value , fromIndex = 0){
		if( ary.length == 0 ) return undefined
		for (var i = fromIndex; i < ary.length; i++) {
			if ( ary[i] == value){
				return i
			}
		}
		return -1
	},

	join:function(ary, string = ","){
		var str = ''
		for (var i = 0; i < ary.length; i++) {
			if(i == ary.length - 1){
				str += ary[i]
			}else{
				str += ary[i] + string
			}
		}
		return str
	},

	last:function(ary){
		if(ary.length == 0) return undefined
		return ary[ary.length-1]
	},

	reduce: function (ary, calc, initial = ary[0]){
		var i = 0
		if (arguments.length == 2){
			i = 1
		}
		for (; i < ary.length; i++) {
			initial = calc(initial ,ary[i])
		}
		return initial
	},

	filter:function(ary, test){
		for (var i = 0; i < ary.length; i++) {
			if ( test(ary[i]) ){
                 return true
			}
		}
	},
	slice: function (ary, start, end){
		var result = []
		for (var i = start; i < end; i++) {
			result.push(ary[i])
		}
		return result
	},
	forEach: function ( ary, action){
		for (var i = 0; i < ary.length; i++) {
			action(ary[i])
		}
		return ary
	},
	map: function (ary, mapper){
		var result = []
		for (var i = 0; i < ary.length; i++) {
			var s = mapper(ary[i],i , ary)
			result.push(s)
		}
		return result
	},
	keyBy:function(ary, key){
		var result = {}
		ary.forEach(item =>{
			result[item[key]] = item
		})
		return result
	},
	hasOdd: function (ary){
		var has = false
		forEach(ary, function(it) {
			if (it % 2){
				has = true
				return false
			}
		})
		return has
	},

}