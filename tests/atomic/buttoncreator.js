import sinon from 'sinon';
import { expect } from 'chai';
import ButtonCreator from '../../src/buttoncreator';
import WProofreader from '../../src/wproofreader';
import Editor from './mocks/editor';
import WscInstance, { staticActions } from './mocks/wscinstance';

describe('ButtonCreator', () => {
	let wscInstance;
	let editor;
	let wproofreader;
	let buttonCreator;

	beforeEach(() => {
		sinon.stub(WProofreader.prototype, '_init');

		wscInstance = new WscInstance();
		wproofreader = new WProofreader();
		editor = new Editor();
		buttonCreator = new ButtonCreator(wproofreader);

		wproofreader._instance = wscInstance;
	});

	afterEach(() => {
		sinon.restore();
	});

	it('should be created', () => {
		expect(buttonCreator).to.be.exist;
	});

	it('should add wproofreader button', () => {
		const addMenuButtonStub = sinon.stub(editor.ui.registry, 'addMenuButton');

		buttonCreator.create(editor);

		expect(addMenuButtonStub.calledOnce).to.be.true;
		expect(addMenuButtonStub.getCall(0).args[0]).to.equal('wproofreader');
		expect(addMenuButtonStub.getCall(0).args[1]).to.be.a('object');
		expect(addMenuButtonStub.getCall(0).args[1].icon).to.equal('wproofreader');
	});

	describe('create method', () => {
		const getButtons = () => {
			addMenuButtonStub.getCall(0).args[1].fetch((btns) => { buttons = btns; });
		};
		let buttons;
		let addMenuButtonStub;

		beforeEach(() => {
			buttons = null;

			wscInstance.getStaticActions.returns(staticActions);

			addMenuButtonStub = sinon.stub(editor.ui.registry, 'addMenuButton');
		});

		it('should create an enable button if wproofreader is disabled', () => {
			const enableStub = sinon.stub(wproofreader, 'enable');

			sinon.stub(wproofreader, 'isDisabled').returns(true);

			buttonCreator.create(editor);

			getButtons();

			expect(buttons.length).to.equal(1);
			expect(buttons[0].type).to.equal('menuitem');
			expect(buttons[0].text).to.equal('Enable');

			expect(enableStub.called).to.be.false;

			buttons[0].onAction();

			expect(enableStub.calledOnce).to.be.true;
		});

		it('should create a disable button if wproofreader is enabled', () => {
			const disableStub = sinon.stub(wproofreader, 'disable');

			sinon.stub(wproofreader, 'isDisabled').returns(false);

			buttonCreator.create(editor);

			getButtons();

			expect(buttons.length).to.equal(3);
			expect(buttons[0].type).to.equal('menuitem');
			expect(buttons[0].text).to.equal('Disable');

			expect(disableStub.called).to.be.false;

			buttons[0].onAction();

			expect(disableStub.calledOnce).to.be.true;
		});

		it('should create an open settings button if wproofreader is enabled', () => {
			const openSettingsStub = sinon.stub(wproofreader, 'openSettings');

			sinon.stub(wproofreader, 'isDisabled').returns(false);

			buttonCreator.create(editor);

			getButtons();

			expect(buttons.length).to.equal(3);
			expect(buttons[1].type).to.equal('menuitem');
			expect(buttons[1].text).to.equal('Settings');

			expect(openSettingsStub.called).to.be.false;

			buttons[1].onAction();

			expect(openSettingsStub.calledOnce).to.be.true;
		});

		it('should create a proofread in dialog button if wproofreader is enabled', () => {
			const openDialogStub = sinon.stub(wproofreader, 'openDialog');

			sinon.stub(wproofreader, 'isDisabled').returns(false);

			buttonCreator.create(editor);

			getButtons();

			expect(buttons.length).to.equal(3);
			expect(buttons[2].type).to.equal('menuitem');
			expect(buttons[2].text).to.equal('Proofread in dialog');

			expect(openDialogStub.called).to.be.false;

			buttons[2].onAction();

			expect(openDialogStub.calledOnce).to.be.true;
		});
	});
});
