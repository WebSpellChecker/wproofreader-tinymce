/* eslint-disable max-classes-per-file */
class Registry {
	addIcon() {}

	addMenuButton() {}
}

class UI {
	constructor() {
		this.registry = new Registry();
	}
}

export default class Editor {
	constructor() {
		this.ui = new UI();
	}

	getParam() {}

	on() {}
}
