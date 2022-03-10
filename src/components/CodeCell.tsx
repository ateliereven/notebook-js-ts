import { useState } from 'react';

import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundle from '../bundler';

function CodeCell() {
  const [code, setCode] = useState('');
  const [input, setInput] = useState(''); //the code the user types in

  const onClick = async () => {
    const output = await bundle(input);
    // updating code state with the output code:
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  ); // pre tag is used to format the content as code lines
}

export default CodeCell;
