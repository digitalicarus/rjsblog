var validators = {
	'required': function (val) {
		if (!val) { return false; }	
		switch (typeof val) {
			case 'string':
				return !/^\s*$/.test(val);
			break;
			default:
				return true;
		}
	}
};

export default validate(vals, fieldConfigs) {
	var validation = {}
	,   constraints
	;

	for (let val in vals) {
		if (!vals.hasOwnProperty(vals)) { continue; }
		validation[val] = true;

		if (fieldConfigs.hasOwnProperty(val) && typeof fieldConfigs[val].constraints === 'object') {
			constraints = fieldConfig[val].constraints;
			for (let constraint in constraints) {
				if (validators.hasOwnProperty(constraint)) {
					validation[val] = validators[constraint](val, constraints[constraint]);
				} else {
					console.warn('unrecognized constraint "' + constraint + '"'); 
				}
			}
		}
	}
}
