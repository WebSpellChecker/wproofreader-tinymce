/**
 * A wrapper of {@code WEBSPELLCHECKER} instance.
 * It creates and manages the instance.
 */
export default class WProofreader {
	/**
	 * Creates an instance of wproofreader.
	 *
	 * @public
	 * @constructor
	 * @param {Object} editor - An editor instance.
	 * @param {OptionsManager} optionsManager - An options manager instance.
	 */
	constructor(editor, optionsManager) {
		/**
		 * A {@code WEBSPELLCHECKER} instance.
		 *
		 * @private
		 * @type {Object|null}
		 */
		this._instance = null;

		/**
		 * An editor instance.
		 *
		 * @private
		 * @type {Object}
		 */
		this._editor = editor;

		/**
		 * A options manager instance.
		 *
		 * @private
		 * @type {OptionsManager}
		 */
		this._optionsManager = optionsManager;

		this._init();
	}

	/**
	 * Initializes wproofreader instance.
	 *
	 * @private
	 */
	_init() {
		this._loadWscBundle()
			.then(() => {
				this._initOnScriptLoaded();
			});
	}

	/**
	 * Loads the {@code WEBSPELLCHECKER} bundle.
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
	 * Initializes wproofreader instance once {@code WEBSPELLCHECKER} bundle is loaded.
	 *
	 * @private
	 */
	_initOnScriptLoaded() {
		if (!this._editor || this._editor.removed) {
			return;
		}

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
		if (!this._editor || this._editor.removed) {
			instance.destroy();

			return;
		}

		if (this._editor.mode.isReadOnly()) {
			instance.disable();
		}

		this._instance = instance;
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
		return this._instance ? this._instance.getStaticActions() : [];
	}

	/**
	 * Destroys the module.
	 *
	 * @public
	 */
	destroy() {
		this._instance && this._instance.destroy && this._instance.destroy();
		this._instance = null;
		this._editor = null;
		this._optionsManager = null;
	}
}
