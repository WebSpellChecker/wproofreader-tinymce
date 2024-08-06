/**
 * The class that provides options management functionality.
 */
export default class OptionsManager {
	/**
	 * Creates an instance of the {@link OptionsManager} class.
	 *
	 * @public
	 * @constructor
	 * @param {Object} editor - A TinyMCE editor instance.
	 */
	constructor(editor) {
		this._editor = editor;

		this._options = this._getOptions();

		this._init();
	}

	/**
	 * Returns {@code WProofreader} options from editor config.
	 *
	 * @private
	 * @throws {Error} - If the `wproofreader` options aren't provided.
	 *
	 * @returns {Object} - A {@code WProofreader} options.
	 */
	_getOptions() {
		const options = this._editor.getParam('wproofreader');

		if (!options) {
			throw new Error('No WProofreader configuration.');
		}

		return options;
	}

	/**
	 * Initializes {@link OptionsManager} instance.
	 *
	 * @private
	 */
	_init() {
		this._setTheme();
		this._setAutoStartup();
	}

	/**
	 * Sets a {@code tinymce} theme if no other is provided.
	 *
	 * @private
	 */
	_setTheme() {
		if (!this._options.theme) {
			this._options.theme = 'tinymce';
		}
	}

	/**
	 * Sets autoStartup parameter with {@code true} if no value is provided.
	 *
	 * @private
	 */
	_setAutoStartup() {
		if (!this._options.hasOwnProperty('autoStartup')) {
			this._options.autoStartup = true;
		}
	}

	/**
	 * Returns {@code WProofreader} options.
	 *
	 * @public
	 *
	 * @returns {Object} - A {@code WProofreader} options.
	 */
	getOptions() {
		return this._options;
	}

	/**
	 * Returns the value of the defined option.
	 *
	 * @public
	 * @param {String} option - Option name.
	 *
	 * @returns {Any|undefined} - An option value.
	 */
	getOption(option) {
		return this._options[option];
	}

	/**
	 * Sets the value of the defined option.
	 *
	 * @public
	 * @param {String} option - An option name.
	 * @param {Any} value - An option value.
	 */
	setOption(option, value) {
		this._options[option] = value;
	}
}
