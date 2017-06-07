module.exports = {
    extends: 'airbnb-base',
    plugins: [
        'import'
    ],
	env: {
		es6: true,
		browser: true
	},
	rules: {
		'indent': ['error', 'tab'],
		'no-tabs': 'off',
		'linebreak-style': 'off',
		'no-param-reassign': 'off',
		'quote-props': [1, 'consistent-as-needed'],
		'no-cond-assign': [2, 'except-parens'],
		'no-unused-vars': [1, { vars: 'local' }],
		'default-case': 'off',
		'new-cap': [2, { capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'] }],
	}
};
