import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
// import a library for handling chaching with indexDB:
import localForage from 'localforage';

//create cache object:
const fileCache = localForage.createInstance({
  name: 'filecache',
});

// this is a plugin that works inside of esbuild:
export const fetchPlugin = (inputCode: string, languageLoader: esbuild.Loader) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      //return a file to be loaded instead of index.js:
      build.onLoad({ filter: /(^index\.js$)/ }, async (args: any) => {
        return {
          loader: languageLoader,
          contents: inputCode,
        };
      });

      // caching result:
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        ); // getItem is a generic function and we need to set it a return value type
        // if it's not, cachedResult will return null or undefined
        // if it is, return it immidiately
        if (cachedResult) return cachedResult;
      });
       
      // for the case when loading a css file that not cached:
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        //appending css file to the html head via javascript file, because esbuild doesn't handle css. this doesn't support advanced css features like import or url links to font files:
        const escaped = data
          .replace(/\n/g, '') //replace all new lines with an empty string to collapse the css into one line
          .replace(/""/g, '\\"') // avoid ""
          .replace(/'/g, "\\'"); // avoid ''
        const contents = `const styles = document.createElemnt('style');
              style.innerText = '${escaped}';
              document.head.appendChild(style);
              `;
        const result: esbuild.OnLoadResult = {
          // esbuild.OnLoadResult is the type of object this function returns
          loader: languageLoader,
          contents,
          resolveDir: new URL('./', request.responseURL).pathname, //to get redirect path of the file we are trying to load
        };
        // store response in cache:
        await fileCache.setItem(args.path, result);
        return result;
      });

      // for loading a js file that's not cached:
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          // esbuild.OnLoadResult is the type of object this function returns
          loader: languageLoader,
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname, //to get redirect path of the file we are trying to load
        };
        // store response in cache:
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
