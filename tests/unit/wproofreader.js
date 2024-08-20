import sinon from 'sinon';
import { expect } from 'chai';
import WProofreader from '../../src/wproofreader';
import OptionsManager from '../../src/optionsmanager';
import Editor from '../mocks/editor';
import WscInstance from '../mocks/wscinstance';

describe('WProofreader', () => {
	const srcUrl = 'https://svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js';

	let options;
	let editor;
	let optionsManager;
	let setOptionStub;
	let getOptionsStub;

	beforeEach(() => {
		window.tinymce = { ScriptLoader: { loadScript: sinon.stub().resolves() } };
		window.WEBSPELLCHECKER = { init: sinon.stub() };

		options = {};
		editor = new Editor();
		sinon.stub(editor, 'getParam').withArgs('wproofreader').returns({});
		optionsManager = new OptionsManager(editor);

		setOptionStub = sinon.stub(optionsManager, 'setOption');
		getOptionsStub = sinon.stub(optionsManager, 'getOptions').returns(options);
		sinon.stub(optionsManager, 'getOption').withArgs('srcUrl').returns(srcUrl);
	});

	afterEach(() => {
		sinon.restore();
	});

	it('should subscribe on editor init event, if editor is not initialized', (done) => {
		const subscribeStub = sinon.stub(editor, 'on');

		editor.initialized = false;

		new WProofreader(editor, optionsManager);

		setTimeout(() => {
			expect(subscribeStub.calledOnce).to.be.true;
			expect(subscribeStub.getCall(0).args[0]).to.equal('init');
			expect(subscribeStub.getCall(0).args[1]).to.a('function');

			done();
		});
	});

	it('should not create WSC instance if editor is removed', (done) => {
		editor.bodyElement = document.createElement('div');
		editor.initialized = true;
		editor.inline = true;
		editor.removed = true;

		new WProofreader(editor, optionsManager);

		setTimeout(() => {
			expect(window.WEBSPELLCHECKER.init.called).to.be.false;

			done();
		});
	});

	it('should create WSC instance for inline editor', (done) => {
		editor.bodyElement = document.createElement('div');
		editor.initialized = true;
		editor.inline = true;

		new WProofreader(editor, optionsManager);

		setTimeout(() => {
			expect(setOptionStub.calledOnce).to.be.true;
			expect(setOptionStub.getCall(0).args[0]).to.be.equal('container');
			expect(setOptionStub.getCall(0).args[1]).to.be.equal(editor.bodyElement);
			expect(getOptionsStub.calledOnce).to.be.true;
			expect(window.WEBSPELLCHECKER.init.calledOnce).to.be.true;
			expect(window.WEBSPELLCHECKER.init.getCall(0).args[0]).to.equal(options);
			expect(window.WEBSPELLCHECKER.init.getCall(0).args[1]).to.a('function');

			done();
		});
	});

	it('should create WSC instance for classic editor', (done) => {
		editor.iframeElement = document.createElement('iframe');
		editor.initialized = true;
		editor.inline = false;

		new WProofreader(editor, optionsManager);

		setTimeout(() => {
			expect(setOptionStub.calledOnce).to.be.true;
			expect(setOptionStub.getCall(0).args[0]).to.be.equal('container');
			expect(setOptionStub.getCall(0).args[1]).to.be.equal(editor.iframeElement);
			expect(getOptionsStub.calledOnce).to.be.true;
			expect(window.WEBSPELLCHECKER.init.calledOnce).to.be.true;
			expect(window.WEBSPELLCHECKER.init.getCall(0).args[0]).to.equal(options);
			expect(window.WEBSPELLCHECKER.init.getCall(0).args[1]).to.a('function');

			done();
		});
	});

	it('should disable instance if editor is in readonly mode', (done) => {
		const wscInstance = { disable: sinon.stub() };

		editor.iframeElement = document.createElement('iframe');
		editor.initialized = true;
		editor.inline = false;
		editor.mode = { isReadOnly: () => true };

		new WProofreader(editor, optionsManager);

		setTimeout(() => {
			window.WEBSPELLCHECKER.init.getCall(0).args[1](wscInstance);

			expect(wscInstance.disable.calledOnce).to.be.true;

			done();
		});
	});

	it('should destroy instance if editor is removed', (done) => {
		const wscInstance = { destroy: sinon.stub() };

		editor.iframeElement = document.createElement('iframe');
		editor.initialized = true;
		editor.inline = false;

		new WProofreader(editor, optionsManager);

		setTimeout(() => {
			const callback = window.WEBSPELLCHECKER.init.getCall(0);

			editor.removed = true;

			callback.args[1](wscInstance);

			expect(wscInstance.destroy.called).to.be.true;

			done();
		});
	});

	describe('should manage initialized WSC instance', () => {
		let wscInstance;
		let wproofreader;

		class WPRoofreaderWithoutWscInitialization extends WProofreader {
			constructor(mockEditor, mockOptionsManager, mockWscInstance) {
				super(mockEditor, mockOptionsManager);

				this._instance = mockWscInstance;
			}

			_init() {}
		}

		beforeEach(() => {
			wscInstance = new WscInstance();
			wproofreader = new WPRoofreaderWithoutWscInitialization(editor, optionsManager, wscInstance);
		});

		describe('disable method', () => {
			it('should not throw an error on uninitialized instance method call', () => {
				const instance = new WPRoofreaderWithoutWscInitialization(editor, optionsManager, null);

				expect(() => instance.disable()).to.not.throw();
			});

			it('should disable WSC instance', () => {
				wproofreader.disable();

				expect(wscInstance.disable.calledOnce).to.be.true;
			});
		});

		describe('enable method', () => {
			it('should not throw an error on uninitialized instance method call', () => {
				const instance = new WPRoofreaderWithoutWscInitialization(editor, optionsManager, null);

				expect(() => instance.enable()).to.not.throw();
			});

			it('should enable WSC instance', () => {
				wproofreader.enable();

				expect(wscInstance.enable.calledOnce).to.be.true;
			});
		});

		describe('isDisabled method', () => {
			it('should not throw an error on uninitialized instance method call', () => {
				const instance = new WPRoofreaderWithoutWscInitialization(editor, optionsManager, null);

				expect(() => instance.isDisabled()).to.not.throw();
			});

			it('should indicates whether WSC instance is disabled', () => {
				wscInstance.isDisabled.returns(true);

				expect(wscInstance.isDisabled()).to.be.true;
				expect(wscInstance.isDisabled.calledOnce).to.be.true;
			});

			it('should indicates whether WSC instance is not disabled', () => {
				wscInstance.isDisabled.returns(false);

				expect(wscInstance.isDisabled()).to.be.false;
				expect(wscInstance.isDisabled.calledOnce).to.be.true;
			});
		});

		describe('openSettings method', () => {
			it('should not throw an error on uninitialized instance method call', () => {
				const instance = new WPRoofreaderWithoutWscInitialization(editor, optionsManager, null);

				expect(() => instance.openSettings()).to.not.throw();
			});

			it('should open WSC instance dialog', () => {
				wproofreader.openSettings();

				expect(wscInstance.openSettings.calledOnce).to.be.true;
			});
		});

		describe('openDialog method', () => {
			it('should not throw an error on uninitialized instance method call', () => {
				const instance = new WPRoofreaderWithoutWscInitialization(editor, optionsManager, null);

				expect(() => instance.openDialog()).to.not.throw();
			});

			it('should open WSC instance dialog', () => {
				wproofreader.openDialog();

				expect(wscInstance.openDialog.calledOnce).to.be.true;
			});
		});

		describe('getStaticActions method', () => {
			it('should return WSC instance static actions', () => {
				const staticActions = [];
				wscInstance.getStaticActions.returns(staticActions);

				expect(wproofreader.getStaticActions()).to.equal(staticActions);
				expect(wscInstance.getStaticActions.calledOnce).to.be.true;
			});

			it('should return empty array if WSC instance is missed', () => {
				wproofreader._instance = null;

				expect(wproofreader.getStaticActions().length).to.equal(0);
			});
		});

		describe('destroy method', () => {
			it('should destroy WSC instance ', () => {
				wproofreader.destroy();

				expect(wscInstance.destroy.calledOnce).to.be.true;
			});
		});
	});
});
