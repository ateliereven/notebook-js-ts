import { useState, useEffect } from 'react';

import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundle from '../bundler';
import Resizable from './Resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  //for dispatching the code the user types-in:
  const { updateCell } = useActions();

  // debouncing:
  useEffect(() => {
    // wait untill the user stops typing for 0.75 second before compiling their code
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      // updating code state with the output code:
      setCode(output.code);
      setErr(output.err);
    }, 750);
    //clearing effect:
    return () => { clearTimeout(timer) };
  }, [cell.content])

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} err={err}/>
      </div>
    </Resizable>
  ); // pre tag is used to format the content as code lines
}

export default CodeCell;
