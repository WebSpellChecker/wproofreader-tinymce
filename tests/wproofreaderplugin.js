import sinon from 'sinon';
import { expect } from 'chai';
import ButtonCreator from '../src/buttoncreator';
import WProofreader from '../src/wproofreader';
import IconManager from '../src/iconmanager';
import WProofreaderPlugin from '../src/wproofreaderplugin';
import OptionsManager from '../src/optionsmanager';
import Editor from './mocks/editor';

describe('WProofreaderPlugin', () => {
	let iconStub;
	let editor;
	let wproofreaderPlugin;
	let onStub;

	beforeEach(() => {
		editor = new Editor();
		onStub = sinon.stub(editor, 'on');

		iconStub = sinon.stub(IconManager.prototype, 'addIcon');
		sinon.stub(WProofreader.prototype, '_init');
		sinon.stub(ButtonCreator.prototype, 'create');
		sinon.stub(OptionsManager.prototype, '_getOptions').returns({});

		wproofreaderPlugin = new WProofreaderPlugin(editor);
	});

	afterEach(() => {
		sinon.restore();
	});

	it('should be created', () => {
		expect(wproofreaderPlugin).to.be.exists;
	});

	it('should add an icon', () => {
		expect(iconStub.calledOnce).to.be.true;
	});

	it('should subscribe on editor events', () => {
		expect(onStub.calledTwice).to.be.true;
		expect(onStub.getCall(0).args[0]).to.be.equal('SwitchMode');
		expect(onStub.getCall(1).args[0]).to.be.equal('remove');
	});

	it('should enable WProofreader when readonly mode switching off', () => {
		const switchModeListener = onStub.getCall(0).args[1];
		const enableStub = sinon.stub(WProofreader.prototype, 'enable');
		const disableStub = sinon.stub(WProofreader.prototype, 'disable');

		editor.mode = { isReadOnly: sinon.stub().returns(true) };

		expect(disableStub.called).to.be.false;
		expect(enableStub.called).to.be.false;

		switchModeListener();

		expect(enableStub.called).to.be.false;
		expect(disableStub.calledOnce).to.be.true;
	});

	it('should disable WProofreader when readonly mode switching on', () => {
		const switchModeListener = onStub.getCall(0).args[1];
		const enableStub = sinon.stub(WProofreader.prototype, 'enable');
		const disableStub = sinon.stub(WProofreader.prototype, 'disable');

		editor.mode = { isReadOnly: sinon.stub().returns(false) };

		expect(disableStub.called).to.be.false;
		expect(enableStub.called).to.be.false;

		switchModeListener();

		expect(disableStub.called).to.be.false;
		expect(enableStub.calledOnce).to.be.true;
	});

	it('should destroy WProofreder on editor remove', () => {
		const removeEditorListener = onStub.getCall(1).args[1];
		const destroyStub = sinon.stub(WProofreader.prototype, 'destroy');

		removeEditorListener();

		expect(destroyStub.calledOnce).to.be.true;
	});

	describe('getMetadata method', () => {
		it('should return correct metadata', () => {
			const metadataObject = wproofreaderPlugin.getMetadata();

			expect(metadataObject).to.be.exist;

			const metadata = metadataObject.getMetadata();

			expect(metadata.name).to.be.equal('WProofreader plugin');
			expect(metadata.url).to.be.equal('https://webspellchecker.com/docs/api/wscbundle/Options.html');
		});
	});
});
