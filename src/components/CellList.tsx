import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import React from "react";

const CellList: React.FC = () => {
   const cells = useTypedSelector(({ cells: { order, data } } /*destructuring from state object*/) =>
      order.map(id => data[id])
   );

   const renderedCells = cells.map(cell =>
      <React.Fragment key={cell.id}>
         <CellListItem cell={cell} />
         <AddCell prevCellId={cell.id} />
         </React.Fragment>
   )
   
   return <div>
      <AddCell prevCellId={null} forceVisible={cells.length === 0}/*if this condition is true apply force-visible style*/ />
      {renderedCells}
   </div>
};

export default CellList;