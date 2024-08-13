/**
 * A toolbar button creator.
 */
export default class ButtonCreator {
	/**
	 * Creates an instance of toolbar button creator.
	 *
	 * @public
	 * @constructor
	 * @param {WProofreader} wproofreader - A wproofreader instance.
	 */
	constructor(wproofreader) {
		/**
		 * A wproofreader instance.
		 *
		 * @private
		 * @type {WProofreader}
		 */
		this._wproofreader = wproofreader;

		/**
		 * The actions of a button.
		 *
		 * @private
		 * @type {Object}
		 */
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
	 * Creates toolbar button.
	 *
	 * @public
	 * @param {Object} editor - An editor instance.
	 */
	create(editor) {
		editor.ui.registry.addMenuButton('wproofreader', {
			icon: 'wproofreader',
			tooltip: 'WProofreader text checker',
			fetch: (callback) => callback(this._getMenuButtons())
		});
	}

	/**
	 * Returns menu buttons.
	 *
	 * @private
	 *
	 * @returns {Array.<Object>} - Menu buttons.
	 */
	_getMenuButtons() {
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

	/**
	 * Destroys the module.
	 *
	 * @public
	 */
	destroy() {
		this._wproofreader = null;
		this._actions = null;
	}
}
