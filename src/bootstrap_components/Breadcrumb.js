/*
 * BOOTSTRAP BREADCRUMB COMPONENT
 * https://v4-alpha.getbootstrap.com/components/breadcrumb
 */

import React from 'react';

export default class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let breadcrumbItems = [];

    if(this.props.breadcrumbItems && this.props.breadcrumbItems.constructor === Array) {
      breadcrumbItems = this.props.breadcrumbItems.map((listGroupItem, i) => <li className="breadcrumb-item" key={i}>
        {listGroupItem}
      </li>);
    }

    return <ol className="breadcrumb">
      {breadcrumbItems}
    </ol>;
  }
}
