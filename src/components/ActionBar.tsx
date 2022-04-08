import './ActionBar.css'
import { useActions } from '../hooks/use-actions';
import IconButton from './IconButton';

interface ActionBarProps {
   id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
   const { moveCell, deleteCell } = useActions();
   return <div className='action-bar'>
      <IconButton onClick={() => moveCell(id, 'up')} icon='fas fa-arrow-up' />
      <IconButton onClick={() => moveCell(id, 'down')}icon='fas fa-arrow-down' />
      <IconButton onClick={() => deleteCell(id)} icon='fas fa-times' />
   </div>
}

export default ActionBar;