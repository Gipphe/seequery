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
 * Creates a new seequery instance and returns it.
 * @return {seequery} A new seequery object.
 */
const createInstance = function createInstance() {
	const sql = Object.create(seequery);
	sql.selectedKeys = [];
	sql.tables = [];
	sql.columns = {};
	sql.predicates = [];
	return sql;
};

export { seequery, createInstance };
export default createInstance;
