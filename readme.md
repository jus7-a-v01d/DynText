# DynText
A customizable text-widget for your top bar.

## What makes it special?
- There is **no GUI**.
    - The text can be modified through your terminal or a text editor of your choice.
- Display anything you can write in **one line** of a file on your top bar
    - The only size limitation is the length of your top bar.
- Display anything larger than one line in a **popup-menu**
    - Anything written after the first line will be put in a popup menu, activated by pressing the widget.
- Periodic **updates**
    - Every 30 seconds the DynText widget will check your text-source again and update itself.
    > The duration between each update will be customizable in the future™.


## Installation
Coming soon...

> Note: if you also want to skip the GUI when enabling / disabling DynText, use these commands:
```bash
gnome-extensions enable DynText@jus7-a-v01d
gnome-extensions disable DynText@jus7-a-v01d
```

## To show text
### Top bar widget
- create the config file
    ```bash
    touch ~/.dyntext_config.txt
    ```

- put some text in your config file
    ```bash
    # alternatively, you can use a text editor of your choice for this step
    echo "This text will be shown!" > ~/.dyntext_config.txt
    ```

    Result:
    ```
    --------------------------
    |This text will be shown!|       <- Button
    --------------------------
    -------------------------------
    | Nothing to see here.        |   <- Popup, with default content
    -------------------------------
    ```

### Popup menu
- append text to your config file
    ```bash
    echo "This will\nshow up\nas multiple\nlines!" >> ~/.dyntext_config.txt
    ```

    Result:
    ```
    -----------
    |This will|       <- Button
    -----------
    ------------------
    | show up        |
    | as multiple    |   <- Popup
    | lines!         |
    ------------------
    ```


## If this is not what you're looking for...
This extension was inspired by the following repository, maybe you will find something there:
- https://github.com/Guleri24/show-me-the-text.git
