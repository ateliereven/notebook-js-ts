import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: esbuild.Service;


const bundle =  async (rawCode: string) => {
  // initializing web assembly bundle (transpiles esbuild code that's written in Go to run on the browser):
  // if service is not defined assign this variable with esbuild.startService:
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm', //the package will be downloaded by the user from this address
    });
  }

  //after service has been initialized:

  /*//to transpile input code (jsx) into plain JavaScript (es2015):
    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015'
    });*/
   
  //to transpile and build input code (jsx) into plain JavaScript (es2015), and handle package imports:
  const result = await service.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)], //passing input value to the plugin to transpile the input
    define: {
      'process.env.NODE_ENV': '"production"', //important that production will be a string
      global: 'window', // necessary for bundling inside the browser
    },
  });

  // returning the result transpiled code:
  return result.outputFiles[0].text;
};

export default bundle;