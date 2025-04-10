import sinon from 'sinon';
import { expect } from 'chai';

describe('WProofreader plugin', () => {
	before(() => {
		return new Promise((resolve) => {
			const script = document.createElement('script');

			script.src = 'http://localhost:9876/base/node_modules/tinymce/tinymce.min.js';
			script.onload = () => resolve();

			document.head.append(script);
		});
	});

	it('should load TinyMCE editor', () => {
		expect(window.tinymce).to.be.exist;
	});

	describe('initalized editor', () => {
		let div;
		let editor;

		beforeEach(() => {
			div = document.createElement('div');
			document.body.append(div);

			return createEditor(div)
				.then((editors) => {
					[editor] = editors;
				});
		});

		afterEach(() => {
			sinon.restore();

			editor.destroy();
			div.remove();
		});

		it('should initialize TinyMCE editor', () => {
			expect(editor).to.be.exist;
			expect(editor.initialized).to.be.true;
		});

		it('should load WSC bundle', () => {
			expect(window.WEBSPELLCHECKER).to.be.exist;
		});

		it('should add a toolbar button', () => {
			const button = document.querySelector("button[data-mce-name='wproofreader']");

			expect(button).to.be.exist;
		});

		it('should create WSC instance', () => {
			expect(window.WEBSPELLCHECKER.getInstances().length).to.be.equal(1);
		});

		it('should destroy WSC instance on editor destroy', () => {
			const spy = sinon.spy(window.WEBSPELLCHECKER.getInstances()[0], 'destroy');

			editor.destroy();

			expect(spy.calledOnce).to.be.true;
		});

		describe('toolbar menu', () => {
			let button;

			beforeEach(() => {
				button = document.querySelector("button[data-mce-name='wproofreader']");
			});

			it('should display defined buttons if WProofreader is enabled', (done) => {
				const expected = ['Disable', 'Settings', 'Proofread in dialog'];

				window.WEBSPELLCHECKER.getInstances()[0].enable();

				button.click();

				setTimeout(() => {
					const menu = document.querySelector('.tox-selected-menu');
					const items = document.querySelectorAll('.tox-collection__item .tox-collection__item-label');

					expect(menu).to.be.exist;
					expect(items.length).to.equal(3);

					expected.forEach((item, index) => {
						expect(items[index].innerText).to.be.equal(item);
					});

					done();
				}, 0);
			});

			it('should display defined buttons if WProofreader is disabled', (done) => {
				const expected = ['Enable'];

				window.WEBSPELLCHECKER.getInstances()[0].disable();

				button.click();

				setTimeout(() => {
					const menu = document.querySelector('.tox-selected-menu');
					const items = document.querySelectorAll('.tox-collection__item .tox-collection__item-label');

					expect(menu).to.be.exist;
					expect(items.length).to.equal(1);

					expected.forEach((item, index) => {
						expect(items[index].innerText).to.be.equal(item);
					});

					done();
				}, 0);
			});
		});
	});
});

function createEditor(target) {
	return window.tinymce.init({
		target,
		license_key: 'gpl',
		toolbar: 'undo redo | bold italic underline | wproofreader',
		external_plugins: {
			wproofreader: 'http://localhost:9876/base/dist/plugin.min.js'
		},
		wproofreader: {
			serviceProtocol: 'http',
			serviceHost: 'localhost',
			servicePort: '2880',
			servicePath: '/',
			srcUrl: 'http://localhost:9876/base/tests/mocks/wscbundle.js'
		},
	});
}
