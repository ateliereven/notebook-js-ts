import '../scss/CellList.scss';
import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import { useActions } from '../hooks/use-actions';

const CellList: React.FC = () => {
   const cells = useTypedSelector(({ cells: { order, data } } /*destructuring from state object*/) =>
      order.map(id => data[id])
   );

   const { fetchCells } = useActions();

   useEffect(() => {
      fetchCells();
   }, []);

   const renderedCells = cells.map(cell =>
      <Fragment key={cell.id}>
         <CellListItem cell={cell} />
         <AddCell prevCellId={cell.id} />
         </Fragment>
   )
   
   return <div className='cell-list'>
      <AddCell prevCellId={null} forceVisible={cells.length === 0}/*if this condition is true apply force-visible style*/ />
      {renderedCells}
   </div>
};

export default CellList;