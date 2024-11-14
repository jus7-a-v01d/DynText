# DynText
A customizable text-widget for your top bar.

## What makes it special?
- There is **no GUI**.
    - The text can be modified through a terminal or a text editor of your choice.
- Use it for a **static or semi-dynamic** display of text
    - Specify a timer for DynText to look for changes in your text.
    - Omit the timer, and DynText will not automatically look for changes.
    > DynText will not automatically update it's text source, you have to do this yourself.
- Display anything you can write in **one line** of a file
    - The only size limitation is the length of your top bar.

## Installation
Coming soon...

## To show text
### Static
There are only two steps, if you simply want to display a static text on your top bar.
1. create the config file
```bash
touch ~/.dyntext_config.txt
```

2. put some text in your config file
```bash
# alternatively, you can use a text editor of your choice for this step
echo "This text will be shown!" > ~/.dyntext_config.txt
```

### Dynamic (periodic updates)
[not yet implemented]

### Notes
- The config file may only contain one line of text, as the widget cannot display multiple lines.
- I have not set a limit on how many characters that line can have, you may however be limited by the size of your top bar

## If this is not what you're looking for...
This extension was inspired by the following repositories, maybe you will find something there:
- https://github.com/Guleri24/show-me-the-text.git
