import _ from 'lodash';

/**
 * Checks whether prot is the prototype of obj.
 * @param {object} prot The prototype object.
 * @param {object} obj The other object to check the prototype of.
 * @return {boolean} True if prot is the prototype of obj, false otherwise.
 */
const protOf = (prot, obj) => Object.prototype.isPrototypeOf.call(prot, obj);

/**
 * Main prototype object containing all the methods of the seequery query objects.
 * @type object
 * @typedef {object} seequery
 * @property {string} sq Identifies this as a seequery object.
 */
const seequery = {
	sq: 'sq',
};

/**
 * Constructor.
 * Represents an error that occurred as a result of passing an invalid query.
 * @param {String} message Description of error.
 */
const InvalidQuery = function InvalidQuery(message) {
	this.name = 'InvalidQuery';
	this.message = message || 'Encountered an invalid query';
};
InvalidQuery.prototype = Error.prototype;

/**
 * Checks the validity of the passed query.
 * @param {string} query The query to check for validity.
 * @return {boolean} True if the passed query is a valid query, false othewise.
 */
const isValidQuery = (query) => {
	if (query.match(/\n|\t/)) return false;
	return true;
};

/**
 * Creates a new seequery instance and returns it.
 * @return {seequery} A new seequery object.
 */
const createInstance = function createInstance() {
	const sql = Object.create(seequery);
	sql.selectedKeys = [];
	sql.tables = [];
	return sql;
};

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
	queries.forEach((query) => {
		if (typeof query === 'number' && !Number.isNaN(query)) {
			query = String(query);
		}
		if ((typeof query !== 'string' &&
				typeof query !== 'number') ||
				Number.isNaN(query)) {
			throw new TypeError(
				`Query is of invalid type: ${typeof query}, ${query}`);
		}
		if (!isValidQuery(query)) {
			throw new InvalidQuery(
				`Query contains invalid characters: ${query}`);
		}
		this.selectedKeys.push(query);
	});
	return this;
};
seequery.select = select;

const toType = val => Object.prototype.toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
/**
 * Verifies that the passed value is a plain object.
 * @param {any} val
 * @return {boolean} Returns true if the value is a plain object, false otherwise.
 */
const isObject = val => toType(val) === 'object';

/**
 * Verifies that the passed table is a valid, uniform two-dimensional array.
 * @param {any} table
 * @return {boolean} Returns true if the table is valid for queries, false otherwise.
 */
const isValidTable = (table) => {
	let isValid = true;
	if (Array.isArray(table)) {
		let firstRow = true;
		let keys;
		let rowType;
		table.forEach((row) => {
			if (!Array.isArray(row) || !isObject(row)) {
				isValid = false;
			} else if (isObject(row)) {
				if (firstRow) {
					keys = Object.keys(row);
					firstRow = false;
				}
			} else if (isArray(row)) {

			}
		});
	} else {
		isValid = false;
	}
	return isValid;
};
/**
 * Adds the passed table structures to the list of selected tables to search through.
 * @param {([any[][]]|[object[]])} tables Tables to search through.
 * @return {seequery} The active instance, for chaining.
 */
const from = function from(...tables) {
	if (tables.length === 0) {
		return this;
	}
	tables.forEach((table) => {
		if (!isValidTable(table)) {
			throw new TypeError('Table is not a uniform two-dimensional array or an array ' +
				'containing objects with identical keys');
		}
		this.tables.push(table);
	});
	return this;
};
seequery.from = from;

export { select };
export default select;
