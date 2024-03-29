module.exports = {
	env: {
		node: true,
		es2021: true,
		jest: true,
	},
	plugins: ["@typescript-eslint", "jest", "testing-library", "promise", "import", "prettier"],
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended",
		"next/core-web-vitals",
		"plugin:promise/recommended",
		"plugin:prettier/recommended",
		"plugin:tailwindcss/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	overrides: [
		{
			files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
			extends: ["plugin:jest/recommended"],
		},
		{
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
			],
			files: ["*.ts", "*.tsx"],
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: ["./tsconfig.json"],
			},
			rules: {
				"@typescript-eslint/restrict-template-expressions": "off",
				"@typescript-eslint/no-unsafe-return": "off",
				"@typescript-eslint/no-unused-vars": "off",
				"@typescript-eslint/ban-ts-ignore": "off",
				"@typescript-eslint/explicit-function-return-type": "off",
				"@typescript-eslint/no-unsafe-member-access": "off",
				"@typescript-eslint/no-var-requires": "off",
				"@typescript-eslint/ban-ts-comment": "off",
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-misused-promises": [
					"error",
					{
						checksConditionals: false,
						checksVoidReturn: false,
					},
				],
				"@typescript-eslint/no-use-before-define": [
					"error",
					{
						functions: false,
						classes: true,
						variables: true,
						typedefs: true,
					},
				],
			},
		},
	],
	rules: {
		"no-console": "off",
		"no-nested-ternary": "off",
		"prettier/prettier": "error",
		"consistent-return": "off",
		"import/prefer-default-export": "off",
		"promise/always-return": "off",
		"import/no-default-export": "off",
		"arrow-body-style": "off",
		"react/display-name": "off",
		"eslint-comments/no-unlimited-disable": "off",
		"no-unused-vars": "off",
		"import/order": [
			"off",
			{
				groups: ["external", "builtin", "internal", "sibling", "parent", "index"],
			},
		],
		"no-use-before-define": [
			"error",
			{
				functions: false,
				classes: true,
				variables: true,
			},
		],
		"import/no-extraneous-dependencies": "off",
	},
};
