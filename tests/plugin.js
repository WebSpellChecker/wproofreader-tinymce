import { expect } from 'chai';
import sinon from 'sinon';
import WProofreaderPlugin from '../src/wproofreaderplugin';

describe('plugin', () => {
	it('should register WProofreader plugin', () => {
		const metadataStub = {};
		let title;
		let callback;

		window.tinymce = {
			PluginManager: {
				add: (...args) => {
					[title, callback] = args;
				}
			}
		};

		sinon.stub(WProofreaderPlugin.prototype, '_init');
		sinon.stub(WProofreaderPlugin.prototype, 'getMetadata').returns(metadataStub);

		// eslint-disable-next-line global-require
		require('../src/plugin');

		expect(title).to.be.equal('wproofreader');
		expect(callback).to.a('function');

		const metadata = callback();

		expect(metadata).to.equal(metadataStub);
	});
});
