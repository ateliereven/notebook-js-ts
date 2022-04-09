import './AddCell.css';
import { useActions } from '../hooks/use-actions';
import TextButton from './TextButton';

interface AddCellProps {
   prevCellId: string | null;
   forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
   const { insertCellAfter } = useActions();
   return <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
      <TextButton onClick={() => insertCellAfter(prevCellId, 'code')} icon='fas fa-plus' text='Code' />
         <TextButton onClick={() => insertCellAfter(prevCellId, 'text')} icon='fas fa-plus' text='Text'/>
         </div>
      <div className='divider'></div>
   </div>
};

export default AddCell;