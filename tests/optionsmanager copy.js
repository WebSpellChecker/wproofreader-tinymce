import sinon from 'sinon';
import { expect } from 'chai';
import Editor from './mocks/editor';
import OptionsManager from '../src/optionsmanager';

describe('OptionsManager', () => {
	let editor;
	let options;
	let optionsManager;
	let getParamStub;

	beforeEach(() => {
		sinon.restore();

		options = {};
		editor = new Editor();
		getParamStub = sinon.stub(editor, 'getParam').returns(options);

		optionsManager = new OptionsManager(editor);
	});

	describe('initialization', () => {
		it('should throw error if WProofreader options not passed', () => {
			getParamStub.reset();
			getParamStub.returns(null);

			expect(() => new OptionsManager(editor)).to.throw('No WProofreader configuration.');
		});

		it('should set tinymce theme as default, if no other is provided', () => {
			expect(options.theme).to.equal('tinymce');
		});

		it('should not set tinymce theme, if other is provided', () => {
			options.theme = 'default';

			expect(options.theme).to.equal('default');
		});

		it('should set autoStartup option as default, if it is not provided', () => {
			expect(options.autoStartup).to.be.true;
		});

		it('should not set autoStartup option, if it is provided', () => {
			options.autoStartup = false;

			expect(options.autoStartup).to.be.false;
		});
	});

	describe('getOptions method', () => {
		it('should return passed options', () => {
			expect(optionsManager.getOptions()).to.equal(options);
		});
	});

	describe('getOption method', () => {
		it('should return required option', () => {
			options.serviceId = 'customerId';

			expect(optionsManager.getOption('serviceId')).to.equal('customerId');
		});
	});

	describe('setOption method', () => {
		it('should set option', () => {
			optionsManager.setOption('autocorrect', true);

			expect(options.autocorrect).to.be.true;
		});
	});
});
