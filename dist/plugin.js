(() => {
    window.tinymce.PluginManager.add("wproofreader", (() => ({
        getMetadata: () => ({
            name: "WProofreader plugin",
            url: "https://webspellchecker.com/docs/api/wscbundle/Options.html"
        })
    })));
})();