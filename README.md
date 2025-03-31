WProofreader plugin TinyMCE
===================================

The multilingual spelling and grammar checking solution for TinyMCE editor versions starting from v6, including the latest version 7. It provides both instant and in-dialog proofreading modes in a convenient UI. 

WProofreader plugin for TinyMCE inherits all functionality of the WProofreader component with slight adaptation to the view and features of the editor. These adaptations include creating a button in the editor toolbar, listening for read-only mode switches and adding a theme adapted to the TinyMCE look and feel. For more details, visit the [WProofreader repo](https://github.com/WebSpellChecker/wproofreader) or [official web page](https://webspellchecker.com/wsc-proofreader/).

## Table of contents

* [Install instructions](#install-instructions)
* [Documentation](#documentation)
* [Reporting issues](#reporting-issues)
* [Technical support or questions](#technical-support-or-questions)
* [License](#license)

## Install instructions

1. Install the plugin

	You can integrate the plugin using one of these methods:
	- [Using CDN](#using-cdn): Suitable for environments where no build process is involved.
	- [Using npm](#using-npm): Recommended for projects utilizing a JavaScript bundler.

	### Using CDN

	Use the `external_plugins` option to specify the URL-based location of the entry point file for the plugin and include it as a toolbar item using `toolbar` option.

	```html
	<script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/7/tinymce.min.js" referrerpolicy="origin"></script>

	<script>
		tinymce.init({
			selector: '#editorElement',
			external_plugins: {
				wproofreader: 'https://cdn.jsdelivr.net/npm/@webspellchecker/wproofreader-tinymce@1.0.0/dist/plugin.min.js'
			},
			toolbar: '... wproofreader',
			wproofreader: {
				/* WProofreader config */
			}
		});
	</script>
	```

	### Using npm

	To install the plugin via npm, run the following command:

	```
	npm install @webspellchecker/wproofreader-tinymce
	```

	The plugin will be installed into the next folder: `node_modules/@webspellchecker/wproofreader-tinymce/dist/plugin.min.js`.

	Make the plugin accessible for application by using a web server or copying it to a public folder using a build tool. Then use the `external_plugins` option to specify the URL-based location of the entry point file for the plugin and include it as a toolbar item using `toolbar` option.

	```html
	<script src="/path/or/uri/to/tinymce.min.js" referrerpolicy="origin"></script>

	<script>
		tinymce.init({
			selector: '#editorElement',
			external_plugins: {
				wproofreader: '/path/or/uri/to/@webspellchecker/wproofreader-tinymce/dist/plugin.min.js'
			},
			toolbar: '... wproofreader',
			wproofreader: {
				/* WProofreader config */
			}
		});
	</script>
	```

	Alternatively, copy the `dist` plugin subfolder into the TinyMCE plugins folder and rename it to `wproofreader`. Then use the `plugins` option to load the plugin and include it as a toolbar item using `toolbar` option.

	```html
	<script src="/path/or/uri/to/tinymce.min.js" referrerpolicy="origin"></script>

	<script>
		tinymce.init({
			selector: '#editorElement',
			plugins: '... wproofreader',
			toolbar: '... wproofreader',
			wproofreader: {
				/* WProofreader config */
			}
		});
	</script>
	```

	For ES6 projects import the plugin to the source file and use the `plugins` option to load the plugin. Then include it as a toolbar item using `toolbar` option.

	```js
	import tinymce from 'tinymce';
	import 'tinymce/icons/default/icons.min.js';
	import 'tinymce/themes/silver/theme.min.js';
	import 'tinymce/models/dom/model.min.js';
	import 'tinymce/skins/ui/oxide/skin.js';
	import 'tinymce/skins/ui/oxide/content.js';
	import 'tinymce/skins/content/default/content.js';
	...
	import '@webspellchecker/wproofreader-tinymce/src/plugin.js';
	...

	export function render() {
		tinymce.init({
			selector: '#editorElement',
			plugins: '... wproofreader',
			toolbar: '... wproofreader',
			wproofreader: {
				/* WProofreader config */
			}
		});
	};
	```

2. Configure the plugin

	After installing the plugin, you need to configure it in the TinyMCE setup. The configuration is added to the `wproofreader` field. For a detailed list of available customization options, refer to [Configuration reference](https://webspellchecker.com/docs/api/wscbundle/Options.html).

	For the **Cloud-based** version of WProofreader:

	```js
	wproofreader: {
		lang: 'en_US', // sets the default language
		serviceId: 'your-service-ID', // required for the Cloud version only
		srcUrl: 'https://svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js'
	}
	```

	`serviceId` is a mandatory parameter for activating and using the plugin pointed to the Cloud-based version of WProofreader.

	For the **Server-based** version of WProofreader:

	```js
	wproofreader: {
		lang: 'en_US', // sets the default language
		serviceProtocol: 'https',
		serviceHost: 'localhost',
		servicePort: '443',
		servicePath: 'virtual_directory/api', // by default the virtual_directory is wscservice
		srcUrl: 'https://host_name/virtual_directory/wscbundle/wscbundle.js'
	}
	```

	Unlike the Cloud-based version, the `serviceId` parameter is not used here. Instead, it is required to specify the path to the backend entry point hosted on the client’s infrastructure.

## Documentation

To find out more, refer to the following documentation:

* [WProofreader Configuration reference](https://webspellchecker.com/docs/api/wscbundle/Options.html)
* [TinyMCE Documentation](https://www.tiny.cloud/docs/tinymce/latest/)

## Reporting issues

We use GitHub Issues as the official public bug tracker for WProofreader plugin for TinyMCE. Here are some recommendations to take into account when reporting an issue:

* Provide steps which help us to reproduce an issue. A sample page or JSFiddle is always welcomed.
* Some issues may be browser and integration-specific. So, please specify what browser and integration you encountered the issue with.

## Technical support or questions

Holders of an active subscription to the services or a commercial license have access to professional technical assistance directly from the support team. [Contact us here](https://webspellchecker.com/contact-us/).

## License
Licensed under the terms of the MIT license. For full details about the license, please check the `LICENSE.md` file.
