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
		options = {};
		editor = new Editor();
		getParamStub = sinon.stub(editor, 'getParam').returns(options);

		optionsManager = new OptionsManager(editor);
	});

	afterEach(() => {
		sinon.restore();
	});

	describe('initialization', () => {
		it('should throw error if WProofreader options not passed', () => {
			getParamStub.reset();
			getParamStub.returns(null);

			expect(() => new OptionsManager(editor)).to.throw('No WProofreader configuration.');
		});

		it('should throw an error if the WProofreader field value is not an object', () => {
			getParamStub.reset();
			getParamStub.returns('service-id');

			expect(() => new OptionsManager(editor)).to.throw('WProofreader options has incorrect type.');
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
		it('should return options', () => {
			expect(optionsManager.getOptions()).to.equal(options);
		});
	});

	describe('getOption method', () => {
		it('should return required option value', () => {
			options.serviceId = 'customerId';

			expect(optionsManager.getOption('serviceId')).to.equal('customerId');
		});
	});

	describe('setOption method', () => {
		it('should set option value', () => {
			optionsManager.setOption('autocorrect', true);

			expect(options.autocorrect).to.be.true;
		});
	});
});
