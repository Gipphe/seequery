(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'babel-runtime/core-js/object/create'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('babel-runtime/core-js/object/create'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.create);
		global.index = mod.exports;
	}
})(this, function (exports, _create) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.select = undefined;

	var _create2 = _interopRequireDefault(_create);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var seequery = {};
	seequery.sq = 'sq';

	var InvalidQuery = function InvalidQuery(message) {
		this.name = 'InvalidQuery';
		this.message = message || 'Encountered an invalid query';
		this.stack = new Error().stack;
	};
	InvalidQuery.prototype = (0, _create2.default)(Error);
	InvalidQuery.prototype.constructor = InvalidQuery;

	var select = function select(query) {
		if (typeof query !== 'string') {
			throw new TypeError('Query is of invalid type');
		}
		if (query.match(/[\n\t]/)) {
			throw new InvalidQuery('Query contains invalid characters');
		}

		return (0, _create2.default)(seequery);
	};
	exports.select = select;
	exports.default = select;
});