import _ from 'lodash';
import { isObject, protOf, toType } from './utils';
import { seequery, createInstance } from './proto';

/**
 * Finds the types of each value in the passed array using toType.
 * @see #toType
 * @param {any[]} arr Array to check the type of each value.
 * @return {string[]} An array with strings describing the types of each value at their respective
 * indices in the passed array.
 */
const getTypesInValues = arr => arr.map(val => toType(val));

/**
 * Verifies that the passed table is a valid, uniform two-dimensional array.
 * @param {any} table
 * @return {boolean} Returns true if the table is valid for queries, false otherwise.
 */
const isTwoDimArray = (table) => {
	if (Array.isArray(table)) {
		let firstRow = true;
		let keys;
		let types;
		return table.every((row) => {
			if (!Array.isArray(row)) {
				return false;
			} else if (firstRow) {
				keys = Object.keys(row);
				types = getTypesInValues(row);
				firstRow = false;
			} else if (
				!(_.isEqual(Object.keys(row), keys)) ||
				!(_.isEqual(getTypesInValues(row), types))
			) {
				return false;
			}
			return true;
		});
	}
	return false;
};

/**
 * Finds the type strings of the value behind each key of the passed object.
 * @param {object} obj
 * @return {object} Returns an object with the value of each key replaced by the original value's
 * type string.
 */
const getTypesInObject = (obj) => {
	const keys = Object.keys(obj);
	const result = keys.reduce((col, key) => {
		col[key] = toType(obj[key]);
		return col;
	}, {});
	return result;
};

/**
 * Verifies that the passed table is a valid table-like array containing objects with keys as
 * column names.
 * @param {object[]} table
 * @return {boolean} True if the passed table is valid for queries, false otherwise.
 */
const isObjectArray = (table) => {
	if (Array.isArray(table)) {
		let firstRow = true;
		let keys;
		let types;
		return table.every((row) => {
			if (!isObject(row)) {
				return false;
			}
			if (firstRow) {
				keys = Object.keys(row);
				types = getTypesInObject(row);
				firstRow = false;
				return true;
			}
			if (
				!(_.isEqual(Object.keys(row), keys)) ||
				!(_.isEqual(getTypesInObject(row), types))
			) {
				return false;
			}
			return true;
		});
	}
	return false;
};

/**
 * Adds the passed table structures to the list of selected tables to search through.
 * @param {([any[][]]|[object[]])} tables Tables to search through.
 * @return {seequery} The active instance, for chaining.
 */
const from = function from(...tables) {
	if (!protOf(seequery, this)) {
		return from.apply(createInstance(), tables);
	}
	if (tables.length === 0) {
		return this;
	}
	const allValid = tables.every((table) => {
		if (!isTwoDimArray(table) && !isObjectArray(table)) {
			return false;
		}
		return true;
	});
	if (!allValid) {
		throw new TypeError('A passed table is not a uniform two-dimensional array or an array ' +
				'containing objects with identical keys');
	}
	this.tables = this.tables.concat(tables);
	return this;
};

export default from;
