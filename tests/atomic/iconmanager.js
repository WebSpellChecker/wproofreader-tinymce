import sinon from 'sinon';
import { expect } from 'chai';
import IconManager from '../../src/iconmanager';
import Editor from './mocks/editor';

describe('IconManager', () => {
	const iconManager = new IconManager();
	const editor = new Editor();

	afterEach(() => {
		sinon.restore();
	});

	it('should be created', () => {
		expect(iconManager).to.be.exist;
	});

	describe('addIcon method', () => {
		it('should add icon', () => {
			const stub = sinon.stub(editor.ui.registry, 'addIcon');

			iconManager.addIcon(editor);

			expect(stub.calledOnce).to.be.true;
			expect(stub.getCall(0).args[0]).to.equal('wproofreader');
			expect(stub.getCall(0).args[1]).to.be.an('string');
		});
	});
});
