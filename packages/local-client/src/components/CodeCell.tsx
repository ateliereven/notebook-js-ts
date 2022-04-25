import '../scss/CodeCell.scss';
import React, { useEffect } from 'react';

import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  //for dispatching the code the user types-in:
  const { updateCell, createBundle } = useActions();
  //for pulling state out of the redux store:
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);
  
  // debouncing:
  useEffect(() => {
    // for the first time the component renders when the app loads - immidiately bundle:
    if (!bundle) {
      // defualt bundle with jsx loader:
      createBundle(cell.id, cumulativeCode, 'jsx');
      return;
    }
    // wait untill the user stops typing for 0.75 second before bundling their code:
    const timer = setTimeout(async () => {
      // dispatching code state with the output code:
      createBundle(cell.id, cumulativeCode, bundle.loader)
    }, 750);

    //clearing effect:
    return () => { clearTimeout(timer) };
  }, [cumulativeCode, cell.id])

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 13px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
            editorLanguage={bundle?.loader === 'tsx' ? 'typescript' : 'javascript'}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundle || bundle.loading
            ? (
                <div className='progress-cover'>
                  <progress className='progress is-small is-danger' max='100'>Loading</progress>
                </div>
                )
            : <Preview code={bundle.code} err={bundle.err}/>    
          }
        </div>
      </div>
      </Resizable>
  );
}

export default CodeCell;
