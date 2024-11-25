const { St, Gio, Clutter, GObject, GLib } = imports.gi;
const Mainloop = imports.mainloop;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Me = imports.misc.extensionUtils.getCurrentExtension();


let myPopup;
let ButtonLabel;
let PopupItem;

let timeout;
let timer_sec;

const MyPopup = GObject.registerClass(
    class MyPopup extends PanelMenu.Button {

        _init() {
            super._init(0);

            // get and set text for button
            const texts = get_text();

            let label_text = texts[0];
            let menu_text = texts[1];

            ButtonLabel = new St.Label({
                text: label_text,
                y_align: Clutter.ActorAlign.CENTER,
            });

            PopupItem = new PopupMenu.PopupMenuItem(
                menu_text,
                {
                    reactive: false,
                    style_class: 'PopupMenuFont',
                },
            )

            // add button to top bar
            this.add_child(ButtonLabel);


            // add menu to button
            this.menu.addMenuItem(PopupItem);
        }
    });

function init() {
}

function enable() {
    myPopup = new MyPopup();

    // set timer, update label and display
    timer_sec = 30;
    update_label();
    Main.panel.addToStatusArea('myPopup', myPopup, 1);
}

function disable() {
    myPopup.destroy();

    // remove mainloop if it was set
    if (timeout) {
        Mainloop.source_remove(timeout);
        timeout = null;
    }
}

function update_label() {
    log("[DynText] Updating label...");
    const texts = get_text();

    let label_text = texts[0];
    let menu_text = texts[1];

    ButtonLabel.text = label_text;
    PopupItem.label.text = menu_text;

    // setup mainloop with interval of timer_sec
    if (timer_sec > 0) {
        timeout = Mainloop.timeout_add_seconds(timer_sec, update_label);
    } else {
        Main.notify("DynText hint", "No timer set or timer invalid.");
        Main.notify("Timer: " + timer_sec.toString());
        //exit
    }
}

function get_text() {
    let TextStore = Gio.File.new_for_path(".dyntext_config.txt");
    let title = " Could not read file '.dyntext_config.txt' ";
    let text = "Nothing to see here.";

    try {
        // read file content
        let [success, content] = TextStore.load_contents(null);

        // check for multiple newlines
        let content_newline = content.toString().trimEnd();
        if (content_newline.includes("\n")) {
            let lines = content.toString().split('\n');

            // parse content
            title = lines[0];
            text = lines.splice(1).join('\n');
        } else {
            // add spaces before and after text, for prettier padding in button
            if (!success) {
                title = " Hello, World! ";
            } else {
                title = ` ${content.toString().trim()} `
                // text = " " + content.toString().trim() + " "
            }
        }


    } catch (e) {
        Main.notify("DynText Error", "Error reading config: " + e);
        log("Error reading config: " + e);
    }

    return [title, text];
}
