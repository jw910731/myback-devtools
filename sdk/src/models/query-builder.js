export default class QueryBuilder {
	constructor() {
		this.constraints = {};
	}

	equal(k, v) {
		this.constraints[k] = v;
		return this;
	}

	__setConstraints(k, c, v) {
		if(typeof this.constraints[k] !== 'object' ) this.constraints[k] = {};
		this.constraints[k][c] = v;
	}

	notEqual(k, v) {
		this.__setConstraints(k, '$neq', v);
		return this;
	}

	lessThan(k, v) {
		this.__setConstraints(k, '$lt', v);
		return this;
	}

	lessOrEqualThan(k, v) {
		this.__setConstraints(k, '$le', v);
		return this;
	}

	greaterThan(k, v) {
		this.__setConstraints(k, '$gt', v);
		return this;
	}

	greaterOrEqualThan(k, v) {
		this.__setConstraints(k, '$ge', v);
		return this;
	}

	toString() {
		return JSON.stringify(this.constraints);
	}
}
