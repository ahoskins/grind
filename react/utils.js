module.exports = {
	/* 
	combine multiple single layer objects 
	used to compose styles, having a similar effect as LESS or SASS
	*/
	m: function() {
		var result = {};
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i]) {
				for (k in arguments[i]) {
					result[k] = arguments[i][k];
				}
			}
		}
		return result;	
	}
}