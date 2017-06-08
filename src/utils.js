
/**
 * Gets the type string for the passed value.
 * @param {any} val
 * @return {string} The type string for the passed value.
 */
const toType = val => Object.prototype.toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

/**
 * Verifies that the passed value is a plain object.
 * @param {any} val
 * @return {boolean} Returns true if the value is a plain object, false otherwise.
 */
const isObject = val => toType(val) === 'object';

/**
 * Checks whether prot is the prototype of obj.
 * @param {object} prot The prototype object.
 * @param {object} obj The other object to check the prototype of.
 * @return {boolean} True if prot is the prototype of obj, false otherwise.
 */
const protOf = (prot, obj) => Object.prototype.isPrototypeOf.call(prot, obj);

export {
	protOf,
	isObject,
	toType,
};
