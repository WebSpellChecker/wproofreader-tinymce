/**
 * The class that provides a toolbar button creation functionality.
 */
export default class ButtonCreator {
	/**
	 * Creates an instance of the {@link ButtonCreator} class.
	 *
	 * @public
	 * @constructor
	 * @param {WProofreader} wproofreader - A {@link WProofreader} instance.
	 */
	constructor(wproofreader) {
		this._wproofreader = wproofreader;

		this._actions = {
			settings: () => this._wproofreader.openSettings(),
			proofreadDialog: () => this._wproofreader.openDialog(),
			toggle: () => {
				if (this._wproofreader.isDisabled()) {
					this._wproofreader.enable();
				} else {
					this._wproofreader.disable();
				}
			}
		};
	}

	/**
	 * Creates WProofreader toolbar button.
	 *
	 * @public
	 * @param {Object} editor - A TinyMCE editor instance.
	 */
	create(editor) {
		editor.ui.registry.addMenuButton('wproofreader', {
			icon: 'wproofreader',
			tooltip: 'WProofreader text checker',
			fetch: (callback) => callback(this._getMenuButtons())
		});
	}

	/**
	 * Returns the menu buttons.
	 *
	 * @private
	 *
	 * @returns {List<Object>} - A list of menu buttons.
	 */
	_getMenuButtons() {
		if (!this._wproofreader.isInitialized()) {
			return [];
		}

		const isDisabled = this._wproofreader.isDisabled();

		return this._wproofreader.getStaticActions()
			.filter((action) => !isDisabled || action.name === 'toggle')
			.map((action) => {
				return {
					type: 'menuitem',
					text: this._getActionText(action),
					onAction: this._actions[action.name]
				};
			});
	}

	/**
	 * Returns action text.
	 *
	 * @private
	 * @param {Object} action - An action to get the text.
	 *
	 * @returns {String} - Action text.
	 */
	_getActionText(action) {
		if (action.name !== 'toggle') {
			return action.localization.default;
		}

		if (this._wproofreader.isDisabled()) {
			return action.localization.enable;
		}

		return action.localization.disable;
	}
}
