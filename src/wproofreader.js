/**
 * The class that provides functionality for creation and managing
 * the {@code WEBSPELLCHECKER} instance.
 */
export default class WProofreader {
	/**
	 * Creates an instance of the {@link WProofreader} class.
	 *
	 * @public
	 * @constructor
	 * @param {Object} editor - A TinyMCE editor instance.
	 * @param {OptionsManager} optionsManager - A options manager instance.
	 */
	constructor(editor, optionsManager) {
		this._instance = null;
		this._editor = editor;
		this._optionsManager = optionsManager;

		this._init();
	}

	/**
	 * Initializes {@link WProofreader} instance.
	 *
	 * @private
	 */
	_init() {
		this._loadWscBundle()
			.then(() => {
				this._initOnScriptLoaded();
			})
			.catch((error) => {
				console.log('error');
				throw new Error(error);
			});
	}

	/**
	 * Loads {@code WEBSPELLCHECKER} bundle.
	 *
	 * @private
	 * @throws {Error} - If the `srcUrl` option parameter isn't provided.
	 *
	 * @returns {Promise} - A promise resolved once the {@code WEBSPELLCHECKER} bundle is loaded.
	 */
	_loadWscBundle() {
		const srcUrl = this._optionsManager.getOption('srcUrl');

		if (!srcUrl) {
			throw new Error('Path to the script is not specified.');
		}

		return window.tinymce.ScriptLoader.loadScript(srcUrl);
	}

	/**
	 * Initializes {@link WProofreader} instance once {@code WEBSPELLCHECKER} bundle is loaded.
	 *
	 * @private
	 */
	_initOnScriptLoaded() {
		if (this._editor.initialized) {
			this._createInstance();
		} else {
			this._editor.on('init', () => this._createInstance());
		}
	}

	/**
	 * Creates {@code WEBSPELLCHECKER} instance.
	 *
	 * @private
	 */
	_createInstance() {
		const container = this._editor.inline ? this._editor.bodyElement : this._editor.iframeElement;

		this._optionsManager.setOption('container', container);

		window.WEBSPELLCHECKER.init(
			this._optionsManager.getOptions(),
			(instance) => this._handleInstanceCreated(instance)
		);
	}

	/**
	 * Handles {@code WEBSPELLCHECKER} instance created event.
	 *
	 * @private
	 * @param {Object} instance - Created {@code WEBSPELLCHECKER} instance.
	 */
	_handleInstanceCreated(instance) {
		this._instance = instance;

		if (this._editor.mode.isReadOnly()) {
			this.disable();
		}
	}

	/**
	 * Enables {@code WEBSPELLCHECKER} instance.
	 *
	 * @public
	 */
	disable() {
		this._instance.disable();
	}

	/**
	 * Checks whether {@code WEBSPELLCHECKER} instance is initialized.
	 *
	 * @public
	 *
	 * @returns {Boolean} - `true` if the instance is initialized, `false` otherwise.
	 */
	isInitialized() {
		return !!this._instance;
	}

	/**
	 * Enables {@code WEBSPELLCHECKER} instance.
	 *
	 * @public
	 */
	enable() {
		this._instance.enable();
	}

	/**
	 * Checks whether {@code WEBSPELLCHECKER} instance is disabled.
	 *
	 * @public
	 *
	 * @returns {Boolean} - `true` if the instance is disabled, `false` otherwise.
	 */
	isDisabled() {
		return this._instance.isDisabled();
	}

	/**
	 * Opens {@code WEBSPELLCHECKER} settings.
	 *
	 * @public
	 */
	openSettings() {
		this._instance.openSettings();
	}

	/**
	 * Opens {@code WEBSPELLCHECKER} proofread dialog.
	 *
	 * @public
	 */
	openDialog() {
		this._instance.openDialog();
	}

	/**
	 * Returns {@code WEBSPELLCHECKER} static actions.
	 *
	 * @public
	 */
	getStaticActions() {
		return this._instance.getStaticActions();
	}

	/**
	 * Destroys {@link WProofreader} instance.
	 */
	destroy() {
		this._instance.destroy();
	}
}
