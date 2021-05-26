import React from 'react';

function Button (props) {
  return (<button className="button" id="button" data-x={props.x} onClick={props.clickPlay}>Play</button>);
}

export default Button;