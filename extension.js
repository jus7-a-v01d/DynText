const { St, Clutter } = imports.gi;
const Main = imports.ui.main;
const Gio = imports.gi.Gio;

let TextStore = Gio.File.new_for_path("./show_this.txt");
let panelButton;

function read_text_from_file() {
    let text = " Could not read file :( ";

    try {
        // read file content
        let [success, content] = TextStore.load_contents(null);

        // add spaces before and after text, for prettier padding in button
        if (!success) {
            text = " Hello, World! ";
        } else {
            //text = " " + content.toString().trim() + " ";
            text = " AAAAA "
        }
    } catch (e) {
        log("Error reading file show_this.txt: " + e);
    }

    return text;
}

function label() {
    let text = read_text_from_file();

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
