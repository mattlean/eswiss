/*
 * BOOTSTRAP LIST GROUP COMPONENT
 * https://v4-alpha.getbootstrap.com/components/list-group
 */

import React from 'react';

export default class ListGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let listGroupItems = [];

    if(this.props.listGroupItems && this.props.listGroupItems.constructor === Array) {
      listGroupItems = this.props.listGroupItems.map((listGroupItem, i) => <li className="list-group-item" key={i}>
        {listGroupItem}
      </li>);
    }

    return <ul className="list-group">
      {listGroupItems}
    </ul>;
  }
}
