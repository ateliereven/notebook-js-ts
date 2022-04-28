# Notebook JS/TS

An interactive coding environment for JavaScript (and Typescript), resembling Jupyter Notebook. The app allows the user to create code or text snippets, execute code and view the output in a preview window. Code transpiling+bundling is performed directly in the browser using Web Assembly, via ESBuild, and all changes are saved to a local file, which is served via a CLI.

### install: `npm install notebook-js-ts`

## Available CLI Commands:

start notebook-js-ts server with npx:

### `npx notebook-js-ts serve`

A mynotes.js file is created by default under the root directory, saving your changes. Navigate to [http://localhost:4005](http://localhost:4005) to view it in the browser.

#

When installed globaly, these commands are available on the terminal:

### `notebook-js-ts serve`

Serving a specific file (optional):

### `notebook-js-ts serve <file-name>`

Serving file on a specific port (4045 is the default):

### `notebook-js-ts serve --port <port-number>`
or:
### `notebook-js-ts serve -p <port-number>`

#

## Using Notebook JS/TS:

- Two types of cells are available for your use - text cells and code cells.
- Click inside a text cell to edit it via markdown syntax.
- Code cells accept code written in js/ts/jsx/tsx. Switch between JS and TS by selecting language on the top left corner (JS is defualt).
- Use the built-in show() function to view the code output in the preview pane.
- You may import libraries and execute React.js components.
- Each code cell has the option to auto-format or clear cell content.
- Comulutive bundling is enabled between successive code cells.
- Re-order or delete cells using the buttons on the top right.
- Add new cells by clicking the +code / +text buttons.