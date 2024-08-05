import { expect } from 'chai';

describe('plugin', () => {
	it('should register WProofreader plugin', () => {
		let title;
		let callback;

		window.tinymce = {
			PluginManager: {
				add: (...args) => {
					[title, callback] = args;
				}
			}
		};

		// eslint-disable-next-line global-require
		require('../src/plugin');

		expect(title).to.be.equal('wproofreader');
		expect(callback).to.a('function');

		const metadata = callback()?.getMetadata();

		expect(metadata).to.be.exist;
		expect(metadata.name).to.equal('WProofreader plugin');
		expect(metadata.url).to.equal('https://webspellchecker.com/docs/api/wscbundle/Options.html');
	});
});
