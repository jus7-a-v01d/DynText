const { St, Clutter, Gio, GLib } = imports.gi;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;

let panelButton;
let timeout;
let timer_sec;
let panelLabel;

function get_text() {
    let TextStore = Gio.File.new_for_path(".dyntext_config.txt");
    let text = " Could not read file '.dyntext_config.txt' ";

    try {
        // read file content
        let [success, content] = TextStore.load_contents(null);

        // check for multiple newlines
        let content_newline = content.toString().trimEnd();
        if (content_newline.includes("\n")) {
            throw new Error("File contains multiple lines.")
        }

        // add spaces before and after text, for prettier padding in button
        if (!success) {
            text = " Hello, World! ";
        } else {
            text = ` ${content.toString().trim()} `
            // text = " " + content.toString().trim() + " "
        }

    } catch (e) {
        Main.notify("DynText Error", "Error reading config: " + e);
        log("Error reading config: " + e);
    }

    return text;
}

function update_label() {
    const txt = get_text();

    // check for changes of text
    panelLabel.text = txt;

    // setup mainloop with interval of timer_sec
    if (timer_sec > 0) {
        timeout = Mainloop.timeout_add_seconds(timer_sec, update_label);
    } else {
        Main.notify("DynText hint", "No timer set or timer invalid.");
        Main.notify("Timer: " + timer_sec.toString());
        //exit
    }
}

function init() {
    // Create a Button with "Hello World" text
    panelButton = new St.Bin({
        style_class: "panel-button",
    });

    // get and set text
    panelLabel = new St.Label({
        text: "fester Text",
        y_align: Clutter.ActorAlign.CENTER,
    });

    panelButton.set_child(panelLabel);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(panelButton, 0);

    // read the timer env var
    let Timer = GLib.getenv('DYNTEXT_TIMER_SEC');

    // set timer and update label text
    timer_sec = 30;
    update_label();
}

function disable() {
    // Remove the added button from panel
    Main.panel._rightBox.remove_child(panelButton);

    // remove mainloop if it was set
    if (timeout) {
        Mainloop.source_remove(timeout);
        timeout = null;
    }
}

