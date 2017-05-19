import React from 'react';

import TestComponent from './TestComponent';

class ParentTestComponent extends React.Component {
  render () {
    const style = {color: this.props.color};
    return <div>
      <h1 style={ style }>
        HELLO WORLD!
      </h1>
      <TestComponent text="Lorem Ipsum" color="blue" />
    </div>;
  }
}

export default ParentTestComponent;
