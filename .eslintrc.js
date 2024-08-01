module.exports = {
	env: {
		es2021: true
	},
	ignorePatterns: ['dist/**/*.js'],
	extends: 'airbnb-base',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'no-tabs': ['error', { allowIndentationTabs: true }],
		indent: ['error', 'tab'],
		'comma-dangle': ['off', {}],
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
		'no-underscore-dangle': 'off',
		'no-unused-vars': ['error', { varsIgnorePattern: 'should|expect' }],
		'no-unused-expressions': 'off',
		'class-methods-use-this': 'off',
		'no-new': 'off',
		'no-prototype-builtins': 'off',
		'no-use-before-define': 'off',
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'arrow-body-style': 'off'
	}
};
