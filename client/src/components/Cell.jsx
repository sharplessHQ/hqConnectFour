import React from 'react';

function Cell (props) {
  return (<div className={props.cellClass} id="cell" data-x={props.x} data-y={props.y}></div>);
}

export default Cell;