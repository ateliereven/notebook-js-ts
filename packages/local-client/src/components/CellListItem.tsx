import '../scss/CellListItem.scss';
import { AnimateSharedLayout, motion } from 'framer-motion';
import { Cell } from '../state';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import ActionBar from './ActionBar';

interface CellListItemProps {
   cell: Cell
}
// CellListItem receives cell as props from CellList. The type of cell is defined in the state directory
const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
   let child: JSX.Element;
   if (cell.type === 'code') child = <>
      <AnimateSharedLayout>
         <motion.div
            layout
            className='card'
         >
      <div className='action-bar-wrapper'><ActionBar id={cell.id} type={cell.type} /></div>
            <CodeCell cell={cell} />
            </motion.div>
      </AnimateSharedLayout>
   </>;
   else child = <>
      <AnimateSharedLayout>
         <motion.div
            layout
         >
      <TextEditor cell={cell} />
      <ActionBar id={cell.id} type={cell.type} />
      </motion.div>
      </AnimateSharedLayout>
      </>
   return <div className='cell-list-item'>
      {child}
   </div>
}

export default CellListItem;