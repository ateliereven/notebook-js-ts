import { useState, useEffect } from 'react';

import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundle from '../bundler';
import Resizable from './Resizable';

function CodeCell() {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [input, setInput] = useState(''); //the code the user types in

  // debouncing:
  useEffect(() => {
    // wait untill the user stops typing for 0.75 second before compiling their code
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      // updating code state with the output code:
      setCode(output.code);
      setErr(output.err);
    }, 750);
    //clearing effect:
    return () => { clearTimeout(timer) };
  }, [input])

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} err={err}/>
      </div>
    </Resizable>
  ); // pre tag is used to format the content as code lines
}

export default CodeCell;
