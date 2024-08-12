/**
 * A wproofreader options manager.
 */
export default class OptionsManager {
	/**
	 * Creates an instance of options manager.
	 *
	 * @public
	 * @constructor
	 * @param {Object} editor - An editor instance.
	 */
	constructor(editor) {
		/**
		 * An editor instance.
		 *
		 * @private
		 * @type {Object}
		 */
		this._editor = editor;

		/**
		 * Wproofreader options.
		 *
		 * @private
		 * @type {Object}
		 */
		this._options = this._getOptions();

		this._init();
	}

	/**
	 * Returns wproofrader options from editor config.
	 *
	 * @private
	 * @throws {Error} - If the wproofreader option isn't provided in the editor config or
	 * its value is not object type.
	 *
	 * @returns {Object} - A wproofreader options.
	 */
	_getOptions() {
		const options = this._editor.getParam('wproofreader');

		if (!options) {
			throw new Error('No WProofreader configuration.');
		}

		if (typeof options !== 'object') {
			throw new Error('WProofreader options has incorrect type.');
		}

		return options;
	}

	/**
	 * Initializes options manager instance.
	 *
	 * @private
	 */
	_init() {
		this._setTheme();
		this._setAutoStartup();
	}

	/**
	 * Sets a `tinymce` theme if no other is provided.
	 *
	 * @private
	 */
	_setTheme() {
		if (!this._options.theme) {
			this._options.theme = 'tinymce';
		}
	}

	/**
	 * Sets autoStartup parameter with `true` if no value is provided.
	 *
	 * @private
	 */
	_setAutoStartup() {
		if (!this._options.hasOwnProperty('autoStartup')) {
			this._options.autoStartup = true;
		}
	}

	/**
	 * Returns wproofreader options.
	 *
	 * @public
	 *
	 * @returns {Object} - Wproofreader options.
	 */
	getOptions() {
		return this._options;
	}

	/**
	 * Returns the value of required option.
	 *
	 * @public
	 * @param {String} option - Option name.
	 *
	 * @returns {Any|Undefined} - An option value.
	 */
	getOption(option) {
		return this._options[option];
	}

	/**
	 * Sets the provided option value.
	 *
	 * @public
	 * @param {String} option - An option name.
	 * @param {Any} value - An option value.
	 */
	setOption(option, value) {
		this._options[option] = value;
	}

	/**
	 * Destroys the module.
	 *
	 * @public
	 */
	destroy() {
		this._editor = null;
		this._options = null;
	}
}
