import sinon from 'sinon';

export default class WscInstance {
	constructor() {
		this.disable = sinon.stub();
		this.enable = sinon.stub();
		this.isDisabled = sinon.stub();
		this.openSettings = sinon.stub();
		this.openDialog = sinon.stub();
		this.getStaticActions = sinon.stub();
		this.destroy = sinon.stub();
	}
}

export const staticActions = [
	{
		name: 'toggle',
		localization: { default: 'Toggle', enable: 'Enable', disable: 'Disable' }
	},
	{
		localization: { default: 'Settings' },
		name: 'settings'
	},
	{
		localization: { default: 'Proofread in dialog' },
		name: 'proofreadDialog'
	}
];
