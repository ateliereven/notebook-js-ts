import { useRef, useEffect } from 'react';

interface PreviewProps {
   code: string;
}

  //iframe is used to run the transpiled code output in our app.
  //the iframe helps with security and prevents running bad code directly on index.html and by that breaking up the app / throwing an error.
  //downside is that the iframe, in this configuration, cannot run things like local storage. to do that, the iframe html should run on a different port/server
  //to set the code that runs inside the iframe. child iframe listens for messages sent from the parent frame:
  const html = `
    <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
          try{
            eval(event.data);
          } catch (err) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }
        }, false);
      </script>
    </body>
    </html>
    `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
   const iframeRef = useRef<any>();
   
   useEffect(() => {
     //before transpiling, reset the iframe:
     iframeRef.current.srcdoc = html;
     //creating a message containing the result code and sending it to the iframe:
     iframeRef.current.contentWindow.postMessage(code, '*'); // * is for the message to run on any domain
   }, [code])
   return (
     <iframe
       title="preview"
       ref={iframeRef}
       sandbox="allow-scripts"
       /*to allow the iframe to run script tags*/ srcDoc={html}
     />
   );
};

export default Preview;