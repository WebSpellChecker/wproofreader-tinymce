(function () {
	window.WEBSPELLCHECKER = window.WEBSPELLCHECKER || {
		instances: [],
		getInstances() {
			return this.instances;
		},
		init(config, callback) {
			const instance = {
				disabled: false,
				getStaticActions() {
					return [
						{
							name: 'toggle',
							localization: {
								default: 'Toggle', enable: 'Enable', disable: 'Disable'
							}
						},
						{
							name: 'settings',
							localization: {
								default: 'Settings'
							}
						},
						{
							name: 'proofreadDialog',
							localization: {
								default: 'Proofread in dialog'
							}
						}
					];
				},
				isDisabled() {
					return this.disabled;
				},
				enable() {
					this.disabled = false;
				},
				disable() {
					this.disabled = true;
				},
				destroy() {
					window.WEBSPELLCHECKER.instances = window.WEBSPELLCHECKER.instances.filter((item) => {
						return item !== this;
					});
				}
			};

			if (typeof callback === 'function') {
				callback(instance);
			}

			window.WEBSPELLCHECKER.instances.push(instance);

			return instance;
		}
	};
}());
