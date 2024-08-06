import ButtonCreator from './buttoncreator';
import IconManager from './iconmanager';
import OptionsManager from './optionsmanager';
import WProofreader from './wproofreader';

/**
 * The class that provides WProofreader plugin functionality.
 */
export default class WProofreaderPlugin {
	/**
	 * Creates an instance of the {@link WProofreaderPlugin} class.
	 *
	 * @public
	 * @constructor
	 * @param {Object} editor - A TinyMCE editor instance.
	 */
	constructor(editor) {
		this._editor = editor;

		this._init();
	}

	/**
	 * Initializes {@link WProofreaderPlugin} instance.
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
	 * Creates a {@link OptionsManager} instance.
	 *
	 * @private
	 */
	_createOptionsManager() {
		this._optionsManager = new OptionsManager(this._editor);
	}

	/**
	 * Creates a {@link WProofreader} instance.
	 *
	 * @private
	 */
	_createWproofreader() {
		this._wproofreader = new WProofreader(this._editor, this._optionsManager);
	}

	/**
	 * Adds {@code WProofreader} icon.
	 *
	 * @private
	 */
	_addIcon() {
		new IconManager().addIcon(this._editor);
	}

	/**
	 * Adds {@code WProofreader} button.
	 *
	 * @private
	 */
	_addButton() {
		new ButtonCreator(this._wproofreader).create(this._editor);
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
		this._wproofreader.destroy();
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
