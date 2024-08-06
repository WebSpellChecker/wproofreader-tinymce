(() => {
    "use strict";
    class ButtonCreator {
        constructor(t) {
            this._wproofreader = t;
            this._actions = {
                settings: () => this._wproofreader.openSettings(),
                proofreadDialog: () => this._wproofreader.openDialog(),
                toggle: () => {
                    if (this._wproofreader.isDisabled()) {
                        this._wproofreader.enable();
                    } else {
                        this._wproofreader.disable();
                    }
                }
            };
        }
        create(t) {
            t.ui.registry.addMenuButton("wproofreader", {
                icon: "wproofreader",
                tooltip: "WProofreader text checker",
                fetch: t => t(this._getMenuButtons())
            });
        }
        _getMenuButtons() {
            if (!this._wproofreader.isInitialized()) {
                return [];
            }
            const t = this._wproofreader.isDisabled();
            return this._wproofreader.getStaticActions().filter((e => !t || e.name === "toggle")).map((t => ({
                type: "menuitem",
                text: this._getActionText(t),
                onAction: this._actions[t.name]
            })));
        }
        _getActionText(t) {
            if (t.name !== "toggle") {
                return t.localization.default;
            }
            if (this._wproofreader.isDisabled()) {
                return t.localization.enable;
            }
            return t.localization.disable;
        }
    }
    class IconManager {
        addIcon(t) {
            t.ui.registry.addIcon("wproofreader", this._getIcon());
        }
        _getIcon() {
            return '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.1468 18.0001L6.26758 14.3327L7.46309 13.2075L10.1479 15.7466L16.8077 9.4668L18.0009 10.592L10.1468 18.0001Z" fill="#222F3E"/><path d="M9.60283 12.2537C9.67073 12.4288 9.75157 12.6324 9.84641 12.8612C9.892 12.9735 9.94383 13.0828 10.0016 13.1885L11.6 11.4963L11.5892 11.4654L8.79771 4.14516C8.66622 3.77789 8.55844 3.48613 8.47437 3.26646C8.3877 3.04956 8.27929 2.84319 8.15103 2.65091C8.02392 2.45754 7.85694 2.29749 7.66278 2.18295C7.43046 2.05374 7.17043 1.99104 6.90832 2.00103C6.64869 1.99175 6.39125 2.05445 6.1614 2.18295C5.96548 2.29837 5.79814 2.46149 5.67316 2.65892C5.53197 2.89137 5.41455 3.13914 5.32287 3.39803L5.04695 4.15774L2.31256 11.5272C2.20478 11.8212 2.12071 12.05 2.07221 12.2137C2.02534 12.3686 2.00099 12.5303 2 12.6931C2.00172 12.8296 2.03044 12.9642 2.08428 13.0881C2.13813 13.2121 2.2159 13.3227 2.31256 13.4127C2.40721 13.5136 2.51977 13.5936 2.64372 13.648C2.76767 13.7024 2.90056 13.7301 3.03469 13.7297C3.16419 13.7424 3.29467 13.722 3.41524 13.6703C3.5358 13.6185 3.64295 13.5369 3.72772 13.4322C3.942 13.0749 4.11327 12.6905 4.23752 12.288L4.74732 10.8327H9.09195L9.60283 12.2537ZM5.3164 9.10502L6.89862 4.42319L8.50886 9.10502H5.3164Z" fill="#222F3E"/></svg>';
        }
    }
    class OptionsManager {
        constructor(t) {
            this._editor = t;
            this._options = this._getOptions();
            this._init();
        }
        _getOptions() {
            const t = this._editor.getParam("wproofreader");
            if (!t) {
                throw new Error("No WProofreader configuration.");
            }
            return t;
        }
        _init() {
            this._setTheme();
            this._setAutoStartup();
        }
        _setTheme() {
            if (!this._options.theme) {
                this._options.theme = "tinymce";
            }
        }
        _setAutoStartup() {
            if (!this._options.hasOwnProperty("autoStartup")) {
                this._options.autoStartup = true;
            }
        }
        getOptions() {
            return this._options;
        }
        getOption(t) {
            return this._options[t];
        }
        setOption(t, e) {
            this._options[t] = e;
        }
    }
    class WProofreader {
        constructor(t, e) {
            this._instance = null;
            this._editor = t;
            this._optionsManager = e;
            this._init();
        }
        _init() {
            this._loadWscBundle().then((() => {
                this._initOnScriptLoaded();
            })).catch((t => {
                throw new Error(t);
            }));
        }
        _loadWscBundle() {
            const t = this._optionsManager.getOption("srcUrl");
            if (!t) {
                throw new Error("Path to the script is not specified.");
            }
            return window.tinymce.ScriptLoader.loadScript(t);
        }
        _initOnScriptLoaded() {
            if (this._editor.initialized) {
                this._createInstance();
            } else {
                this._editor.on("init", (() => this._createInstance()));
            }
        }
        _createInstance() {
            const t = this._editor.inline ? this._editor.bodyElement : this._editor.iframeElement;
            this._optionsManager.setOption("container", t);
            window.WEBSPELLCHECKER.init(this._optionsManager.getOptions(), (t => this._handleInstanceCreated(t)));
        }
        _handleInstanceCreated(t) {
            this._instance = t;
            if (this._editor.mode.isReadOnly()) {
                this.disable();
            }
        }
        disable() {
            this._instance.disable();
        }
        isInitialized() {
            return !!this._instance;
        }
        enable() {
            this._instance.enable();
        }
        isDisabled() {
            return this._instance.isDisabled();
        }
        openSettings() {
            this._instance.openSettings();
        }
        openDialog() {
            this._instance.openDialog();
        }
        getStaticActions() {
            return this._instance.getStaticActions();
        }
        destroy() {
            this._instance.destroy();
        }
    }
    class WProofreaderPlugin {
        constructor(t) {
            this._editor = t;
            this._init();
        }
        _init() {
            this._createOptionsManager();
            this._createWproofreader();
            this._addIcon();
            this._addButton();
            this._subscribeOnEditorEvents();
        }
        _createOptionsManager() {
            this._optionsManager = new OptionsManager(this._editor);
        }
        _createWproofreader() {
            this._wproofreader = new WProofreader(this._editor, this._optionsManager);
        }
        _addIcon() {
            (new IconManager).addIcon(this._editor);
        }
        _addButton() {
            new ButtonCreator(this._wproofreader).create(this._editor);
        }
        _subscribeOnEditorEvents() {
            this._editor.on("SwitchMode", (() => this._handleSwitchMode()));
            this._editor.on("remove", (() => this._handleRemove()));
        }
        _handleSwitchMode() {
            if (this._editor.mode.isReadOnly()) {
                this._wproofreader.disable();
            } else {
                this._wproofreader.enable();
            }
        }
        _handleRemove() {
            this._wproofreader.destroy();
        }
        getMetadata() {
            return {
                getMetadata: () => ({
                    name: "WProofreader plugin",
                    url: "https://webspellchecker.com/docs/api/wscbundle/Options.html"
                })
            };
        }
    }
    window.tinymce.PluginManager.add("wproofreader", (t => {
        const e = new WProofreaderPlugin(t);
        return e.getMetadata();
    }));
})();