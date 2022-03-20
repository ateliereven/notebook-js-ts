import { useRef, useEffect } from 'react';
import './Preview.css';

interface PreviewProps {
  code: string;
  err: string;
}

  //iframe is used to run the transpiled code output in our app.
  //the iframe helps with security and prevents running bad code directly on index.html and by that breaking up the app / throwing an error.
  //downside is that the iframe, in this configuration, cannot run things like local storage. to do that, the iframe html should run on a different port/server
  //to set the code that runs inside the iframe. child iframe listens for messages sent from the parent frame
  //event listener handels asynchronus code errors, otherwise if synchronous they are caught in the try catch
  const html = `
    <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
      const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
      };
      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      })
        window.addEventListener('message', (event) => {
          try{
            eval(event.data);
          } catch (err) {
            handleError(err);
          }
        }, false);
      </script>
    </body>
    </html>
    `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
   const iframeRef = useRef<any>();
   
  useEffect(() => {
    //before transpiling, reset the iframe:
    iframeRef.current.srcdoc = html;
    //creating a message containing the result code and sending it to the iframe
    // delaying it a little with setTimeOut so that it has time to load:
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*'); // * is for the message to run on any domain
    }, 50);
  }, [code]);
  console.log(err);
  return (
    <div className='preview-wrapper'>
      <iframe
        title="preview"
        ref={iframeRef}
        /*to allow the iframe to run script tags*/
        sandbox="allow-scripts"
        srcDoc={html}
      />
{err && <div className='preview-error'>{err}</div>}    
    </div>
  );
};

export default Preview;