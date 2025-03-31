import WProofreaderPlugin from './wproofreaderplugin';

window.tinymce.PluginManager.add('wproofreader', (editor) => {
	const plugin = new WProofreaderPlugin(editor);

	return plugin.getMetadata();
});
