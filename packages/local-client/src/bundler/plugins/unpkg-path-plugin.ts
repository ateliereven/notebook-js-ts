import * as esbuild from 'esbuild-wasm';

// this is a plugin that works inside of esbuild
export const unpkgPathPlugin = () => {
  return {
    //name is debugging purposes:
    name: 'unpkg-path-plugin',
    //overiding the bunling process of esbuild:
    setup(build: esbuild.PluginBuild) {
      //onResolve resolves actual path to the file:
       
       // handle root entry file of 'index.js':
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        //filter is executed against the file name trying to load. regex to find exactly index.js
        return { path: 'index.js', namespace: 'a' }; //aplied only to files with the namespace of a
      });

      // handle relative paths in a module:
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        // regex  filter to find if file has a relative path:
        return {
          path: new URL(args.path, 'http://unpkg.com' + args.resolveDir + '/')
            .href, //args.path is the package name, args.resolveDir is location of the directory the file is in. href contains the joined url with the relative path
          namespace: 'a', //aplied only to files with the namespace of a
        };
      });
      // handle main file of a module:
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          path: `https://unpkg.com/${args.path}`, //args.path is the package name
          namespace: 'a',
        };
      });
       
    },
  };
};
