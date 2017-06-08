import { seequery, createInstance } from './proto';
import { protOf, toType } from './utils';

const isValidPredicate = predicate => true;

const where = function where(...predicates) {
	if (!protOf(seequery, this)) {
		return where.apply(createInstance(), predicates);
	}
	if (predicates.length === 0) {
		return this;
	}
	const allValid = predicates.every((predicate) => {
		if (toType(predicate) !== 'string') {
			return false;
		}
		if (!isValidPredicate(predicate)) {
			return false;
		}
		return true;
	});

	this.predicates = this.predicates.concat(predicates);
};

export default where;
