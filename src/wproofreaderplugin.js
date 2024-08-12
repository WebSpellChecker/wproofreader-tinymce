import ButtonCreator from './buttoncreator';
import IconManager from './iconmanager';
import OptionsManager from './optionsmanager';
import WProofreader from './wproofreader';

/**
 * A WProofreader plugin for TinyMCE editor.
 */
export default class WProofreaderPlugin {
	/**
	 * Creates an instance of wproofreader plugin.
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
		 * An options manager instance.
		 *
		 * @private
		 * @type {OptionsManager|null}
		 */
		this._optionsManager = null;

		/**
		 * A wproofreader instance.
		 *
		 * @private
		 * @type {WProofreader|null}
		 */
		this._wproofreader = null;

		/**
		 * A button creator instance.
		 *
		 * @private
		 * @type {ButtonCreator|null}
		 */
		this._buttonCreator = null;

		this._init();
	}

	/**
	 * Initializes wproofreader plugin instance.
	 *
	 * @private
	 */
	_init() {
		this._createOptionsManager();
		this._createWproofreader();
		this._addIcon();
		this._addButton();
		this._subscribeOnEditorEvents();
	}

	/**
	 * Creates a options manager instance.
	 *
	 * @private
	 */
	_createOptionsManager() {
		this._optionsManager = new OptionsManager(this._editor);
	}

	/**
	 * Creates a wproofreader instance.
	 *
	 * @private
	 */
	_createWproofreader() {
		this._wproofreader = new WProofreader(this._editor, this._optionsManager);
	}

	/**
	 * Adds wproofreader icon.
	 *
	 * @private
	 */
	_addIcon() {
		new IconManager().addIcon(this._editor);
	}

	/**
	 * Adds wproofreader button.
	 *
	 * @private
	 */
	_addButton() {
		this._buttonCreator = new ButtonCreator(this._wproofreader);
		this._buttonCreator.create(this._editor);
	}

	/**
	 * Subscribes on editor events.
	 *
	 * @private
	 */
	_subscribeOnEditorEvents() {
		this._editor.on('SwitchMode', () => this._handleSwitchMode());
		this._editor.on('remove', () => this._handleRemove());
	}

	/**
	 * Handles switch mode event.
	 *
	 * @private
	 */
	_handleSwitchMode() {
		if (this._editor.mode.isReadOnly()) {
			this._wproofreader.disable();
		} else {
			this._wproofreader.enable();
		}
	}

	/**
	 * Handles remove event.
	 *
	 * @private
	 */
	_handleRemove() {
		this._editor = null;
		this._wproofreader.destroy();
		this._optionsManager.destroy();
		this._buttonCreator.destroy();
	}

	/**
	 * Returns plugin metadata.
	 *
	 * @public
	 *
	 * @returns {Object} - A metadata.
	 */
	getMetadata() {
		return {
			getMetadata: () => ({
				name: 'WProofreader plugin',
				url: 'https://webspellchecker.com/docs/api/wscbundle/Options.html'
			}),
		};
	}
}
