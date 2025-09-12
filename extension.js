import Clutter from 'gi://Clutter';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import GObject from 'gi://GObject';
import St from 'gi://St';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

const CONFIG_FILENAME = '.dyntext_config.txt';

const MyPopup = GObject.registerClass(
    class MyPopup extends PanelMenu.Button {
        _init() {
            super._init(0);

            const [labelText, menuText] = getText();

            this._buttonLabel = new St.Label({
                text: labelText,
                y_align: Clutter.ActorAlign.CENTER,
            });

            this._popupItem = new PopupMenu.PopupMenuItem(
                menuText,
                {
                    reactive: false,
                    style_class: 'PopupMenuFont',
                }
            );

            this.add_child(this._buttonLabel);
            this.menu.addMenuItem(this._popupItem);
        }

        updateTexts() {
            const [labelText, menuText] = getText();
            this._buttonLabel.text = labelText;
            this._popupItem.label.text = menuText;
        }
    });

export default class DynTextExtension extends Extension {
    constructor(metadata) {
        super(metadata);

        this._myPopup = null;
        this._timeout = null;
        this._timer_sec = 30;
    }

    enable() {
        this._myPopup = new MyPopup();
        this._update_label();
        Main.panel.addToStatusArea('myPopup', this._myPopup, 1);
    }

    disable() {
        if (this._myPopup) {
            this._myPopup.destroy();
            this._myPopup = null;
        }
        if (this._timeout) {
            GLib.Source.remove(this._timeout);
            this._timeout = null;
        }
        if (this._timer_sec)
            this._timer_sec = null;
    }

    _update_label() {
        if (this._timeout) {
            GLib.Source.remove(this._timeout);
            this._timeout = null;
        }

        if (this._myPopup)
            this._myPopup.updateTexts();

        if (this._timer_sec > 0) {
            this._timeout = GLib.timeout_add_seconds(
                GLib.PRIORITY_DEFAULT,
                this._timer_sec,
                () => {
                    this._update_label();
                    return GLib.SOURCE_CONTINUE;
                }
            );
        }
    }
}

function getText() {
    // Use the user's home directory for the config file
    let homeDir = GLib.get_home_dir();
    let configPath = GLib.build_filenamev([homeDir, CONFIG_FILENAME]);
    let TextStore = Gio.File.new_for_path(configPath);

    let title = " Could not read file '.dyntext_config.txt' ";
    let text = 'Nothing to see here.';

    try {
        let [success, content] = TextStore.load_contents(null);
        let contentStr = content.toString().trimEnd();

        if (contentStr.includes('\n')) {
            let lines = contentStr.split('\n');
            title = lines[0];
            text = lines.slice(1).join('\n');
        } else if (!success) {
            title = ' Hello, World! ';
        } else {
            title = ` ${contentStr.trim()} `;
        }
    } catch (e) {
        log(`Error reading DynText config: ${e}`);
    }

    return [title, text];
}

export function init() {
    return new DynTextExtension();
}
