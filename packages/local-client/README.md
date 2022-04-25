# Notebook JS/TS

An interactive coding environment for JavaScript (and Typescript), resembling Jupyter Notebook. Written in Typescript, using React.js and Redux on the client side. The app allows the user to create code or text snippets, execute code and view the output in a preview window. Code transpiling+bundling is performed directly in the browser using Web Assembly, via ESBuild, and all changes are saved to a local file, which is served via a CLI.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

