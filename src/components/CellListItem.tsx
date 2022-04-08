import { Cell } from '../state';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';

interface CellListItemProps {
   cell: Cell
}
// CellListItem receives cell as props from CellList. The type of cell is defined in the state directory
const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
   let child: JSX.Element;
   if (cell.type === 'code') child = <CodeCell cell={cell}/>;
   else child = <TextEditor cell={cell}/>
return <div>{child}</div>
}

export default CellListItem;