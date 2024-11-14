const { St, Clutter } = imports.gi;
const Main = imports.ui.main;
const Gio = imports.gi.Gio;

let panelButton;

function label() {
    let TextStore = Gio.File.new_for_path(".dyntext_config.txt");
    let text = " Could not read file '.dyntext_config.txt' ";

    try {
        // read file content
        let [success, content] = TextStore.load_contents(null);

        // check for multiple newlines
        let content_newline = content.toString().trimEnd();
        if (JSON.stringify(content_newline).includes("\\n")) {
            throw new Error("File contains multiple lines.")
        }

        // add spaces before and after text, for prettier padding in button
        if (!success) {
            text = " Hello, World! ";
        } else {
            text = " " + content.toString().trim() + " "
        }
    } catch (e) {
        Main.notify("DynText Error", "Error reading file show_this.txt: " + e);
        log("Error reading file show_this.txt: " + e);
    }

    return new St.Label({
        text: text,
        y_align: Clutter.ActorAlign.CENTER,
    });
}

function init() {
    // Create a Button with "Hello World" text
    panelButton = new St.Bin({
        style_class: "panel-button",
    });

    // get and set text
    panelButton.set_child(label());
}

function enable() {
    // check for changes of text
    panelButton.set_child(label());

    // Add the button to the panel
    Main.panel._rightBox.insert_child_at_index(panelButton, 0);
}

function disable() {
    // Remove the added button from panel
    Main.panel._rightBox.remove_child(panelButton);
}
