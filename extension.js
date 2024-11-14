const {St, Clutter} = imports.gi;
const Main = imports.ui.main;

TEXT = "Unlimited widgets, but no text"

const Indicator = GObject.registerClass(
    class Indicator extends PanelMenu.Button {
        init() {
            super.init(0.0, 'Toggle Button');

            this.label = new St.Label({
                text: TEXT,
                y_align: Clutter.ActorAlign.CENTER,
                style_class: 'panel-button'
            })
        }

    });

    enable () {
        // create text widget
        PanelText = new St.({
            style_class : "panel"
        })
    }

    disable() {}
}

