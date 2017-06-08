import { protOf } from './utils';
import { seequery, createInstance } from './proto';

/**
 * Adds the passed query to the list of selected column keys.
 * @param {[string]} queries The column queries to add to the list of selected column keys.
 * @return {seequery} The active instance, for chaining.
 */
const select = function select(...queries) {
	if (!protOf(seequery, this)) {
		return select.apply(createInstance(), queries);
	}
	if (queries.length === 0) {
		return this;
	}
	const allValid = queries.every((query) => {
		if (typeof query === 'number' && !Number.isNaN(query)) {
			query = String(query);
		}
		if ((typeof query !== 'string' &&
				typeof query !== 'number') ||
				Number.isNaN(query)) {
			return false;
		}
		return true;
	});
	if (!allValid) {
		throw new TypeError('A passed query is of invalid type');
	}
	this.selectedKeys = this.selectedKeys.concat(queries);
	return this;
};

export default select;
