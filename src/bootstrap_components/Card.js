/*
 * BOOTSTRAP CARD COMPONENT
 * https://v4-alpha.getbootstrap.com/components/card
 */

import React from 'react';

const Card = (props) => {
  let header;
  if(props.header) {
    header = <div className="card-header">
      {props.header}
    </div>;
  }

  let footer;
  if(props.footer) {
    footer = <div className="card-footer">
      {props.footer}
    </div>;
  }

  return <div className="card">
    {header}
    <div className="card-block">
      {props.content}
    </div>
    {footer}
  </div>;
};

export default Card;
